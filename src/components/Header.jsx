import { Menu, Flame, Code2, Star } from 'lucide-react'

export default function Header({ username, setUsername }) {
  return (
    <header className="sticky top-0 z-30 bg-slate-900/70 backdrop-blur supports-[backdrop-filter]:bg-slate-900/60 border-b border-white/10">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
            <Flame className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-white font-semibold leading-tight">CodeCircle</div>
            <div className="text-xs text-blue-200/70 -mt-0.5">Share • Discuss • Grow</div>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-2">
          <div className="flex items-center gap-2 bg-slate-800/80 border border-white/10 rounded-lg px-2 py-1">
            <Code2 className="w-4 h-4 text-blue-300" />
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Your username"
              className="bg-transparent outline-none text-sm text-white placeholder:text-slate-400"
            />
          </div>
          <div className="text-xs px-2 py-1 rounded-md bg-blue-500/10 text-blue-300 border border-blue-400/20">
            <Star className="inline w-3 h-3 mr-1" /> Keep a daily streak by solving challenges
          </div>
        </div>

        <button className="md:hidden p-2 text-slate-300" aria-label="Menu">
          <Menu />
        </button>
      </div>
    </header>
  )
}
