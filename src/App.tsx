import { useEffect, useRef, useState } from 'react'
import type { FormEvent, KeyboardEvent } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { externalLinks, site } from './site'

type OutputLine = { text: string; kind?: 'muted' | 'success' | 'error' | 'link'; href?: string }
type Entry = { command: string; output: OutputLine[] }

const helpLines: OutputLine[] = [
  { text: 'Available commands:', kind: 'muted' },
  { text: 'whoami     About me' },
  { text: 'resume     View my resume' },
  { text: 'github     GitHub profile' },
  { text: 'links      Social and contact links' },
  { text: 'pwd        Print working directory' },
  { text: 'history    Show commands from this session' },
  { text: 'clear      Clear the terminal' },
  { text: 'help       Show this help message' },
]
const commands = ['whoami', 'resume', 'github', 'links', 'pwd', 'history', 'clear', 'help']

function removeResumeMention(markdown: string) {
  return markdown
    .replace(/^#.*$/m, '')
    .split('\n')
    .filter((line) => !/explore my cv|cv\.forty2\.me/i.test(line))
    .join('\n')
    .trim()
}

function inlineMarkdown(text: string) {
  const tokenPattern = /(\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\([^)]+\))/g
  return text.split(tokenPattern).filter(Boolean).map((token, index) => {
    const link = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
    if (link) return <a key={index} href={link[2]} target="_blank" rel="noreferrer">{link[1]}</a>
    if (token.startsWith('**') && token.endsWith('**')) return <strong key={index}>{token.slice(2, -2)}</strong>
    if (token.startsWith('*') && token.endsWith('*')) return <em key={index}>{token.slice(1, -1)}</em>
    return <span key={index}>{token}</span>
  })
}

