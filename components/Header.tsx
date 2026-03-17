export default function Header() {
    return (
      <header className="border-b border-gray-800 bg-gray-950 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">
              Poly<span className="text-purple-400">Pulse</span>
            </h1>
            <p className="text-xs text-gray-500 mt-0.5 tracking-widest uppercase">Polymarket Analytics Dashboard</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-xs text-gray-400">Live · updates every 60s</span>
          </div>
        </div>
      </header>
    )
  }