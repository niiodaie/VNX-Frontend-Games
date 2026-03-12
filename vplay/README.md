# vPlay – Play & Earn Gaming Platform

A modern, production-ready MVP gaming rewards platform where users discover games, complete sponsored challenges, compete in tournaments, and earn digital coins that can be redeemed for real rewards.

## Overview

vPlay combines elements of gaming discovery, competitive tournaments, social squads, and reward-based engagement to create a global gaming ecosystem. The platform integrates sponsored offer walls, daily streaks, spin rewards, referral systems, leaderboards, tournaments, creator challenges, and squad competitions to drive user engagement and viral growth.

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React 19, TypeScript, Tailwind CSS 4, ShadCN UI
- **Backend**: Express.js 4, tRPC 11, Drizzle ORM
- **Database**: MySQL/TiDB
- **Authentication**: Manus OAuth (built-in)
- **Payments**: Paddle (scaffold)
- **Deployment**: Vercel-ready

## Project Structure

```
vplay/
├── client/
│   ├── public/              # Static assets (favicon, manifest)
│   ├── src/
│   │   ├── pages/          # Page components (Dashboard, Offers, Wallet, etc.)
│   │   ├── components/     # Reusable UI components
│   │   ├── contexts/       # React contexts (Theme, Auth)
│   │   ├── hooks/          # Custom React hooks
│   │   ├── lib/            # Utilities (tRPC client, constants)
│   │   ├── _core/          # Core auth hooks
│   │   ├── App.tsx         # Main router
│   │   ├── main.tsx        # Entry point
│   │   └── index.css       # Global styles
│   └── index.html          # HTML template
├── server/
│   ├── _core/              # Framework plumbing (OAuth, context, etc.)
│   ├── db.ts               # Database query helpers
│   ├── routers.ts          # tRPC procedure definitions
│   └── storage.ts          # S3 storage helpers
├── drizzle/
│   ├── schema.ts           # Database schema definitions
│   ├── migrations/         # Generated SQL migrations
│   └── drizzle.config.ts   # Drizzle configuration
├── shared/                 # Shared constants and types
├── package.json            # Dependencies and scripts
├── tsconfig.json           # TypeScript configuration
├── tailwind.config.ts      # Tailwind CSS configuration
└── vite.config.ts          # Vite configuration
```

## Core Features

### 1. Authentication
- OAuth-based sign-up and sign-in
- Social login support
- Protected routes and session management
- User profile with extended fields (username, avatar, country, referral code)

### 2. Dashboard
- Coin balance display
- XP level and progression
- Daily streak tracking
- Recent activity feed
- Quick access to offers, tournaments, and challenges

### 3. Wallet System
- Coin balance management
- Lifetime earnings tracking
- Pending rewards queue
- Complete transaction history with filtering
- Multiple transaction types (offers, referrals, spins, streaks, redemptions)

### 4. Offer Wall
- Sponsored task discovery
- Difficulty levels and time estimates
- Reward preview
- Offer completion tracking
- Integration placeholders for AdGem, Tapjoy, AppLovin

### 5. Rewards Marketplace
- Redeemable rewards catalog
- Coin cost and estimated value display
- Redemption request workflow
- Admin approval system
- Redemption history

### 6. Referral System
- Unique referral code generation
- Referral link sharing
- Friend invitation tracking
- Earnings from referred friends
- Referral statistics dashboard

### 7. Leaderboards
- Top earners ranking
- Top referrers ranking
- Weekly champions
- User rank and position tracking
- Real-time updates

### 8. Daily Streak
- Login streak tracking
- Streak bonus rewards
- Longest streak recording
- Streak reset on missed days
- Progressive rewards (Day 1: 50 coins, Day 7: 500 coins)

### 9. Spin Wheel
- Daily spin opportunity
- Random reward selection
- Coin and XP rewards
- Bonus multipliers
- Animated spin interface

### 10. Tournaments
- Tournament discovery and browsing
- Entry fee system
- Prize pool distribution
- Score submission
- Ranking and leaderboards

### 11. Challenges
- Sponsored challenge participation
- Progress tracking
- Completion verification
- Reward distribution
- Challenge history

### 12. Squads (Team System)
- Squad creation and management
- Member invitations (max 5 members)
- Squad leaderboards
- Team-based competitions
- Squad roles (leader, member)

### 13. Admin Panel
- User management
- Redemption approval workflow
- Fraud monitoring and flagging
- Analytics dashboards
- Admin action logging

## Getting Started

### Prerequisites
- Node.js 22+
- pnpm 10+
- MySQL database (or compatible)

### Installation

1. **Install dependencies**
   ```bash
   pnpm install
   ```

2. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Required variables:
   - `DATABASE_URL`: MySQL connection string
   - `CLERK_PUBLISHABLE_KEY`: Clerk authentication key
   - `CLERK_SECRET_KEY`: Clerk secret key
   - `CONVEX_DEPLOYMENT`: Convex backend URL
   - `PADDLE_VENDOR_ID`: Paddle vendor ID
   - `PADDLE_API_KEY`: Paddle API key

3. **Generate database migrations**
   ```bash
   pnpm db:generate
   pnpm db:migrate
   ```

4. **Start development server**
   ```bash
   pnpm dev
   ```
   
   The app will be available at `http://localhost:3000`

## Development Workflow

### Adding a New Feature

1. **Update database schema** (if needed)
   - Edit `drizzle/schema.ts`
   - Run `pnpm db:generate` to create migration
   - Review and apply migration with `pnpm db:migrate`

2. **Create database queries**
   - Add helper functions in `server/db.ts`

3. **Define tRPC procedures**
   - Add routes in `server/routers.ts`
   - Use `protectedProcedure` for authenticated endpoints
   - Use `publicProcedure` for public endpoints