function ReadmeContent({ markdown }: { markdown: string }) {
  const blocks = removeResumeMention(markdown).split(/\n\s*\n/).filter(Boolean)
  return <div className="readme-content">{blocks.map((block, index) => {
    const lines = block.split('\n').map((line) => line.trim()).filter(Boolean)
    const first = lines[0]
    if (/^---+$/.test(first)) return <hr key={index} />
    const heading = first.match(/^(#{2,6})\s+(.+)$/)
    if (heading) return <h2 key={index}>{inlineMarkdown(heading[2])}</h2>
    if (lines.every((line) => /^\*\s+/.test(line))) {
      return <ul key={index}>{lines.map((line, itemIndex) => <li key={itemIndex}>{inlineMarkdown(line.replace(/^\*\s+/, ''))}</li>)}</ul>
    }
    return <p key={index}>{inlineMarkdown(lines.join(' '))}</p>
  })}</div>
}

function PageContent({ path, readme, readmeState }: { path: string; readme: string; readmeState: 'loading' | 'ready' | 'error' }) {
  if (path === '/resume') {
    return (
      <article className="page resume-page">
        <PagePath path="/resume" />
        <h1>Resume</h1>
        <p className="lede">A concise overview of my experience, education, and work.</p>
        {site.resumePdf && <a className="button-link" href={site.resumePdf} target="_blank" rel="noreferrer">Open PDF ↗</a>}
        <section className="migration-note">
          <h2>Resume content</h2>
          <p>The full resume is being moved here from <a href="https://cv.forty2.me">cv.forty2.me</a>.</p>
          <p className="muted">Experience and education details will appear here once the current CV content and PDF are added.</p>
        </section>
      </article>
    )
  }

  if (path === '/github') {
    return (
      <article className="page">
        <PagePath path="/github" />
        <h1>GitHub</h1>
        <p className="lede">Code, experiments, and the occasional useful tool.</p>
        <section className="link-card">
          <div><h2>Find me on GitHub</h2><p className="muted">Open source work and things I am building.</p></div>
          <a className="button-link" href={site.github} target="_blank" rel="noreferrer">Visit GitHub ↗</a>
        </section>
      </article>
    )
  }

  return (
    <article className="page home-page">
      <PagePath path="/" />
      <section className="intro">
        <p className="eyebrow">A little about me</p>
        <h1>{site.name}</h1>
        <p className="role">{site.role} <span>·</span> {site.location}</p>
        {readmeState === 'loading' && <p className="lede muted">Loading profile from GitHub…</p>}
        {readmeState === 'error' && <p className="lede muted">Profile text could not be loaded. <a href={site.github} target="_blank" rel="noreferrer">Read it on GitHub ↗</a></p>}
        {readmeState === 'ready' && <ReadmeContent markdown={readme} />}
      </section>
    </article>
  )
}

function PagePath({ path }: { path: string }) {
  return <div className="page-path"><span>{path}</span><span className="page-index">forty2.me</span></div>
}

export default function App() {
  const location = useLocation()
  const navigate = useNavigate()
  const inputRef = useRef<HTMLInputElement>(null)
  const endRef = useRef<HTMLDivElement>(null)
  const [input, setInput] = useState('')
  const [readme, setReadme] = useState('')
  const [readmeState, setReadmeState] = useState<'loading' | 'ready' | 'error'>('loading')
  const [entries, setEntries] = useState<Entry[]>([
    { command: 'help', output: helpLines },
    { command: 'whoami', output: [
      { text: site.name, kind: 'success' },
      { text: `${site.role} · ${site.location}`, kind: 'muted' },
    ] },
  ])
  const [history, setHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [mobileOpen, setMobileOpen] = useState(false)
  const path = ['/resume', '/github'].includes(location.pathname) ? location.pathname : '/'

  useEffect(() => { endRef.current?.scrollIntoView({ block: 'nearest' }) }, [entries])
  useEffect(() => { document.title = 'forty2.me' }, [])
  useEffect(() => {
    if (path !== '/') return
    const controller = new AbortController()
    setReadmeState('loading')
    fetch(site.readme, { cache: 'no-store', signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error(`README request failed: ${response.status}`)
        return response.text()
      })
      .then((text) => {
        const cleaned = removeResumeMention(text)
        setReadme(cleaned)
        setReadmeState('ready')
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === 'AbortError') return
        setReadmeState('error')
      })
    return () => controller.abort()
  }, [path])

  function execute(raw: string) {
    const value = raw.trim()
    if (!value) return
    const [name] = value.toLowerCase().split(/\s+/)
    setHistory((current) => [...current, value])
    setHistoryIndex(-1)
    setInput('')
    if (name === 'clear') {
      setEntries([])
      navigate('/')
      return
    }

    let output: OutputLine[] = []
    switch (name) {
      case 'help': output = helpLines; break
      case 'whoami':
        output = [
          { text: site.name, kind: 'success' },
          { text: `${site.role} · ${site.location}`, kind: 'muted' },
        ]
        navigate('/')
        break
      case 'resume': output = [{ text: 'Opening /resume', kind: 'link' }]; navigate('/resume'); break
      case 'github': output = [{ text: 'Opening /github', kind: 'link' }]; navigate('/github'); break
      case 'links':
        output = externalLinks.map((link) => ({ text: `${link.label}  ${link.detail}`, kind: 'link' as const, href: link.href }))
        break
      case 'pwd': output = [{ text: '/home/zed', kind: 'muted' }]; break
      case 'history': output = [...history, value].map((entry, index) => ({ text: `${index + 1}  ${entry}`, kind: 'muted' })); break
      default: output = [{ text: `Command not found: ${name}. Type "help" to see available commands.`, kind: 'error' }]
    }
    setEntries((current) => [...current, { command: value, output }])
  }

  function onKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'ArrowUp') {
      event.preventDefault()
      const next = Math.min(historyIndex + 1, history.length - 1)
      setHistoryIndex(next)
      setInput(history[history.length - 1 - next] ?? '')
    } else if (event.key === 'ArrowDown') {
      event.preventDefault()
      const next = Math.max(historyIndex - 1, -1)
      setHistoryIndex(next)
      setInput(next < 0 ? '' : history[history.length - 1 - next] ?? '')
    } else if (event.key === 'Tab') {
      event.preventDefault()
      const matches = commands.filter((command) => command.startsWith(input.trim().toLowerCase()))
      if (matches.length === 1) setInput(matches[0])
    } else if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'l') {
      event.preventDefault()
      setEntries([])
    }
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    execute(input)
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <div className="brand-group">
          <div className="window-dots" aria-hidden="true"><i /><i /><i /></div>
          <Link className="brand" to="/">forty2.me</Link>
          <span className="breadcrumb">~</span>
          <span className="welcome">Welcome to my home on the web</span>
        </div>
        <nav className="top-links" aria-label="Main links">
          <a href={site.github} target="_blank" rel="noreferrer">[ github ]</a><a href={site.linkedin} target="_blank" rel="noreferrer">[ linkedin ]</a><a href="https://cv.forty2.me" target="_blank" rel="noreferrer">[ resume ]</a>
          {site.email && <a href={`mailto:${site.email}`}>[ email ]</a>}
        </nav>
      </header>

      <div className="workspace">
        <section className={`terminal-pane ${mobileOpen ? 'mobile-open' : ''}`} aria-label="Interactive terminal">
          <div className="terminal-scroll" aria-label="Terminal output" role="log" aria-live="polite" aria-relevant="additions">
            {entries.map((entry, index) => (
              <div className="terminal-entry" key={`${entry.command}-${index}`}>
                <div className="command-line"><span className="prompt">zed@forty2.me:~$</span> <span>{entry.command}</span></div>
                <div className="command-output">{entry.output.map((line, lineIndex) => <div className={`output-line ${line.kind ?? ''}`} key={`${line.text}-${lineIndex}`}>{line.href ? <a href={line.href} target="_blank" rel="noreferrer">{line.text} ↗</a> : line.text}</div>)}</div>
              </div>
            ))}
            <div ref={endRef} />
          </div>
          <form className="terminal-input-row" onSubmit={onSubmit}>
            <label className="prompt" htmlFor="command-input">zed@forty2.me:~$</label>
            <input ref={inputRef} id="command-input" value={input} onChange={(event) => setInput(event.target.value)} onKeyDown={onKeyDown} autoComplete="off" spellCheck={false} aria-label="Enter a command" />
            <button type="submit" className="run-command" aria-label="Run command">↵</button>
          </form>
        </section>

        <section className="content-pane" aria-label="Page content"><PageContent path={path} readme={readme} readmeState={readmeState} /></section>
      </div>

      <footer className="statusbar">
        <button className="mobile-terminal-toggle" type="button" onClick={() => setMobileOpen((open) => !open)} aria-expanded={mobileOpen}>$ {mobileOpen ? 'close terminal' : 'open terminal'}</button>
        <span className="tip">Tip: try <button type="button" onClick={() => execute('whoami')}>whoami</button>, <button type="button" onClick={() => execute('resume')}>resume</button>, or <button type="button" onClick={() => execute('github')}>github</button>.</span>
        <span className="footer-note">Built with care <span className="heart">♥</span> on Cloudflare</span>
      </footer>
    </main>
  )
}
