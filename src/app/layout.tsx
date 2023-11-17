import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from "@clerk/nextjs";
import TrpcProvider from "@/lib/trpc/Provider";

import Nav from "@/components/navigation/Nav";
import { Providers } from '@/components/Providers';

import './globals.css'

const inter = Inter({ subsets: ['latin'] })
import { Toaster } from 'sonner'
import { UserContextProvider } from '@/store/UserContext';

export const metadata: Metadata = {
  title: 'Gymtory',
  description: 'CSPEAR Inventory',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ClerkProvider>
          <TrpcProvider>
            <Providers>
              <UserContextProvider>
                <main>
                  <Nav />
                  <section className='m-auto w-11/12 md:w-10/12 mb-20'>
                    {children}
                  </section>
                  <Toaster richColors position="bottom-right" />
                </main>
              </UserContextProvider>
            </Providers>
          </TrpcProvider>
        </ClerkProvider>
      </body>
    </html>
  )
}
