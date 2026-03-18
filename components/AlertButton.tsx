'use client'

import { useState } from 'react'
import { useAlerts } from '@/lib/useAlerts'

export default function AlertButton({ marketId, question, currentPrice }: {
  marketId: string
  question: string
  currentPrice: number
}) {
    const { alerts, addAlert, removeAlert } = useAlerts()
  const [open, setOpen] = useState(false)
  const [threshold, setThreshold] = useState(currentPrice.toFixed(1))
  const [direction, setDirection] = useState<'above' | 'below'>('above')

  const existing = alerts.find(a => a.marketId === marketId)

  async function handleSet() {
    if (Notification.permission !== 'granted') {
      await Notification.requestPermission()
    }
    if (existing) {
      removeAlert(existing.id)
    } else {
      addAlert({
        id: `${marketId}-${Date.now()}`,
        marketId,
        question,
        threshold: parseFloat(threshold),
        direction,
        currentPrice,
      })
    }
    setOpen(false)
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={`p-1.5 rounded-lg border transition-colors ${
          existing
            ? 'border-purple-500 text-purple-400 bg-purple-900/20'
            : 'border-gray-700 text-gray-500 hover:border-purple-500 hover:text-purple-400'
        }`}
        title="Set price alert"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
          <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 top-8 z-50 bg-gray-900 border border-gray-700 rounded-xl p-4 w-64 shadow-xl">
          <p className="text-xs text-gray-400 mb-3 font-medium">Set Price Alert</p>
          {existing ? (
            <div>
              <p className="text-xs text-purple-400 mb-3">
                Alert set: {existing.direction} {existing.threshold}%
              </p>
              <button
                onClick={handleSet}
                className="w-full py-2 rounded-lg bg-red-900/40 text-red-400 text-xs font-medium hover:bg-red-900/60 transition-colors"
              >
                Remove Alert
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex gap-2">
                <button
                  onClick={() => setDirection('above')}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    direction === 'above'
                      ? 'bg-green-900/40 text-green-400 border border-green-700'
                      : 'bg-gray-800 text-gray-500 border border-gray-700'
                  }`}
                >
                  Above
                </button>
                <button
                  onClick={() => setDirection('below')}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    direction === 'below'
                      ? 'bg-red-900/40 text-red-400 border border-red-700'
                      : 'bg-gray-800 text-gray-500 border border-gray-700'
                  }`}
                >
                  Below
                </button>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={threshold}
                  onChange={e => setThreshold(e.target.value)}
                  min="0"
                  max="100"
                  step="0.1"
                  className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-3 py-1.5 text-xs text-gray-200 focus:outline-none focus:border-purple-500"
                />
                <span className="text-xs text-gray-500">%</span>
              </div>
              <button
                onClick={handleSet}
                className="w-full py-2 rounded-lg bg-purple-600 text-white text-xs font-medium hover:bg-purple-700 transition-colors"
              >
                Set Alert
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}