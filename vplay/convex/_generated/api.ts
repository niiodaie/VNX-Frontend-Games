// Mock Convex API for development
// Replace with real Convex functions after setup

export const api = {
  users: {
    getUserByClerkId: async (args: any) => ({
      _id: 'user_1',
      clerkId: args.clerkId,
      username: 'Player',
      email: 'player@example.com',
      vBits: 1000,
      totalEarned: 5000,
      country: 'US',
      language: 'en',
      timezone: 'UTC',
      referralCode: 'VPLAY2024',
    }),
  },
  games: {
    listGames: async () => [
      {
        _id: 'game_1',
        title: 'Math Quiz',
        description: 'Test your math skills',
        category: 'Educational',
        difficulty: 'easy',
        estimatedTime: 5,
        maxReward: 100,
      },
      {
        _id: 'game_2',
        title: 'Puzzle Master',
        description: 'Solve challenging puzzles',
        category: 'Puzzle',
        difficulty: 'medium',
        estimatedTime: 10,
        maxReward: 250,
      },
    ],
    listOffers: async () => [
      {
        _id: 'offer_1',
        title: 'Complete Survey',
        description: 'Answer 10 quick questions',
        reward: 50,
        type: 'survey',
        provider: 'SurveyProvider',
      },
      {
        _id: 'offer_2',
        title: 'Watch Video',
        description: 'Watch a 2-minute video',
        reward: 25,
        type: 'video',
        provider: 'VideoProvider',
      },
    ],
  },
  leaderboard: {
    getLeaderboard: async () => [
      {
        _id: 'lb_1',
        userId: 'user_1',
        totalEarned: 50000,
        rank: 1,
        user: {
          username: 'TopPlayer',
          country: 'US',
          avatar: '🏆',
        },
      },
      {
        _id: 'lb_2',
        userId: 'user_2',
        totalEarned: 45000,
        rank: 2,
        user: {
          username: 'SecondPlace',
          country: 'UK',
          avatar: '🥈',
        },
      },
    ],
  },
} as const
