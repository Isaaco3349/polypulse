'use client'

import { PricePoint } from '@/types/market'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

export default function PriceChart({ history, height = 100 }: { history: PricePoint[], height?: number }) {
  if (!history || history.length === 0) {
    return (
      <div className="flex items-center justify-center text-xs text-gray-600" style={{ height }}>
        No chart data available
      </div>
    )
  }

  const data = history.map(p => ({
    time: new Date(p.t * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    probability: parseFloat((p.p * 100).toFixed(1)),
  }))

  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data}>
        <XAxis dataKey="time" hide />
        <YAxis domain={[0, 100]} hide />
        <Tooltip
          contentStyle={{ background: '#111118', border: '1px solid #2a2a3a', borderRadius: 6, fontSize: 11 }}
          labelStyle={{ color: '#8888a0' }}
          formatter={(val) => [`${val}%`, 'Probability']}
        />
        <Line
          type="monotone"
          dataKey="probability"
          stroke="#a855f7"
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 4, fill: '#a855f7' }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}