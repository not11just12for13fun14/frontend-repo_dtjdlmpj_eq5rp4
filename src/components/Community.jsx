import { useEffect, useState } from 'react'
import { MessageSquare, Rocket, SendHorizonal } from 'lucide-react'

export default function Community({ baseUrl, language }){
  const [posts, setPosts] = useState([])
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [kind, setKind] = useState('project')
  const [author, setAuthor] = useState('')

  async function load(){
    const res = await fetch(`${baseUrl}/posts?language=${language}`)
    const data = await res.json()
    setPosts(data.items || [])
  }

  useEffect(() => { load() }, [language])

  async function submit(){
    if(!title || !content){
      alert('Please provide a title and content');
      return
    }
    const res = await fetch(`${baseUrl}/posts`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ language, kind, title, content, author: author || 'anon' })
    })
    if(res.ok){
      setTitle(''); setContent('');
      await load()
    }
  }

  return (
    <div className="grid md:grid-cols-2 gap-5">
      <div className="bg-slate-800/60 border border-white/10 rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-3">
          <Rocket className="w-5 h-5 text-cyan-400"/>
          <div className="text-white font-semibold">Share a project or ask a question</div>
        </div>
        <div className="flex gap-2 mb-2">
          <select value={kind} onChange={e=>setKind(e.target.value)} className="bg-slate-900/60 border border-white/10 text-slate-200 rounded-lg px-2 py-1 text-sm">
            <option value="project">Project</option>
            <option value="question">Question</option>
          </select>
          <input value={author} onChange={e=>setAuthor(e.target.value)} placeholder="Your name (optional)" className="flex-1 bg-slate-900/60 border border-white/10 text-slate-200 rounded-lg px-3 py-1 text-sm"/>
        </div>
        <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Title" className="w-full bg-slate-900/60 border border-white/10 text-slate-200 rounded-lg px-3 py-2 text-sm mb-2"/>
        <textarea value={content} onChange={e=>setContent(e.target.value)} placeholder="Describe your project or problem..." rows={4} className="w-full bg-slate-900/60 border border-white/10 text-slate-200 rounded-lg px-3 py-2 text-sm mb-3"></textarea>
        <button onClick={submit} className="px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-600 text-white text-sm inline-flex items-center gap-2">
          <SendHorizonal className="w-4 h-4"/> Post
        </button>
      </div>

      <div className="bg-slate-800/60 border border-white/10 rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-3">
          <MessageSquare className="w-5 h-5 text-violet-400"/>
          <div className="text-white font-semibold">Latest in {language}</div>
        </div>
        <div className="space-y-3">
          {posts.length === 0 && <div className="text-slate-400 text-sm">No posts yet. Be the first!</div>}
          {posts.map(p => (
            <div key={p._id} className="rounded-xl border border-white/10 bg-slate-900/50 p-3">
              <div className="text-sm text-slate-400">{p.kind.toUpperCase()} • by {p.author || 'anon'}</div>
              <div className="text-white font-medium">{p.title}</div>
              <div className="text-slate-300 text-sm whitespace-pre-wrap">{p.content}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
