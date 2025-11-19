import { useEffect, useMemo, useState } from 'react'
import Header from './components/Header'
import LanguageTabs from './components/LanguageTabs'
import ChallengeCard from './components/ChallengeCard'
import Community from './components/Community'

function App() {
  const [language, setLanguage] = useState('python')
  const [username, setUsername] = useState('')

  const baseUrl = useMemo(() => import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000', [])

  useEffect(() => {
    document.title = 'CodeCircle — Community & Daily Challenges'
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <Header username={username} setUsername={setUsername} />

      <main className="mx-auto max-w-6xl px-4 py-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white">{language.toUpperCase()} Community</h1>
            <p className="text-slate-300 text-sm">Daily challenges, projects, and help threads for your favorite language.</p>
          </div>
          <LanguageTabs value={language} onChange={setLanguage} />
        </div>

        <ChallengeCard baseUrl={baseUrl} language={language} username={username} />

        <Community baseUrl={baseUrl} language={language} />
      </main>

      <footer className="py-8 text-center text-slate-500 text-sm">
        Built for coders to share, discuss, and grow.
      </footer>
    </div>
  )
}

export default App
