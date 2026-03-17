import { fetchMarkets, getTrendingMarkets, getBiggestMovers, getRecentActivity } from '@/lib/polymarket'
import { Market } from '@/types/market'
import Header from '@/components/Header'
import TrendingMarkets from '@/components/TrendingMarkets'
import ProbabilityMovers from '@/components/ProbabilityMovers'
import RecentActivity from '@/components/RecentActivity'

export default async function Home() {
  let markets: Market[] = []
  let error = null

  try {
    markets = await fetchMarkets(50)
  } catch (e: any) {
    error = e.message
  }

  const trending = getTrendingMarkets(markets)
  const movers = getBiggestMovers(markets)
  const recent = getRecentActivity(markets)

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Header />
      <main className="max-w-7xl mx-auto px-6 py-8 space-y-12">
        {error ? (
          <div className="bg-red-900/30 border border-red-800 rounded-xl p-6 text-red-400 text-sm">
            Failed to load markets: {error}
          </div>
        ) : (
          <>
            <TrendingMarkets markets={trending} />
            <ProbabilityMovers markets={movers} />
            <RecentActivity markets={recent} />
          </>
        )}
      </main>
      <footer className="border-t border-gray-800 mt-16 py-6 text-center">
        <p className="text-xs text-gray-600">PolyPulse · Data from Polymarket · Refreshes every 60s</p>
      </footer>
    </div>
  )
}