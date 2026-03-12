# vPlay - Play & Earn Gaming Platform

A modern gaming platform where users discover games, complete challenges, compete in tournaments, and earn vBits that can be redeemed for real rewards.

## Tech Stack

- **Frontend**: Next.js 15 (App Router) + React 19
- **Backend**: Convex (serverless database + functions)
- **Authentication**: Clerk
- **Styling**: Tailwind CSS
- **Deployment**: Vercel

## Features

### Version 1 (MVP)
- ✅ Landing page with hero section
- ✅ User authentication (Clerk)
- ✅ User dashboard with wallet
- ✅ vBits currency system (1000 vBits = $1)
- ✅ Games discovery page
- ✅ Offer wall (sponsored tasks)
- ✅ Rewards marketplace
- ✅ Referral system
- ✅ Leaderboards
- ✅ Daily streak system
- ✅ User profile page
- ✅ Admin panel (basic)
- ✅ Multi-language support (EN, ES, FR, PT, AR)

### Future Features (Architecture Ready)
- Tournaments
- Game rooms
- Leagues
- Achievements & badges
- Country wars
- Creator tournaments
- Sponsored competitions

## Project Structure

```
vplay-next/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout with providers
│   ├── page.tsx           # Landing page
│   ├── dashboard/         # Dashboard pages
│   ├── games/             # Games pages
│   ├── offers/            # Offers pages
│   ├── rewards/           # Rewards marketplace
│   ├── leaderboard/       # Leaderboard pages
│   ├── referrals/         # Referral pages
│   ├── profile/           # Profile pages
│   ├── admin/             # Admin panel
│   └── (auth)/            # Clerk auth pages
├── components/            # Reusable React components
├── convex/               # Convex backend
│   ├── schema.ts         # Database schema
│   ├── users.ts          # User functions
│   ├── games.ts          # Games functions
│   ├── leaderboard.ts    # Leaderboard functions
│   └── ...
├── lib/                  # Utilities and helpers
├── hooks/                # Custom React hooks
├── types/                # TypeScript types
├── messages/             # i18n translations
├── public/               # Static assets
├── middleware.ts         # Next.js middleware
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── README.md
```

## Getting Started

### Prerequisites
- Node.js 18+
- npm or pnpm
- Clerk account
- Convex account

### Installation

1. **Clone the repository**
```bash
git clone <repo-url>
cd vplay-next
```

2. **Install dependencies**
```bash
pnpm install
```

3. **Set up environment variables**
```bash
cp .env.example .env.local
```

Fill in your credentials:
- `NEXT_PUBLIC_CONVEX_URL` - From Convex dashboard
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` - From Clerk dashboard
- `CLERK_SECRET_KEY` - From Clerk dashboard

4. **Start Convex dev server**
```bash
pnpm convex
```

5. **Start Next.js dev server**
```bash
pnpm dev
```

Visit `http://localhost:3000`

## Development

### Database Schema
The database is managed by Convex. Schema is defined in `convex/schema.ts`.

### Backend Functions
All backend logic is in `convex/` directory:
- `users.ts` - User management and wallet operations
- `games.ts` - Games and offers management
- `leaderboard.ts` - Leaderboard queries
- `referrals.ts` - Referral system
- `rewards.ts` - Rewards marketplace
- `streaks.ts` - Daily streak tracking

### Frontend Pages
Pages are organized by feature in `app/` directory using Next.js App Router.

### Styling
- Tailwind CSS for utility-first styling
- Custom CSS in `app/globals.css` for gaming effects
- Glass morphism and neon glow effects

### Multi-Language Support
Using `next-intl` for internationalization. Translations in `messages/` directory.

Supported languages:
- English (en)
- Spanish (es)
- French (fr)
- Portuguese (pt)
- Arabic (ar)

## Building for Production

```bash
pnpm build
pnpm start
```

## Deployment

### Vercel Deployment

1. **Push to GitHub**
```bash
git push origin main
```

2. **Connect to Vercel**
- Go to vercel.com
- Import your GitHub repository
- Add environment variables
- Deploy

3. **Set up Convex for production**
- Deploy Convex functions
- Update `NEXT_PUBLIC_CONVEX_URL` to production URL

4. **Configure Clerk**
- Add production domain to Clerk allowed origins
- Update Clerk environment variables in Vercel

## API Reference

### User Functions
- `getOrCreateUser` - Create or get user
- `getUserByClerkId` - Get user by Clerk ID
- `updateUserProfile` - Update user profile
- `addVBits` - Add vBits to wallet
- `spendVBits` - Spend vBits from wallet
- `getTransactionHistory` - Get wallet transactions

### Games & Offers
- `listGames` - Get all games
- `getGame` - Get game details
- `listOffers` - Get all offers
- `completeOffer` - Mark offer as completed
- `getUserOfferCompletions` - Get user's completed offers

### Leaderboard
- `getLeaderboard` - Get top earners
- `getUserRank` - Get user's rank
- `updateLeaderboard` - Update leaderboard entry

## Currency System

**vBits** is the in-game currency:
- 1000 vBits = $1 USD
- Users earn vBits by:
  - Completing games
  - Finishing offers
  - Referrals
  - Daily bonuses
  - Tournaments
- vBits can be redeemed for:
  - Gift cards
  - Cash
  - Cryptocurrency
  - Other rewards

## User Data

Each user has:
- **Profile**: Username, avatar, country, language, timezone
- **Wallet**: vBits balance, transaction history
- **Engagement**: Games played, offers completed, rank
- **Referral**: Unique referral code, referred users

## Security

- Clerk handles authentication
- Convex manages data access control
- Environment variables for sensitive data
- HTTPS only in production
- Rate limiting ready

## Support & Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [Convex Documentation](https://docs.convex.dev)
- [Clerk Documentation](https://clerk.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## License

MIT

## Contact

For questions or support, please reach out to the vPlay team.
