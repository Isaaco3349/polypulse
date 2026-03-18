'use client'

import { AlertsProvider } from '@/lib/AlertsContext'

export default function Providers({ children }: { children: React.ReactNode }) {
  return <AlertsProvider>{children}</AlertsProvider>
}