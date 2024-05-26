'use client'
import { NextUIProvider } from '@nextui-org/react'
import { SessionProvider } from "next-auth/react";
import ToastProvider from './ToastWrapper';


export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <NextUIProvider>
        <ToastProvider>
          {children}
        </ToastProvider>
      </NextUIProvider>
    </SessionProvider>
  )
}