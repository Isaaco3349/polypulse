'use client'

import { useState, useTransition } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

const SUGGESTIONS = ['Fed', 'Trump', 'Bitcoin', 'Election', 'Ethereum', 'NBA', 'AI', 'Iran', 'Netflix', 'SpaceX']

export default function SearchBar() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()
  const [value, setValue] = useState(searchParams.get('q') || '')

  function handleSearch(term: string) {
    setValue(term)
    startTransition(() => {
      const params = new URLSearchParams(searchParams.toString())
      if (term) {
        params.set('q', term)
      } else {
        params.delete('q')
      }
      router.replace(`/?${params.toString()}`)
    })
  }

  return (
    <div className="w-full max-w-xl">
      <div className="relative">
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
        </svg>
        <input
          type="text"
          value={value}
          onChange={e => handleSearch(e.target.value)}
          placeholder="Search markets..."
          className="w-full bg-gray-900 border border-gray-700 rounded-xl pl-10 pr-4 py-2.5 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
        />
        {isPending && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
        )}
      </div>
      <div className="flex items-center gap-2 mt-2 flex-wrap">
        <span className="text-xs text-gray-600">Try:</span>
        {SUGGESTIONS.map(s => (
          <button
            key={s}
            onClick={() => handleSearch(s)}
            className="text-xs text-gray-500 hover:text-purple-400 transition-colors"
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  )
}