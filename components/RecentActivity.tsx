import { Market } from '@/types/market'

export default function RecentActivity({ markets }: { markets: Market[] }) {
  return (
    <section>
      <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-4">
        🕒 Recent Market Activity
      </h2>
      <div className="bg-gray-900 border border-gray-800 rounded-xl divide-y divide-gray-800">
        {markets.map(market => {
          const price = parseFloat(market.outcomePrices[0] || '0') * 100
          const change = market.oneDayPriceChange * 100
          const isUp = change >= 0
          const timeAgo = getTimeAgo(market.updatedAt)
          return (
            <div key={market.id} className="flex items-center justify-between px-4 py-3 hover:bg-gray-800/50 transition-colors">
              <div className="flex-1 min-w-0 mr-4">
                <p className="text-sm text-gray-200 truncate">{market.question}</p>
                <p className="text-xs text-gray-500 mt-0.5">{timeAgo}</p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span className="text-sm font-semibold text-white">{price.toFixed(1)}%</span>
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${isUp ? 'bg-green-900/50 text-green-400' : 'bg-red-900/50 text-red-400'}`}>
                  {isUp ? '+' : ''}{change.toFixed(1)}%
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

function getTimeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  return `${Math.floor(hrs / 24)}d ago`
}