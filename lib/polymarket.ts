import { Market } from '@/types/market'

const GAMMA_API = 'https://gamma-api.polymarket.com'

export async function fetchMarkets(limit = 50): Promise<Market[]> {
  const res = await fetch(
    `${GAMMA_API}/markets?active=true&closed=false&limit=${limit}&order=volume24hr&ascending=false`,
    { next: { revalidate: 60 } }
  )
  if (!res.ok) throw new Error('Failed to fetch markets')
  const data = await res.json()
  return data.map((m: any) => ({
    id: m.id,
    question: m.question,
    outcomes: JSON.parse(m.outcomes || '[]'),
    outcomePrices: JSON.parse(m.outcomePrices || '[]'),
    volume24hr: parseFloat(m.volume24hr || '0'),
    oneDayPriceChange: parseFloat(m.oneDayPriceChange || '0'),
    updatedAt: m.updatedAt,
    active: m.active,
    closed: m.closed,
    image: m.image,
  }))
}

export function getTrendingMarkets(markets: Market[], limit = 6) {
  return [...markets]
    .sort((a, b) => b.volume24hr - a.volume24hr)
    .slice(0, limit)
}

export function getBiggestMovers(markets: Market[], limit = 6) {
  return [...markets]
    .sort((a, b) => Math.abs(b.oneDayPriceChange) - Math.abs(a.oneDayPriceChange))
    .slice(0, limit)
}

export function getRecentActivity(markets: Market[], limit = 6) {
  return [...markets]
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, limit)
}