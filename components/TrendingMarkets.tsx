import { Market } from '@/types/market'

export default function TrendingMarkets({ markets }: { markets: Market[] }) {
  return (
    <section>
      <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-4">
        🔥 Trending by Volume (24h)
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {markets.map(market => {
          const price = parseFloat(market.outcomePrices[0] || '0') * 100
          return (
            <div key={market.id} className="bg-gray-900 border border-gray-800 rounded-xl p-4 hover:border-purple-500 transition-colors">
              <p className="text-sm text-gray-200 font-medium leading-snug line-clamp-2 mb-3">{market.question}</p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500 mb-0.5">Yes probability</p>
                  <p className="text-xl font-bold text-white">{price.toFixed(1)}%</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500 mb-0.5">24h volume</p>
                  <p className="text-sm font-semibold text-purple-400">
                    ${market.volume24hr >= 1000
                      ? `${(market.volume24hr / 1000).toFixed(1)}K`
                      : market.volume24hr.toFixed(0)}
                  </p>
                </div>
              </div>
              <div className="mt-3 bg-gray-800 rounded-full h-1.5">
                <div className="bg-purple-500 h-1.5 rounded-full" style={{ width: `${Math.min(price, 100)}%` }} />
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}