'use client'
import { NextUIProvider } from '@nextui-org/react'
import ToastProvider from './ToastWrapper';
import {
  ClerkProvider,
} from '@clerk/nextjs'


export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <ToastProvider>
        <ClerkProvider>
          {/* <html lang='en'>
            <body>
              <SignedOut>
                <SignInButton />
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn> */}
              {children}
            {/* </body> */}
          {/* </html>/ */}
        </ClerkProvider>

      </ToastProvider>
    </NextUIProvider>
  )
}