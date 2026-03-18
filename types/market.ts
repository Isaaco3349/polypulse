export interface Market {
  id: string
  question: string
  outcomes: string[]
  outcomePrices: string[]
  volume24hr: number
  oneDayPriceChange: number
  updatedAt: string
  active: boolean
  closed: boolean
  image?: string
  clobTokenIds?: string[]
}

export interface PricePoint {
  t: number
  p: number
}