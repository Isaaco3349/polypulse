import { fetchMarkets, getTrendingMarkets, getBiggestMovers, getRecentActivity } from '@/lib/polymarket'
import { Market } from '@/types/market'
import Header from '@/components/Header'
import TrendingMarkets from '@/components/TrendingMarkets'
import ProbabilityMovers from '@/components/ProbabilityMovers'
import RecentActivity from '@/components/RecentActivity'
import SearchBar from '@/components/SearchBar'
import FilterBar from '@/components/FilterBar'
import { Suspense } from 'react'

function filterMarkets(markets: Market[], q: string, filter: string) {
  let filtered = markets
  if (q) {
    filtered = filtered.filter(m =>
      m.question.toLowerCase().includes(q.toLowerCase())
    )
  }
  if (filter && filter !== 'all') {
    const keywords: Record<string, string[]> = {
      politics: ['election', 'president', 'congress', 'senate', 'vote', 'political', 'trump', 'biden', 'government'],
      crypto: ['bitcoin', 'ethereum', 'crypto', 'btc', 'eth', 'token', 'blockchain', 'defi', 'nft'],
      sports: ['nfl', 'nba', 'soccer', 'football', 'basketball', 'champion', 'world cup', 'super bowl', 'lebron'],
      science: ['ai', 'climate', 'space', 'nasa', 'research', 'drug', 'vaccine', 'technology'],
      business: ['fed', 'stock', 'market', 'economy', 'rate', 'inflation', 'gdp', 'earnings'],
    }
    const words = keywords[filter] || []
    filtered = filtered.filter(m =>
      words.some(w => m.question.toLowerCase().includes(w))
    )
  }
  return filtered
}

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; filter?: string }>
}) {
  let markets: Market[] = []
  let error = null

  try {
    markets = await fetchMarkets(50)
  } catch (e: any) {
    error = e.message
  }

  const { q = '', filter = 'all' } = await searchParams
  const filtered = filterMarkets(markets, q, filter)

  const trending = getTrendingMarkets(filtered)
  const movers = getBiggestMovers(filtered)
  const recent = getRecentActivity(filtered)

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Header />
      <main className="max-w-7xl mx-auto px-6 py-8 space-y-12">
        <Suspense>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <SearchBar />
            <FilterBar />
          </div>
        </Suspense>
        {error ? (
          <div className="bg-red-900/30 border border-red-800 rounded-xl p-6 text-red-400 text-sm">
            Failed to load markets: {error}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-500 text-sm">
            No markets found for <span className="text-purple-400">"{q}"</span>
          </div>
        ) : (
          <>
            <TrendingMarkets markets={trending} />
            <ProbabilityMovers markets={movers} />
            <RecentActivity markets={recent} />
          </>
        )}
      </main>
      <footer className="border-t border-gray-800 mt-16 py-8 text-center">
        <p className="text-xs text-gray-600 mb-4">PolyPulse · Data from Polymarket · Refreshes every 60s</p>
        <div className="flex justify-center gap-3">
          <a href="https://x.com/Havertz3349" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 border border-gray-700 rounded-lg bg-gray-900 text-gray-300 text-xs font-medium hover:border-purple-500 hover:text-white transition-colors">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.259 5.63L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/>
            </svg>
            Follow on X
          </a>
          <a href="https://github.com/Isaaco3349" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 border border-gray-700 rounded-lg bg-gray-900 text-gray-300 text-xs font-medium hover:border-purple-500 hover:text-white transition-colors">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
            </svg>
            GitHub
          </a>
        </div>
      </footer>
    </div>
  )
}