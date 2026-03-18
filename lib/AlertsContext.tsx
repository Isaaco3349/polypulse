'use client'

import { createContext, useContext, useState, useEffect } from 'react'

export interface Alert {
  id: string
  marketId: string
  question: string
  threshold: number
  direction: 'above' | 'below'
  currentPrice: number
  triggered: boolean
}

interface AlertsContextType {
  alerts: Alert[]
  addAlert: (alert: Omit<Alert, 'triggered'>) => void
  removeAlert: (id: string) => void
}

const AlertsContext = createContext<AlertsContextType>({
  alerts: [],
  addAlert: () => {},
  removeAlert: () => {},
})

export function AlertsProvider({ children }: { children: React.ReactNode }) {
  const [alerts, setAlerts] = useState<Alert[]>([])

  useEffect(() => {
    try {
      const stored = localStorage.getItem('polypulse-alerts')
      if (stored) setAlerts(JSON.parse(stored))
    } catch {}
  }, [])

  function save(updated: Alert[]) {
    setAlerts(updated)
    localStorage.setItem('polypulse-alerts', JSON.stringify(updated))
  }

  function addAlert(alert: Omit<Alert, 'triggered'>) {
    save([...alerts, { ...alert, triggered: false }])
  }

  function removeAlert(id: string) {
    save(alerts.filter(a => a.id !== id))
  }

  return (
    <AlertsContext.Provider value={{ alerts, addAlert, removeAlert }}>
      {children}
    </AlertsContext.Provider>
  )
}

export function useAlerts() {
  return useContext(AlertsContext)
}