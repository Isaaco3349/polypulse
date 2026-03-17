import { Market } from '@/types/market'

export default function ProbabilityMovers({ markets }: { markets: Market[] }) {
  return (
    <section>
      <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-4">
        ⚡ Biggest Probability Movers (24h)
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {markets.map(market => {
          const change = market.oneDayPriceChange * 100
          const isUp = change >= 0
          const price = parseFloat(market.outcomePrices[0] || '0') * 100
          return (
            <div key={market.id} className="bg-gray-900 border border-gray-800 rounded-xl p-4 hover:border-purple-500 transition-colors">
              <p className="text-sm text-gray-200 font-medium leading-snug line-clamp-2 mb-3">{market.question}</p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500 mb-0.5">Current</p>
                  <p className="text-xl font-bold text-white">{price.toFixed(1)}%</p>
                </div>
                <div className={`text-right px-3 py-1.5 rounded-lg ${isUp ? 'bg-green-900/40 text-green-400' : 'bg-red-900/40 text-red-400'}`}>
                  <p className="text-xs mb-0.5">24h change</p>
                  <p className="text-lg font-bold">{isUp ? '+' : ''}{change.toFixed(1)}%</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}