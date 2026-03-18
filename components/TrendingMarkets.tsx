import { Market, PricePoint } from '@/types/market'
import { fetchPriceHistory } from '@/lib/polymarket'
import PriceChart from './PriceChart'
import AlertButton from './AlertButton'

async function MarketCard({ market }: { market: Market }) {
  const tokenId = market.clobTokenIds?.[0]
  const history: PricePoint[] = tokenId ? await fetchPriceHistory(tokenId) : []
  const price = parseFloat(market.outcomePrices[0] || '0') * 100

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 hover:border-purple-500 transition-colors">
      <div className="flex items-start justify-between gap-2 mb-3">
        <p className="text-sm text-gray-200 font-medium leading-snug line-clamp-2">{market.question}</p>
        <AlertButton marketId={market.id} question={market.question} currentPrice={price} />
      </div>
      <div className="flex items-center justify-between mb-3">
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
      <PriceChart history={history} />
      <div className="mt-2 bg-gray-800 rounded-full h-1.5">
        <div className="bg-purple-500 h-1.5 rounded-full" style={{ width: `${Math.min(price, 100)}%` }} />
      </div>
    </div>
  )
}

export default function TrendingMarkets({ markets }: { markets: Market[] }) {
  return (
    <section>
      <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-4">
        🔥 Trending by Volume (24h)
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {markets.map(market => (
          <MarketCard key={market.id} market={market} />
        ))}
      </div>
    </section>
  )
}