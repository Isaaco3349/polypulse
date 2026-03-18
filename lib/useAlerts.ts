'use client'

import { useState, useEffect } from 'react'

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

  function checkAlerts(marketId: string, currentPrice: number) {
    const updated = alerts.map(alert => {
      if (alert.marketId !== marketId || alert.triggered) return alert
      const triggered =
        alert.direction === 'above'
          ? currentPrice >= alert.threshold
          : currentPrice <= alert.threshold
      if (triggered && Notification.permission === 'granted') {
        new Notification('PolyPulse Alert 🔔', {
          body: `${alert.question.slice(0, 60)}... is now ${currentPrice.toFixed(1)}%`,
          icon: '/favicon.ico',
        })
        return { ...alert, triggered: true }
      }
      return alert
    })
    save(updated)
  }

  return { alerts, addAlert, removeAlert, checkAlerts }
}