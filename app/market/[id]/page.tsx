import { fetchMarkets, fetchPriceHistory } from '@/lib/polymarket'
import { Market, PricePoint } from '@/types/market'
import Header from '@/components/Header'
import PriceChart from '@/components/PriceChart'
import AlertButton from '@/components/AlertButton'
import Link from 'next/link'

export default async function MarketPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const markets = await fetchMarkets(50)
  const market = markets.find((m: Market) => m.id === id)

  if (!market) {
    return (
      <div className="min-h-screen bg-gray-950 text-white">
        <Header />
        <main className="max-w-4xl mx-auto px-6 py-12 text-center">
          <p className="text-gray-400 text-sm mb-4">Market not found</p>
          <Link href="/" className="text-purple-400 text-sm hover:underline">← Back to dashboard</Link>
        </main>
      </div>
    )
  }

  const tokenId = market.clobTokenIds?.[0]
  const history: PricePoint[] = tokenId ? await fetchPriceHistory(tokenId) : []
  const price = parseFloat(market.outcomePrices[0] || '0') * 100
  const change = market.oneDayPriceChange * 100
  const isUp = change >= 0

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Header />
      <main className="max-w-4xl mx-auto px-6 py-8">

        <Link href="/" className="inline-flex items-center gap-2 text-xs text-gray-500 hover:text-purple-400 transition-colors mb-6">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Back to dashboard
        </Link>

        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-6">
          <div className="flex items-start justify-between gap-4 mb-6">
            <h1 className="text-lg font-semibold text-gray-100 leading-snug">{market.question}</h1>
            <AlertButton marketId={market.id} question={market.question} currentPrice={price} />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            <div className="bg-gray-800 rounded-xl p-3">
              <p className="text-xs text-gray-500 mb-1">Yes probability</p>
              <p className="text-2xl font-bold text-white">{price.toFixed(1)}%</p>
            </div>
            <div className="bg-gray-800 rounded-xl p-3">
              <p className="text-xs text-gray-500 mb-1">24h change</p>
              <p className={`text-2xl font-bold ${isUp ? 'text-green-400' : 'text-red-400'}`}>
                {isUp ? '+' : ''}{change.toFixed(1)}%
              </p>
            </div>
            <div className="bg-gray-800 rounded-xl p-3">
              <p className="text-xs text-gray-500 mb-1">24h volume</p>
              <p className="text-2xl font-bold text-purple-400">
                ${market.volume24hr >= 1000
                  ? `${(market.volume24hr / 1000).toFixed(1)}K`
                  : market.volume24hr.toFixed(0)}
              </p>
            </div>
            <div className="bg-gray-800 rounded-xl p-3">
              <p className="text-xs text-gray-500 mb-1">No probability</p>
              <p className="text-2xl font-bold text-white">
                {(100 - price).toFixed(1)}%
              </p>
            </div>
          </div>

          <div>
            <p className="text-xs text-gray-500 uppercase tracking-widest mb-3">Probability over time</p>
            <PriceChart history={history} height={200} />
          </div>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <p className="text-xs text-gray-500 uppercase tracking-widest mb-4">Outcomes</p>
          <div className="space-y-3">
            {market.outcomes.map((outcome: string, i: number) => {
              const p = parseFloat(market.outcomePrices[i] || '0') * 100
              return (
                <div key={outcome}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-300">{outcome}</span>
                    <span className="text-white font-semibold">{p.toFixed(1)}%</span>
                  </div>
                  <div className="bg-gray-800 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${i === 0 ? 'bg-purple-500' : 'bg-gray-600'}`}
                      style={{ width: `${Math.min(p, 100)}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

      </main>
    </div>
  )
}