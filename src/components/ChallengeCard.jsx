import { useEffect, useState } from 'react'
import { Flame, Timer, CheckCircle2 } from 'lucide-react'

export default function ChallengeCard({ baseUrl, language, username, onSubmit }) {
  const [challenge, setChallenge] = useState(null)
  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [streak, setStreak] = useState(0)

  useEffect(() => {
    async function load() {
      setLoading(true)
      try {
        const res = await fetch(`${baseUrl}/challenges/${language}`)
        const data = await res.json()
        setChallenge(data)
        await refreshStreak()
      } finally {
        setLoading(false)
      }
    }
    async function refreshStreak(){
      if(!username) return
      const r = await fetch(`${baseUrl}/streak/${encodeURIComponent(username)}/${language}`)
      const d = await r.json()
      setStreak(d.streak || 0)
    }
    load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language, username])

  const submit = async () => {
    if(!username){ alert('Enter a username at top right to track your streak.'); return }
    setSubmitting(true)
    try {
      const res = await fetch(`${baseUrl}/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, language })
      })
      const data = await res.json()
      setStreak(data.streak || 0)
      onSubmit?.(data)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="bg-slate-800/60 border border-white/10 rounded-2xl p-5">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Flame className="w-5 h-5 text-orange-400" />
          <div className="text-white font-semibold">Daily Challenge</div>
        </div>
        <div className="text-sm text-blue-200/80">Streak: <span className="font-semibold text-white">{streak}</span></div>
      </div>

      {loading && <div className="text-slate-300 text-sm">Loading challenge...</div>}
      {!loading && challenge && (
        <div>
          <div className="text-lg text-white font-medium mb-1">{challenge.title}</div>
          <div className="text-slate-300 text-sm mb-4">{challenge.description}</div>
          <div className="flex items-center gap-3">
            <button onClick={submit} disabled={submitting} className="px-3 py-1.5 rounded-lg bg-blue-500 hover:bg-blue-600 disabled:opacity-60 text-white text-sm inline-flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4"/> Mark as completed today
            </button>
            <div className="text-xs text-slate-400 inline-flex items-center gap-1">
              <Timer className="w-3 h-3"/> New challenge every day
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
