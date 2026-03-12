# vPlay Deployment Guide

## Prerequisites

- Node.js 22+
- pnpm 10+
- MySQL database (or compatible)
- Vercel account (for deployment)
- GitHub repository

## Environment Setup

### 1. Database Configuration

Create a MySQL database and configure the connection string:

```bash
# .env.local
DATABASE_URL=mysql://user:password@host:3306/vplay
```

### 2. Authentication Setup

Configure Manus OAuth credentials:

```bash
VITE_APP_ID=your_app_id
VITE_OAUTH_PORTAL_URL=https://oauth.manus.im
OAUTH_SERVER_URL=https://api.manus.im
JWT_SECRET=your_jwt_secret_key
OWNER_OPEN_ID=your_owner_open_id
OWNER_NAME=Your Name
```

### 3. Optional Integrations

#### Paddle (Payment Processing)
```bash
PADDLE_VENDOR_ID=your_vendor_id
PADDLE_API_KEY=your_api_key
```

#### Tremendous (Reward Payouts)
```bash
TREMENDOUS_API_KEY=your_api_key
```

#### Analytics
```bash
VITE_ANALYTICS_ENDPOINT=https://analytics.manus.im
VITE_ANALYTICS_WEBSITE_ID=your_website_id
```

## Local Development

### 1. Install Dependencies
```bash
pnpm install
```

### 2. Generate Database Migrations
```bash
pnpm db:generate
pnpm db:migrate
```

### 3. Start Development Server
```bash
pnpm dev
```

The application will be available at `http://localhost:3000`

## Building for Production

### 1. Build the Application
```bash
pnpm build
```

### 2. Test Production Build Locally
```bash
pnpm start
```

## Vercel Deployment

### 1. Connect GitHub Repository

1. Push your code to GitHub
2. Go to [Vercel Dashboard](https://vercel.com/dashboard)
3. Click "New Project"
4. Select your GitHub repository
5. Click "Import"

### 2. Configure Environment Variables

In Vercel dashboard, go to Settings → Environment Variables and add:

```
DATABASE_URL=mysql://user:password@host:3306/vplay
VITE_APP_ID=your_app_id
VITE_OAUTH_PORTAL_URL=https://oauth.manus.im
OAUTH_SERVER_URL=https://api.manus.im
JWT_SECRET=your_jwt_secret_key
OWNER_OPEN_ID=your_owner_open_id
OWNER_NAME=Your Name
VITE_ANALYTICS_ENDPOINT=https://analytics.manus.im
VITE_ANALYTICS_WEBSITE_ID=your_website_id
BUILT_IN_FORGE_API_URL=https://api.manus.im
BUILT_IN_FORGE_API_KEY=your_api_key
VITE_FRONTEND_FORGE_API_URL=https://api.manus.im
VITE_FRONTEND_FORGE_API_KEY=your_api_key
VITE_APP_TITLE=vPlay – Play & Earn Gaming Platform
VITE_APP_LOGO=https://cdn.example.com/logo.png
```

### 3. Configure Build Settings

- **Framework Preset**: Next.js
- **Build Command**: `pnpm build`
- **Output Directory**: `.next`
- **Install Command**: `pnpm install`

### 4. Deploy

Click "Deploy" to start the deployment process. Vercel will:
1. Clone your repository
2. Install dependencies
3. Build the application
4. Deploy to edge network

## Post-Deployment

### 1. Verify Deployment

1. Check the Vercel dashboard for deployment status
2. Visit your deployed URL
3. Test authentication flow
4. Test core features (offers, wallet, leaderboard)

### 2. Database Migrations

If you added new database tables, run migrations:

```bash
# Via Vercel CLI
vercel env pull
pnpm db:migrate
```

### 3. Monitor Performance

- Use Vercel Analytics to monitor performance
- Check Vercel Logs for errors
- Monitor database performance

## Scaling Considerations

### Database Optimization
- Add indexes on frequently queried columns
- Optimize query performance with Drizzle
- Consider read replicas for high traffic

### Caching Strategy
- Implement Redis for session caching
- Cache leaderboard data
- Cache offer listings

### CDN Configuration
- Use Vercel's built-in CDN for static assets
- Upload media to S3 or similar service
- Use CDN URLs in application

## Security Checklist

- [ ] Enable HTTPS (automatic with Vercel)
- [ ] Configure CORS properly
- [ ] Validate all user inputs
- [ ] Use environment variables for secrets
- [ ] Enable rate limiting
- [ ] Monitor for fraud patterns
- [ ] Regular security audits
- [ ] Keep dependencies updated

## Troubleshooting

### Database Connection Issues
```bash
# Test database connection
mysql -h host -u user -p -e "SELECT 1"

# Check DATABASE_URL format
# mysql://user:password@host:3306/database
```

### Build Failures
```bash
# Clear build cache
rm -rf .next dist

# Reinstall dependencies
pnpm install --force

# Run type check
pnpm check
```

### Deployment Failures
1. Check Vercel build logs
2. Verify environment variables are set
3. Ensure database is accessible
4. Check for TypeScript errors: `pnpm check`

## Rollback Procedure

If deployment causes issues:

1. Go to Vercel dashboard
2. Select the project
3. Go to "Deployments"
4. Find the previous working deployment
5. Click the three dots menu
6. Select "Promote to Production"

## Monitoring & Maintenance

### Regular Tasks
- Monitor error rates in Vercel Logs
- Review user feedback and bug reports
- Update dependencies monthly
- Backup database regularly
- Review fraud flags and suspicious activity

### Performance Monitoring
- Monitor API response times
- Track database query performance
- Monitor error rates
- Track user engagement metrics

## Support & Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Drizzle ORM Documentation](https://orm.drizzle.team)
- [tRPC Documentation](https://trpc.io/docs)

## Contact

For deployment issues or questions, contact: support@vplay.com
