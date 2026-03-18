'use client'

import useLocalStorageState from 'use-local-storage-state'

export interface Alert {
  id: string
  marketId: string
  question: string
  threshold: number
  direction: 'above' | 'below'
  currentPrice: number
  triggered: boolean
}

export function useAlerts() {
  const [alerts, setAlerts] = useLocalStorageState<Alert[]>('polypulse-alerts', {
    defaultValue: [],
  })

  function addAlert(alert: Omit<Alert, 'triggered'>) {
    setAlerts(prev => [...prev, { ...alert, triggered: false }])
  }

  function removeAlert(id: string) {
    setAlerts(prev => prev.filter(a => a.id !== id))
  }

  function checkAlerts(marketId: string, currentPrice: number) {
    setAlerts(prev =>
      prev.map(alert => {
        if (alert.marketId !== marketId || alert.triggered) return alert
        const triggered =
          alert.direction === 'above'
            ? currentPrice >= alert.threshold
            : currentPrice <= alert.threshold
        if (triggered) {
          if (Notification.permission === 'granted') {
            new Notification('PolyPulse Alert 🔔', {
              body: `${alert.question.slice(0, 60)}... is now ${currentPrice.toFixed(1)}%`,
              icon: '/favicon.ico',
            })
          }
          return { ...alert, triggered: true }
        }
        return alert
      })
    )
  }

  return { alerts, addAlert, removeAlert, checkAlerts }
}