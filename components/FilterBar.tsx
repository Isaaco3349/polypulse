'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useTransition } from 'react'

const FILTERS = [
  { label: 'All', value: 'all' },
  { label: 'Politics', value: 'politics' },
  { label: 'Crypto', value: 'crypto' },
  { label: 'Sports', value: 'sports' },
  { label: 'Science', value: 'science' },
  { label: 'Business', value: 'business' },
]

export default function FilterBar() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()
  const active = searchParams.get('filter') || 'all'

  function handleFilter(value: string) {
    startTransition(() => {
      const params = new URLSearchParams(searchParams.toString())
      if (value === 'all') {
        params.delete('filter')
      } else {
        params.set('filter', value)
      }
      router.replace(`/?${params.toString()}`)
    })
  }

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {FILTERS.map(f => (
        <button
          key={f.value}
          onClick={() => handleFilter(f.value)}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
            active === f.value
              ? 'bg-purple-600 text-white'
              : 'bg-gray-900 border border-gray-700 text-gray-400 hover:border-purple-500 hover:text-white'
          }`}
        >
          {f.label}
        </button>
      ))}
      {isPending && <span className="text-xs text-gray-500 animate-pulse">Filtering...</span>}
    </div>
  )
}