4. **Build frontend components**
   - Create page in `client/src/pages/`
   - Use ShadCN UI components from `@/components/ui/`
   - Call tRPC procedures with `trpc.*.useQuery()` or `trpc.*.useMutation()`

5. **Add tests**
   - Create test file in `server/*.test.ts`
   - Run `pnpm test` to verify

### Database Operations

The template uses Drizzle ORM with MySQL. Key files:

- `drizzle/schema.ts` - Define tables and relationships
- `server/db.ts` - Query helpers (reuse across procedures)
- `drizzle.config.ts` - Drizzle configuration

**Workflow:**
1. Update schema in `drizzle/schema.ts`
2. Run `pnpm db:generate` to create migration SQL
3. Review generated SQL in `drizzle/` directory
4. Run `pnpm db:migrate` to apply changes
5. Add query helpers in `server/db.ts`
6. Use helpers in tRPC procedures

## Design System

### Colors (Dark Mode)
- **Background**: `#0f172a` (slate-900)
- **Primary**: `#6366f1` (indigo-600)
- **Success**: `#22c55e` (green-500)
- **Warning**: `#f59e0b` (amber-500)
- **Foreground**: `#f1f5f9` (slate-100)

### Typography
- **Font Family**: Inter
- **Headings**: Bold (700-800)
- **Body**: Regular (400-500)

### Components
- **Glass UI**: Semi-transparent backgrounds with backdrop blur
- **Neon Glow**: Indigo shadow effects on interactive elements
- **Animations**: Smooth transitions and hover states
- **Responsive**: Mobile-first design with breakpoints

## API Reference

### Authentication
```typescript
// Get current user
trpc.auth.me.useQuery()

// Logout
trpc.auth.logout.useMutation()
```

### Wallet
```typescript
// Get balance
trpc.wallet.getBalance.useQuery()

// Get transaction history
trpc.wallet.getTransactionHistory.useQuery({ limit: 20, offset: 0 })

// Add coins
trpc.wallet.addCoins.useMutation({ amount: 100, type: 'offer_reward' })
```

### Offers
```typescript
// List offers
trpc.offers.list.useQuery({ limit: 20, offset: 0 })

// Complete offer
trpc.offers.complete.useMutation({ offerId: 1 })

// Get completions
trpc.offers.getCompletions.useQuery()
```

### Leaderboard
```typescript
// Get top earners
trpc.leaderboard.getTopEarners.useQuery({ limit: 100 })

// Get user rank
trpc.leaderboard.getUserRank.useQuery()
```

### Referrals
```typescript
// Get referral code
trpc.referrals.getReferralCode.useQuery()

// Get stats
trpc.referrals.getReferralStats.useQuery()
```

### Tournaments
```typescript
// List tournaments
trpc.tournaments.list.useQuery({ status: 'active' })

// Join tournament
trpc.tournaments.join.useMutation({ tournamentId: 1 })

// Submit score
trpc.tournaments.submitScore.useMutation({ tournamentId: 1, score: 1000 })
```

## Fraud Prevention

The platform includes fraud prevention mechanisms:

- **IP Logging**: Track user IP addresses for suspicious activity
- **Device Fingerprinting**: Placeholder for device identification
- **Redemption Delay**: Delay between redemption requests
- **Risk Scoring**: Calculate user risk score based on activity
- **Fraud Flags**: Flag suspicious users for admin review

## Gamification

- **XP System**: Users earn XP for activities (level = XP / 1000)
- **Achievements**: Hooks for badge and achievement system
- **Leaderboards**: Real-time ranking and competition
- **Streaks**: Daily login rewards and streak bonuses
- **Levels**: Progressive leveling system

## Deployment

### Vercel
The project is configured for Vercel deployment:

1. Push code to GitHub
2. Connect repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy automatically on push

### Environment Variables
```
DATABASE_URL=mysql://user:password@host/dbname
CLERK_PUBLISHABLE_KEY=pk_...
CLERK_SECRET_KEY=sk_...
CONVEX_DEPLOYMENT=https://...
PADDLE_VENDOR_ID=...
PADDLE_API_KEY=...
```

## Testing

Run tests with:
```bash
pnpm test
```

Tests are located in `server/*.test.ts` files and use Vitest.

## Performance Optimization

- **Code Splitting**: Automatic with Vite
- **Image Optimization**: Use CDN URLs for media
- **Database Indexing**: Indexes on frequently queried fields
- **Caching**: tRPC query caching via React Query
- **Lazy Loading**: Page components loaded on demand

## Security

- **Authentication**: OAuth-based with session tokens
- **Authorization**: Role-based access control (user/admin)
- **Input Validation**: Zod schemas for all inputs
- **SQL Injection Prevention**: Drizzle ORM parameterized queries
- **CSRF Protection**: Built-in with session cookies
- **Rate Limiting**: Recommended for production deployment

## Future Enhancements

- [ ] Creator profiles and creator challenges
- [ ] Reward drops (mystery rewards)
- [ ] Advanced analytics dashboard
- [ ] Webhook integrations for offer providers
- [ ] Push notifications
- [ ] Mobile app (React Native)
- [ ] Real-time leaderboard updates (WebSocket)
- [ ] In-game achievements integration
- [ ] Social features (messaging, teams)
- [ ] Advanced fraud detection (ML-based)

## Contributing

1. Create a feature branch
2. Make your changes
3. Add tests for new features
4. Submit a pull request

## License

MIT

## Support

For issues and questions, please open a GitHub issue or contact support@vplay.com

---

**Built with ❤️ for gamers worldwide. Play. Compete. Earn.**
