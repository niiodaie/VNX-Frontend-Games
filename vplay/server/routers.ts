import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, protectedProcedure } from "./_core/trpc";
import { z } from "zod";
import * as db from "./db";

export const appRouter = router({
  system: systemRouter,

  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // Wallet operations
  wallet: router({
    getBalance: protectedProcedure.query(async ({ ctx }) => {
      const wallet = await db.getOrCreateWallet(ctx.user.id);
      return wallet || { coins: 0, lifetimeEarnings: 0, pendingRewards: 0 };
    }),

    getTransactionHistory: protectedProcedure
      .input(z.object({ limit: z.number().default(20), offset: z.number().default(0) }))
      .query(async ({ ctx, input }) => {
        return await db.getWalletTransactions(ctx.user.id, input.limit, input.offset);
      }),

    addCoins: protectedProcedure
      .input(z.object({ amount: z.number(), type: z.string(), description: z.string().optional() }))
      .mutation(async ({ ctx, input }) => {
        const result = await db.addCoins(ctx.user.id, input.amount, input.type, input.description);
        return result || { success: false };
      }),
  }),

  // Offers
  offers: router({
    list: publicProcedure
      .input(z.object({ limit: z.number().default(20), offset: z.number().default(0) }))
      .query(async ({ input }) => {
        return await db.getOffers(input.limit, input.offset);
      }),

    complete: protectedProcedure
      .input(z.object({ offerId: z.number() }))
      .mutation(async ({ ctx, input }) => {
        const result = await db.completeOffer(ctx.user.id, input.offerId);
        return result || { success: false };
      }),

    getCompletions: protectedProcedure.query(async ({ ctx }) => {
      const completions = await db.getUserOfferCompletions(ctx.user.id);
      return { completions };
    }),
  }),

  // Leaderboard
  leaderboard: router({
    getTopEarners: publicProcedure
      .input(z.object({ limit: z.number().default(100) }))
      .query(async ({ input }) => {
        const users = await db.getTopEarners(input.limit);
        return { users };
      }),

    getTopReferrers: publicProcedure
      .input(z.object({ limit: z.number().default(100) }))
      .query(async ({ input }) => {
        // TODO: Implement top referrers query
        return { users: [] };
      }),

    getWeeklyChampions: publicProcedure
      .input(z.object({ limit: z.number().default(100) }))
      .query(async ({ input }) => {
        // TODO: Implement weekly champions query
        return { users: [] };
      }),

    getUserRank: protectedProcedure.query(async ({ ctx }) => {
      const rank = await db.getUserRank(ctx.user.id);
      return rank || { rank: 0, coinsEarned: 0, level: 1 };
    }),
  }),

  // Daily Streak
  streak: router({
    getStreak: protectedProcedure.query(async ({ ctx }) => {
      const streak = await db.getOrCreateStreak(ctx.user.id);
      return streak || { currentStreak: 0, longestStreak: 0, lastLoginDate: null };
    }),

    claimDailyReward: protectedProcedure.mutation(async ({ ctx }) => {
      const result = await db.claimDailyReward(ctx.user.id);
      return result || { success: false, coinsAwarded: 0, streak: 0 };
    }),
  }),

  // Spin Wheel
  spin: router({
    canSpin: protectedProcedure.query(async ({ ctx }) => {
      const canSpin = await db.canUserSpin(ctx.user.id);
      return { canSpin };
    }),

    spin: protectedProcedure.mutation(async ({ ctx }) => {
      const result = await db.spinWheel(ctx.user.id);
      return result || { success: false, coinsWon: 0, reward: "coins" };
    }),
  }),

  // Referrals
  referrals: router({
    getReferralCode: protectedProcedure.query(async ({ ctx }) => {
      const code = await db.generateReferralCode(ctx.user.id);
      return { code, link: `https://vplay.com/ref/${code}` };
    }),

    getReferralStats: protectedProcedure.query(async ({ ctx }) => {
      return await db.getReferralStats(ctx.user.id);
    }),

    getReferralHistory: protectedProcedure.query(async ({ ctx }) => {
      // TODO: Implement referral history query
      return { referrals: [] };
    }),
  }),

  // Redemptions
  redemptions: router({
    getAvailableRewards: publicProcedure.query(async () => {
      return {
        rewards: [
          { id: 1, name: "Amazon $10", coins: 1000, value: "$10" },
          { id: 2, name: "Amazon $25", coins: 2500, value: "$25" },
          { id: 3, name: "PayPal $50", coins: 5000, value: "$50" },
        ],
      };
    }),

    requestRedemption: protectedProcedure
      .input(z.object({ rewardId: z.number(), rewardType: z.string(), coinsSpent: z.number() }))
      .mutation(async ({ ctx, input }) => {
        const result = await db.requestRedemption(ctx.user.id, input.rewardType, input.coinsSpent);
        return result || { success: false };
      }),

    getRedemptionHistory: protectedProcedure.query(async ({ ctx }) => {
      // TODO: Implement redemption history query
      return { redemptions: [] };
    }),
  }),

  // Tournaments
  tournaments: router({
    list: publicProcedure
      .input(z.object({ status: z.enum(["upcoming", "active", "completed"]).optional() }))
      .query(async ({ input }) => {
        const tournaments = await db.getActiveTournaments();
        return { tournaments };
      }),

    join: protectedProcedure
      .input(z.object({ tournamentId: z.number() }))
      .mutation(async ({ ctx, input }) => {
        const result = await db.joinTournament(ctx.user.id, input.tournamentId);
        return result || { success: false };
      }),

    getMyTournaments: protectedProcedure.query(async ({ ctx }) => {
      // TODO: Get user's tournaments
      return { tournaments: [] };
    }),

    submitScore: protectedProcedure
      .input(z.object({ tournamentId: z.number(), score: z.number() }))
      .mutation(async ({ ctx, input }) => {
        const result = await db.submitTournamentScore(ctx.user.id, input.tournamentId, input.score);
        return result || { success: false };
      }),
  }),

  // Challenges
  challenges: router({
    list: publicProcedure.query(async () => {
      const challenges = await db.getActiveChallenges();
      return { challenges };
    }),

    join: protectedProcedure
      .input(z.object({ challengeId: z.number() }))
      .mutation(async ({ ctx, input }) => {
        const result = await db.joinChallenge(ctx.user.id, input.challengeId);
        return result || { success: false };
      }),

    getMyProgress: protectedProcedure.query(async ({ ctx }) => {
      // TODO: Get user's challenge progress
      return { challenges: [] };
    }),

    updateProgress: protectedProcedure
      .input(z.object({ challengeId: z.number(), progress: z.number() }))
      .mutation(async ({ ctx, input }) => {
        // TODO: Update challenge progress
        return { success: true };
      }),
  }),

  // Squads
  squads: router({
    list: publicProcedure.query(async () => {
      // TODO: Query squads
      return { squads: [] };
    }),

    create: protectedProcedure
      .input(z.object({ name: z.string(), description: z.string().optional() }))
      .mutation(async ({ ctx, input }) => {
        const result = await db.createSquad(ctx.user.id, input.name, input.description);
        return result || { success: false };
      }),

    join: protectedProcedure
      .input(z.object({ squadId: z.number() }))
      .mutation(async ({ ctx, input }) => {
        const result = await db.joinSquad(ctx.user.id, input.squadId);
        return result || { success: false };
      }),

    getMySquads: protectedProcedure.query(async ({ ctx }) => {
      // TODO: Get user's squads
      return { squads: [] };
    }),

    getMembers: protectedProcedure
      .input(z.object({ squadId: z.number() }))
      .query(async ({ input }) => {
        // TODO: Get squad members
        return { members: [] };
      }),
  }),

  // User Profile
  profile: router({
    getProfile: protectedProcedure.query(async ({ ctx }) => {
      return {
        id: ctx.user.id,
        username: ctx.user.username,
        email: ctx.user.email,
        avatar: ctx.user.avatar,
        country: ctx.user.country,
        xp: ctx.user.xp,
        level: ctx.user.level,
      };
    }),

    updateProfile: protectedProcedure
      .input(z.object({
        username: z.string().optional(),
        avatar: z.string().optional(),
        country: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        // TODO: Update user profile
        return { success: true };
      }),
  }),

  // Admin operations
  admin: router({
    getDashboardStats: protectedProcedure.query(async ({ ctx }) => {
      if (ctx.user.role !== "admin") {
        throw new Error("Unauthorized");
      }
      return await db.getAdminStats();
    }),

    getUsers: protectedProcedure
      .input(z.object({ limit: z.number().default(50), offset: z.number().default(0) }))
      .query(async ({ ctx, input }) => {
        if (ctx.user.role !== "admin") {
          throw new Error("Unauthorized");
        }
        return await db.getAllUsers(input.limit, input.offset);
      }),

    approveRedemption: protectedProcedure
      .input(z.object({ redemptionId: z.number() }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user.role !== "admin") {
          throw new Error("Unauthorized");
        }
        const result = await db.approveRedemption(input.redemptionId, ctx.user.id);
        return result || { success: false };
      }),

    rejectRedemption: protectedProcedure
      .input(z.object({ redemptionId: z.number(), reason: z.string() }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user.role !== "admin") {
          throw new Error("Unauthorized");
        }
        // TODO: Implement rejection logic
        return { success: true };
      }),

    flagUser: protectedProcedure
      .input(z.object({ userId: z.number(), reason: z.string(), severity: z.enum(["low", "medium", "high"]) }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user.role !== "admin") {
          throw new Error("Unauthorized");
        }
        const result = await db.flagUserForFraud(input.userId, input.reason, input.severity);
        return result || { success: false };
      }),

    getFraudFlags: protectedProcedure
      .input(z.object({ userId: z.number() }))
      .query(async ({ ctx, input }) => {
        if (ctx.user.role !== "admin") {
          throw new Error("Unauthorized");
        }
        const flags = await db.getUserFraudFlags(input.userId);
        return { flags };
      }),
  }),

  // Reward drops
  rewardDrops: router({
    getAvailable: publicProcedure.query(async () => {
      const drops = await db.getAvailableRewardDrops();
      return { drops };
    }),

    claim: protectedProcedure
      .input(z.object({ dropId: z.number() }))
      .mutation(async ({ ctx, input }) => {
        const result = await db.claimRewardDrop(ctx.user.id, input.dropId);
        return result || { success: false };
      }),
  }),
});

export type AppRouter = typeof appRouter;
