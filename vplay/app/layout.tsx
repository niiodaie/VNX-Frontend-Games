import type { Metadata } from 'next'
import { ClerkProvider } from '@clerk/nextjs'
import { ConvexClientProvider } from '@/app/providers'
import './globals.css'

export const metadata: Metadata = {
  title: 'vPlay - Play & Earn Gaming Platform',
  description: 'Discover games, complete challenges, and earn vBits. Play, Compete, Earn.',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <ConvexClientProvider>
        <html lang="en">
          <head>
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
          </head>
          <body>
            {children}
          </body>
        </html>
      </ConvexClientProvider>
    </ClerkProvider>
  )
}
