import { Tabs, TabsList, TabsTrigger } from '@radix-ui/react-tabs'

const LANGS = ['python','javascript','java','go','rust','cpp']

export default function LanguageTabs({ value, onChange }) {
  return (
    <div className="w-full overflow-x-auto">
      <div className="inline-flex gap-2 p-2 rounded-xl bg-slate-800/60 border border-white/10">
        {LANGS.map(l => (
          <button
            key={l}
            onClick={() => onChange(l)}
            className={`px-3 py-1.5 rounded-lg text-sm capitalize border ${value===l? 'bg-blue-500 text-white border-blue-400' : 'bg-slate-900/50 text-slate-300 border-white/10 hover:border-white/20'}`}
          >
            {l}
          </button>
        ))}
      </div>
    </div>
  )
}
