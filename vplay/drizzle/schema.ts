import {
  int,
  mysqlEnum,
  mysqlTable,
  text,
  timestamp,
  varchar,
  decimal,
  boolean,
  json,
} from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extended with vPlay-specific fields.
 */
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  username: varchar("username", { length: 255 }),
  email: varchar("email", { length: 320 }),
  avatar: text("avatar"),
  country: varchar("country", { length: 100 }),
  referralCode: varchar("referralCode", { length: 32 }).unique(),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  xp: int("xp").default(0).notNull(),
  level: int("level").default(1).notNull(),
  riskScore: int("riskScore").default(0).notNull(),
  lastIpAddress: varchar("lastIpAddress", { length: 45 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Wallet table for tracking user coin balances
 */
export const wallets = mysqlTable("wallets", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  coins: int("coins").default(0).notNull(),
  lifetimeEarnings: int("lifetimeEarnings").default(0).notNull(),
  pendingRewards: int("pendingRewards").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Wallet = typeof wallets.$inferSelect;
export type InsertWallet = typeof wallets.$inferInsert;

/**
 * Wallet transactions for audit trail
 */
export const walletTransactions = mysqlTable("wallet_transactions", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  type: mysqlEnum("type", [
    "offer_reward",
    "referral_reward",
    "spin_reward",
    "streak_reward",
    "redemption",
    "tournament_prize",
    "challenge_reward",
  ]).notNull(),
  amount: int("amount").notNull(),
  status: mysqlEnum("status", ["pending", "completed", "failed"]).default("completed").notNull(),
  description: text("description"),
  relatedId: varchar("relatedId", { length: 64 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type WalletTransaction = typeof walletTransactions.$inferSelect;
export type InsertWalletTransaction = typeof walletTransactions.$inferInsert;

/**
 * Offers table for sponsored tasks
 */
export const offers = mysqlTable("offers", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  rewardCoins: int("rewardCoins").notNull(),
  difficulty: mysqlEnum("difficulty", ["easy", "medium", "hard"]).notNull(),
  estimatedTime: varchar("estimatedTime", { length: 100 }),
  icon: varchar("icon", { length: 255 }),
  provider: mysqlEnum("provider", ["adgem", "tapjoy", "applovin", "internal"]).notNull(),
  providerOfferId: varchar("providerOfferId", { length: 255 }),
  active: boolean("active").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Offer = typeof offers.$inferSelect;
export type InsertOffer = typeof offers.$inferInsert;

/**
 * Offer completions tracking
 */
export const offerCompletions = mysqlTable("offer_completions", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  offerId: int("offerId").notNull(),
  status: mysqlEnum("status", ["pending", "completed", "rejected"]).default("pending").notNull(),
  completedAt: timestamp("completedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type OfferCompletion = typeof offerCompletions.$inferSelect;
export type InsertOfferCompletion = typeof offerCompletions.$inferInsert;

/**
 * Referrals table
 */
export const referrals = mysqlTable("referrals", {
  id: int("id").autoincrement().primaryKey(),
  referrerId: int("referrerId").notNull(),
  referredUserId: int("referredUserId").notNull(),
  bonusCoins: int("bonusCoins").default(0).notNull(),
  status: mysqlEnum("status", ["pending", "active", "completed"]).default("pending").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  completedAt: timestamp("completedAt"),
});

export type Referral = typeof referrals.$inferSelect;
export type InsertReferral = typeof referrals.$inferInsert;

/**
 * Redemptions table
 */
export const redemptions = mysqlTable("redemptions", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  rewardType: varchar("rewardType", { length: 100 }).notNull(),
  coinsSpent: int("coinsSpent").notNull(),
  status: mysqlEnum("status", ["pending", "approved", "rejected", "completed"]).default("pending").notNull(),
  approvedBy: int("approvedBy"),
  approvedAt: timestamp("approvedAt"),
  completedAt: timestamp("completedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Redemption = typeof redemptions.$inferSelect;
export type InsertRedemption = typeof redemptions.$inferInsert;

/**
 * Daily streaks
 */
export const dailyStreaks = mysqlTable("daily_streaks", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  currentStreak: int("currentStreak").default(0).notNull(),
  longestStreak: int("longestStreak").default(0).notNull(),
  lastLoginDate: timestamp("lastLoginDate"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type DailyStreak = typeof dailyStreaks.$inferSelect;
export type InsertDailyStreak = typeof dailyStreaks.$inferInsert;

/**
 * Spin wheel history
 */
export const spins = mysqlTable("spins", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  reward: varchar("reward", { length: 100 }).notNull(),
  coinsWon: int("coinsWon").notNull(),
  lastSpinDate: timestamp("lastSpinDate"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Spin = typeof spins.$inferSelect;
export type InsertSpin = typeof spins.$inferInsert;

/**
 * Leaderboards
 */
export const leaderboards = mysqlTable("leaderboards", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  rank: int("rank"),
  coinsEarned: int("coinsEarned").default(0).notNull(),
  level: int("level").default(1).notNull(),
  category: mysqlEnum("category", ["top_earners", "top_referrers", "weekly_champions"]).notNull(),
  period: varchar("period", { length: 50 }),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Leaderboard = typeof leaderboards.$inferSelect;
export type InsertLeaderboard = typeof leaderboards.$inferInsert;

/**
 * Fraud flags
 */
export const fraudFlags = mysqlTable("fraud_flags", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  reason: text("reason").notNull(),
  severity: mysqlEnum("severity", ["low", "medium", "high"]).notNull(),
  resolved: boolean("resolved").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  resolvedAt: timestamp("resolvedAt"),
});

export type FraudFlag = typeof fraudFlags.$inferSelect;
export type InsertFraudFlag = typeof fraudFlags.$inferInsert;

/**
 * Admin logs
 */
export const adminLogs = mysqlTable("admin_logs", {
  id: int("id").autoincrement().primaryKey(),
  adminId: int("adminId").notNull(),
  action: varchar("action", { length: 255 }).notNull(),
  targetUserId: int("targetUserId"),
  details: json("details"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type AdminLog = typeof adminLogs.$inferSelect;
export type InsertAdminLog = typeof adminLogs.$inferInsert;

/**
 * Squads (team system)
 */
export const squads = mysqlTable("squads", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  logo: text("logo"),
  creatorId: int("creatorId").notNull(),
  maxMembers: int("maxMembers").default(5).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Squad = typeof squads.$inferSelect;
export type InsertSquad = typeof squads.$inferInsert;

/**
 * Squad members
 */
export const squadMembers = mysqlTable("squad_members", {
  id: int("id").autoincrement().primaryKey(),
  squadId: int("squadId").notNull(),
  userId: int("userId").notNull(),
  role: mysqlEnum("role", ["leader", "member"]).default("member").notNull(),
  joinedAt: timestamp("joinedAt").defaultNow().notNull(),
});

export type SquadMember = typeof squadMembers.$inferSelect;
export type InsertSquadMember = typeof squadMembers.$inferInsert;

/**
 * Tournaments
 */
export const tournaments = mysqlTable("tournaments", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  gameType: varchar("gameType", { length: 100 }).notNull(),
  entryCoins: int("entryCoins").default(0).notNull(),
  prizePoolCoins: int("prizePoolCoins").notNull(),
  startDate: timestamp("startDate").notNull(),
  endDate: timestamp("endDate").notNull(),
  maxPlayers: int("maxPlayers"),
  status: mysqlEnum("status", ["upcoming", "active", "completed"]).default("upcoming").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Tournament = typeof tournaments.$inferSelect;
export type InsertTournament = typeof tournaments.$inferInsert;

/**
 * Tournament entries
 */
export const tournamentEntries = mysqlTable("tournament_entries", {
  id: int("id").autoincrement().primaryKey(),
  tournamentId: int("tournamentId").notNull(),
  userId: int("userId").notNull(),
  score: int("score").default(0).notNull(),
  rank: int("rank"),
  enteredAt: timestamp("enteredAt").defaultNow().notNull(),
});

export type TournamentEntry = typeof tournamentEntries.$inferSelect;
export type InsertTournamentEntry = typeof tournamentEntries.$inferInsert;

/**
 * Challenges
 */
export const challenges = mysqlTable("challenges", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  rewardCoins: int("rewardCoins").notNull(),
  startDate: timestamp("startDate").notNull(),
  endDate: timestamp("endDate").notNull(),
  status: mysqlEnum("status", ["active", "completed"]).default("active").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Challenge = typeof challenges.$inferSelect;
export type InsertChallenge = typeof challenges.$inferInsert;

/**
 * Challenge participants
 */
export const challengeParticipants = mysqlTable("challenge_participants", {
  id: int("id").autoincrement().primaryKey(),
  challengeId: int("challengeId").notNull(),
  userId: int("userId").notNull(),
  progress: int("progress").default(0).notNull(),
  completed: boolean("completed").default(false).notNull(),
  completedAt: timestamp("completedAt"),
  joinedAt: timestamp("joinedAt").defaultNow().notNull(),
});

export type ChallengeParticipant = typeof challengeParticipants.$inferSelect;
export type InsertChallengeParticipant = typeof challengeParticipants.$inferInsert;

/**
 * Creator profiles
 */
export const creatorProfiles = mysqlTable("creator_profiles", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  displayName: varchar("displayName", { length: 255 }).notNull(),
  bio: text("bio"),
  avatar: text("avatar"),
  verified: boolean("verified").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type CreatorProfile = typeof creatorProfiles.$inferSelect;
export type InsertCreatorProfile = typeof creatorProfiles.$inferInsert;

/**
 * Creator challenges
 */
export const creatorChallenges = mysqlTable("creator_challenges", {
  id: int("id").autoincrement().primaryKey(),
  creatorId: int("creatorId").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  rewardCoins: int("rewardCoins").notNull(),
  startDate: timestamp("startDate").notNull(),
  endDate: timestamp("endDate").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type CreatorChallenge = typeof creatorChallenges.$inferSelect;
export type InsertCreatorChallenge = typeof creatorChallenges.$inferInsert;

/**
 * Reward drops (mystery rewards)
 */
export const rewardDrops = mysqlTable("reward_drops", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  coinsReward: int("coinsReward").notNull(),
  totalDrops: int("totalDrops").notNull(),
  claimedDrops: int("claimedDrops").default(0).notNull(),
  startDate: timestamp("startDate").notNull(),
  endDate: timestamp("endDate").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type RewardDrop = typeof rewardDrops.$inferSelect;
export type InsertRewardDrop = typeof rewardDrops.$inferInsert;

/**
 * Reward drop claims
 */
export const rewardDropClaims = mysqlTable("reward_drop_claims", {
  id: int("id").autoincrement().primaryKey(),
  dropId: int("dropId").notNull(),
  userId: int("userId").notNull(),
  coinsAwarded: int("coinsAwarded").notNull(),
  claimedAt: timestamp("claimedAt").defaultNow().notNull(),
});

export type RewardDropClaim = typeof rewardDropClaims.$inferSelect;
export type InsertRewardDropClaim = typeof rewardDropClaims.$inferInsert;
