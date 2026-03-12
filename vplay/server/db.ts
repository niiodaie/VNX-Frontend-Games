import { eq, desc, and, gte, lte, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import {
  InsertUser,
  users,
  wallets,
  walletTransactions,
  offers,
  offerCompletions,
  referrals,
  redemptions,
  dailyStreaks,
  spins,
  leaderboards,
  fraudFlags,
  squads,
  squadMembers,
  tournaments,
  tournamentEntries,
  challenges,
  challengeParticipants,
  creatorProfiles,
  rewardDrops,
  rewardDropClaims,
} from "../drizzle/schema";
import { ENV } from "./_core/env";

let _db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["username", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = "admin";
      updateSet.role = "admin";
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db
    .select()
    .from(users)
    .where(eq(users.openId, openId))
    .limit(1);

  return result.length > 0 ? result[0] : undefined;
}

export async function getUserById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

// Wallet operations
export async function getOrCreateWallet(userId: number) {
  const db = await getDb();
  if (!db) return null;

  let wallet = await db
    .select()
    .from(wallets)
    .where(eq(wallets.userId, userId))
    .limit(1);

  if (wallet.length === 0) {
    await db.insert(wallets).values({
      userId,
      coins: 0,
      lifetimeEarnings: 0,
      pendingRewards: 0,
    });
    wallet = await db
      .select()
      .from(wallets)
      .where(eq(wallets.userId, userId))
      .limit(1);
  }

  return wallet[0] || null;
}

export async function addCoins(
  userId: number,
  amount: number,
  type: string,
  description?: string
) {
  const db = await getDb();
  if (!db) return null;

  const wallet = await getOrCreateWallet(userId);
  if (!wallet) return null;

  const newCoins = wallet.coins + amount;
  const newLifetimeEarnings = wallet.lifetimeEarnings + amount;

  await db
    .update(wallets)
    .set({
      coins: newCoins,
      lifetimeEarnings: newLifetimeEarnings,
      updatedAt: new Date(),
    })
    .where(eq(wallets.id, wallet.id));

  await db.insert(walletTransactions).values({
    userId,
    type: type as any,
    amount,
    status: "completed",
    description,
  });

  return { coins: newCoins, lifetimeEarnings: newLifetimeEarnings };
}

export async function spendCoins(
  userId: number,
  amount: number,
  type: string,
  description?: string
) {
  const db = await getDb();
  if (!db) return null;

  const wallet = await getOrCreateWallet(userId);
  if (!wallet || wallet.coins < amount) return null;

  const newCoins = wallet.coins - amount;

  await db
    .update(wallets)
    .set({
      coins: newCoins,
      updatedAt: new Date(),
    })
    .where(eq(wallets.id, wallet.id));

  await db.insert(walletTransactions).values({
    userId,
    type: type as any,
    amount: -amount,
    status: "completed",
    description,
  });

  return { coins: newCoins };
}

export async function getWalletTransactions(userId: number, limit = 20, offset = 0) {
  const db = await getDb();
  if (!db) return { transactions: [], total: 0 };

  const transactions = await db
    .select()
    .from(walletTransactions)
    .where(eq(walletTransactions.userId, userId))
    .orderBy(desc(walletTransactions.createdAt))
    .limit(limit)
    .offset(offset);

  const countResult = await db
    .select({ count: sql<number>`COUNT(*)` })
    .from(walletTransactions)
    .where(eq(walletTransactions.userId, userId));

  return {
    transactions,
    total: countResult[0]?.count || 0,
  };
}

// Offer operations
export async function getOffers(limit = 20, offset = 0) {
  const db = await getDb();
  if (!db) return { offers: [], total: 0 };

  const offersList = await db
    .select()
    .from(offers)
    .where(eq(offers.active, true))
    .limit(limit)
    .offset(offset);

  const countResult = await db
    .select({ count: sql<number>`COUNT(*)` })
    .from(offers)
    .where(eq(offers.active, true));

  return {
    offers: offersList,
    total: countResult[0]?.count || 0,
  };
}

export async function completeOffer(userId: number, offerId: number) {
  const db = await getDb();
  if (!db) return null;

  const offer = await db
    .select()
    .from(offers)
    .where(eq(offers.id, offerId))
    .limit(1);

  if (!offer[0]) return null;

  // Check if already completed
  const existing = await db
    .select()
    .from(offerCompletions)
    .where(
      and(
        eq(offerCompletions.userId, userId),
        eq(offerCompletions.offerId, offerId)
      )
    )
    .limit(1);

  if (existing.length > 0) return null;

  await db.insert(offerCompletions).values({
    userId,
    offerId,
    status: "completed",
    completedAt: new Date(),
  });

  await addCoins(userId, offer[0].rewardCoins, "offer_reward", `Completed: ${offer[0].title}`);

  return { success: true, coinsAwarded: offer[0].rewardCoins };
}

export async function getUserOfferCompletions(userId: number) {
  const db = await getDb();
  if (!db) return [];

  return await db
    .select()
    .from(offerCompletions)
    .where(eq(offerCompletions.userId, userId));
}

// Leaderboard operations
export async function getTopEarners(limit = 100) {
  const db = await getDb();
  if (!db) return [];

  return await db
    .select({
      id: users.id,
      username: users.username,
      level: users.level,
      coins: wallets.coins,
    })
    .from(users)
    .innerJoin(wallets, eq(users.id, wallets.userId))
    .orderBy(desc(wallets.coins))
    .limit(limit);
}

export async function getUserRank(userId: number) {
  const db = await getDb();
  if (!db) return null;

  const user = await getUserById(userId);
  if (!user) return null;

  const wallet = await getOrCreateWallet(userId);
  if (!wallet) return null;

  const rankResult = await db
    .select({ rank: sql<number>`COUNT(*) + 1` })
    .from(wallets)
    .where(gte(wallets.coins, wallet.coins));

  return {
    rank: rankResult[0]?.rank || 0,
    coinsEarned: wallet.coins,
    level: user.level,
  };
}

// Daily streak operations
export async function getOrCreateStreak(userId: number) {
  const db = await getDb();
  if (!db) return null;

  let streak = await db
    .select()
    .from(dailyStreaks)
    .where(eq(dailyStreaks.userId, userId))
    .limit(1);

  if (streak.length === 0) {
    await db.insert(dailyStreaks).values({
      userId,
      currentStreak: 0,
      longestStreak: 0,
    });
    streak = await db
      .select()
      .from(dailyStreaks)
      .where(eq(dailyStreaks.userId, userId))
      .limit(1);
  }

  return streak[0] || null;
}

export async function claimDailyReward(userId: number) {
  const db = await getDb();
  if (!db) return null;

  const streak = await getOrCreateStreak(userId);
  if (!streak) return null;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const lastLogin = streak.lastLoginDate ? new Date(streak.lastLoginDate) : null;
  const lastLoginDate = lastLogin ? new Date(lastLogin) : null;
  if (lastLoginDate) lastLoginDate.setHours(0, 0, 0, 0);

  let newStreak = streak.currentStreak;
  if (lastLoginDate && lastLoginDate.getTime() === today.getTime()) {
    // Already claimed today
    return null;
  } else if (lastLoginDate && lastLoginDate.getTime() === today.getTime() - 86400000) {
    // Consecutive day
    newStreak = streak.currentStreak + 1;
  } else {
    // Streak broken
    newStreak = 1;
  }

  const longestStreak = Math.max(newStreak, streak.longestStreak);
  const rewardCoins = 50 + newStreak * 10; // Scales with streak

  await db
    .update(dailyStreaks)
    .set({
      currentStreak: newStreak,
      longestStreak,
      lastLoginDate: today,
      updatedAt: new Date(),
    })
    .where(eq(dailyStreaks.id, streak.id));

  await addCoins(userId, rewardCoins, "streak_reward", `Day ${newStreak} streak bonus`);

  return { coinsAwarded: rewardCoins, streak: newStreak };
}

// Spin wheel operations
export async function canUserSpin(userId: number) {
  const db = await getDb();
  if (!db) return true;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const lastSpin = await db
    .select()
    .from(spins)
    .where(
      and(
        eq(spins.userId, userId),
        gte(spins.createdAt, today)
      )
    )
    .limit(1);

  return lastSpin.length === 0;
}

export async function spinWheel(userId: number) {
  const db = await getDb();
  if (!db) return null;

  const canSpin = await canUserSpin(userId);
  if (!canSpin) return null;

  const rewards = [100, 150, 200, 250, 300, 500];
  const coinsWon = rewards[Math.floor(Math.random() * rewards.length)];

  await db.insert(spins).values({
    userId,
    reward: "coins",
    coinsWon,
    lastSpinDate: new Date(),
  });

  await addCoins(userId, coinsWon, "spin_reward", `Spin wheel reward`);

  return { success: true, coinsWon, reward: "coins" };
}

// Referral operations
export async function generateReferralCode(userId: number) {
  const db = await getDb();
  if (!db) return null;

  const user = await getUserById(userId);
  if (!user) return null;

  if (user.referralCode) {
    return user.referralCode;
  }

  const code = `REF${userId}${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

  await db
    .update(users)
    .set({ referralCode: code })
    .where(eq(users.id, userId));

  return code;
}

export async function getReferralStats(userId: number) {
  const db = await getDb();
  if (!db) return { friendsInvited: 0, referralEarnings: 0, bonusUnlocked: 0 };

  const referralsList = await db
    .select()
    .from(referrals)
    .where(eq(referrals.referrerId, userId));

  const totalEarnings = referralsList.reduce((sum: number, ref: any) => sum + ref.bonusCoins, 0);
  const completedReferrals = referralsList.filter((ref: any) => ref.status === "completed").length;

  return {
    friendsInvited: referralsList.length,
    referralEarnings: totalEarnings,
    bonusUnlocked: completedReferrals * 500, // 500 coins per completed referral
  };
}

// Redemption operations
export async function requestRedemption(userId: number, rewardType: string, coinsSpent: number) {
  const db = await getDb();
  if (!db) return null;

  const wallet = await getOrCreateWallet(userId);
  if (!wallet || wallet.coins < coinsSpent) return null;

  const redemption = await db.insert(redemptions).values({
    userId,
    rewardType,
    coinsSpent,
    status: "pending",
  });

  await spendCoins(userId, coinsSpent, "redemption", `Redeemed: ${rewardType}`);

  return { success: true, redemptionId: 1 };
}

export async function getPendingRedemptions() {
  const db = await getDb();
  if (!db) return [];

  return await db
    .select()
    .from(redemptions)
    .where(eq(redemptions.status, "pending"))
    .orderBy(redemptions.createdAt);
}

export async function approveRedemption(redemptionId: number, approvedBy: number) {
  const db = await getDb();
  if (!db) return null;

  await db
    .update(redemptions)
    .set({
      status: "approved",
      approvedBy,
      approvedAt: new Date(),
    })
    .where(eq(redemptions.id, redemptionId));

  return { success: true };
}

// Tournament operations
export async function getActiveTournaments() {
  const db = await getDb();
  if (!db) return [];

  const now = new Date();
  return await db
    .select()
    .from(tournaments)
    .where(
      and(
        eq(tournaments.status, "active"),
        lte(tournaments.startDate, now),
        gte(tournaments.endDate, now)
      )
    );
}

export async function joinTournament(userId: number, tournamentId: number) {
  const db = await getDb();
  if (!db) return null;

  const existing = await db
    .select()
    .from(tournamentEntries)
    .where(
      and(
        eq(tournamentEntries.userId, userId),
        eq(tournamentEntries.tournamentId, tournamentId)
      )
    )
    .limit(1);

  if (existing.length > 0) return null;

  await db.insert(tournamentEntries).values({
    tournamentId,
    userId,
    score: 0,
  });

  return { success: true, entryId: tournamentId };
}

export async function submitTournamentScore(
  userId: number,
  tournamentId: number,
  score: number
) {
  const db = await getDb();
  if (!db) return null;

  const entry = await db
    .select()
    .from(tournamentEntries)
    .where(
      and(
        eq(tournamentEntries.userId, userId),
        eq(tournamentEntries.tournamentId, tournamentId)
      )
    )
    .limit(1);

  if (!entry[0]) return null;

  await db
    .update(tournamentEntries)
    .set({ score: Math.max(entry[0].score, score) })
    .where(eq(tournamentEntries.id, entry[0].id));

  return { success: true };
}

// Squad operations
export async function createSquad(creatorId: number, name: string, description?: string) {
  const db = await getDb();
  if (!db) return null;

  await db.insert(squads).values({
    name,
    description,
    creatorId,
  });

  const squads_list = await db
    .select()
    .from(squads)
    .where(eq(squads.creatorId, creatorId))
    .orderBy(desc(squads.createdAt))
    .limit(1);

  const squadId = squads_list[0]?.id || 1;

  await db.insert(squadMembers).values({
    squadId,
    userId: creatorId,
    role: "leader",
  });

  return { success: true, squadId };
}

export async function joinSquad(userId: number, squadId: number) {
  const db = await getDb();
  if (!db) return null;

  const squad = await db.select().from(squads).where(eq(squads.id, squadId)).limit(1);
  if (!squad[0]) return null;

  const members = await db
    .select()
    .from(squadMembers)
    .where(eq(squadMembers.squadId, squadId));

  if (members.length >= squad[0].maxMembers) return null;

  const existing = await db
    .select()
    .from(squadMembers)
    .where(
      and(eq(squadMembers.squadId, squadId), eq(squadMembers.userId, userId))
    )
    .limit(1);

  if (existing.length > 0) return null;

  await db.insert(squadMembers).values({
    squadId,
    userId,
    role: "member",
  });

  return { success: true, memberId: squadId };
}

// Challenge operations
export async function getActiveChallenges() {
  const db = await getDb();
  if (!db) return [];

  const now = new Date();
  return await db
    .select()
    .from(challenges)
    .where(
      and(
        eq(challenges.status, "active"),
        lte(challenges.startDate, now),
        gte(challenges.endDate, now)
      )
    );
}

export async function joinChallenge(userId: number, challengeId: number) {
  const db = await getDb();
  if (!db) return null;

  const existing = await db
    .select()
    .from(challengeParticipants)
    .where(
      and(
        eq(challengeParticipants.userId, userId),
        eq(challengeParticipants.challengeId, challengeId)
      )
    )
    .limit(1);

  if (existing.length > 0) return null;

  await db.insert(challengeParticipants).values({
    challengeId,
    userId,
    progress: 0,
  });

  return { success: true, participantId: challengeId };
}

// Fraud prevention
export async function flagUserForFraud(
  userId: number,
  reason: string,
  severity: "low" | "medium" | "high"
) {
  const db = await getDb();
  if (!db) return null;

  await db.insert(fraudFlags).values({
    userId,
    reason,
    severity,
  });

  // Update user risk score
  const user = await getUserById(userId);
  if (user) {
    const riskIncrement = severity === "high" ? 50 : severity === "medium" ? 25 : 10;
    await db
      .update(users)
      .set({ riskScore: user.riskScore + riskIncrement })
      .where(eq(users.id, userId));
  }

  return { success: true, flagId: userId };
}

export async function getUserFraudFlags(userId: number) {
  const db = await getDb();
  if (!db) return [];

  return await db
    .select()
    .from(fraudFlags)
    .where(eq(fraudFlags.userId, userId));
}

// Creator profiles
export async function getOrCreateCreatorProfile(userId: number, displayName: string) {
  const db = await getDb();
  if (!db) return null;

  let profile = await db
    .select()
    .from(creatorProfiles)
    .where(eq(creatorProfiles.userId, userId))
    .limit(1);

  if (profile.length === 0) {
    await db.insert(creatorProfiles).values({
      userId,
      displayName,
    });
    profile = await db
      .select()
      .from(creatorProfiles)
      .where(eq(creatorProfiles.userId, userId))
      .limit(1);
  }

  return profile[0] || null;
}

// Reward drops
export async function getAvailableRewardDrops() {
  const db = await getDb();
  if (!db) return [];

  const now = new Date();
  return await db
    .select()
    .from(rewardDrops)
    .where(
      and(
        lte(rewardDrops.startDate, now),
        gte(rewardDrops.endDate, now)
      )
    );
}

export async function claimRewardDrop(userId: number, dropId: number) {
  const db = await getDb();
  if (!db) return null;

  const drop = await db
    .select()
    .from(rewardDrops)
    .where(eq(rewardDrops.id, dropId))
    .limit(1);

  if (!drop[0] || drop[0].claimedDrops >= drop[0].totalDrops) return null;

  const existing = await db
    .select()
    .from(rewardDropClaims)
    .where(
      and(
        eq(rewardDropClaims.dropId, dropId),
        eq(rewardDropClaims.userId, userId)
      )
    )
    .limit(1);

  if (existing.length > 0) return null;

  const claim = await db.insert(rewardDropClaims).values({
    dropId,
    userId,
    coinsAwarded: drop[0].coinsReward,
  });

  await db
    .update(rewardDrops)
    .set({ claimedDrops: drop[0].claimedDrops + 1 })
    .where(eq(rewardDrops.id, dropId));

  await addCoins(userId, drop[0].coinsReward, "reward_drop", `Mystery reward claimed`);

  return { success: true, coinsAwarded: drop[0].coinsReward };
}

// Admin functions
export async function getAdminStats() {
  const db = await getDb();
  if (!db) return { totalUsers: 0, offersCompleted: 0, rewardsPaid: 0, fraudFlags: 0 };

  const userCount = await db.select({ count: sql<number>`COUNT(*)` }).from(users);
  const offerCount = await db
    .select({ count: sql<number>`COUNT(*)` })
    .from(offerCompletions)
    .where(eq(offerCompletions.status, "completed"));
  const fraudCount = await db.select({ count: sql<number>`COUNT(*)` }).from(fraudFlags);

  const totalRewards = await db
    .select({ total: sql<number>`SUM(amount)` })
    .from(walletTransactions)
    .where(eq(walletTransactions.type, "offer_reward"));

  return {
    totalUsers: userCount[0]?.count || 0,
    offersCompleted: offerCount[0]?.count || 0,
    rewardsPaid: totalRewards[0]?.total || 0,
    fraudFlags: fraudCount[0]?.count || 0,
  };
}

export async function getAllUsers(limit = 50, offset = 0) {
  const db = await getDb();
  if (!db) return { users: [], total: 0 };

  const usersList = await db
    .select()
    .from(users)
    .orderBy(desc(users.createdAt))
    .limit(limit)
    .offset(offset);

  const countResult = await db.select({ count: sql<number>`COUNT(*)` }).from(users);

  return {
    users: usersList,
    total: countResult[0]?.count || 0,
  };
}
