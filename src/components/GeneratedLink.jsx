import { useState } from 'react'

function ColorCodedUrl({ url }) {
  if (!url) return null

  try {
    const parsed = new URL(url)
    const base = parsed.origin + parsed.pathname
    const params = parsed.searchParams

    const paramColors = {
      utm_source: 'var(--sea-glass)',
      utm_medium: 'var(--periwinkle)',
      utm_campaign: 'var(--urchin)',
      utm_content: '#E87461',
      utm_term: '#c084fc',
    }

    const separator = base.includes('?') ? '&' : '?'
    const parts = []

    params.forEach((value, key) => {
      parts.push({ key, value, color: paramColors[key] || 'var(--morning-fog)' })
    })

    return (
      <span>
        <span style={{ color: 'var(--morning-fog)' }}>{base}</span>
        {parts.map((p, i) => (
          <span key={p.key}>
            <span style={{ color: 'var(--text-muted)' }}>{i === 0 ? separator : '&'}</span>
            <span style={{ color: p.color }}>{p.key}=</span>
            <span style={{ color: p.color, fontWeight: 600 }}>{p.value}</span>
          </span>
        ))}
      </span>
    )
  } catch {
    return <span style={{ color: 'var(--morning-fog)' }}>{url}</span>
  }
}

export default function GeneratedLink({ url, onCopy }) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    if (!url) return
    try {
      await navigator.clipboard.writeText(url)
    } catch {
      const ta = document.createElement('textarea')
      ta.value = url
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
    }
    setCopied(true)
    onCopy()
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div
      className="mt-8 rounded-xl p-5"
      role="region"
      aria-label="Generated UTM link"
      style={{
        backgroundColor: 'var(--bg-input)',
        border: '1px solid var(--border-default)',
        boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.15)',
      }}
    >
      <div className="flex items-center justify-between mb-3">
        <span
          className="text-[11px] uppercase tracking-[2px] font-medium"
          style={{ fontFamily: 'var(--font-mono)', color: 'var(--sea-glass-muted)' }}
          id="generated-link-label"
        >
          Your Link
        </span>
        <button
          onClick={handleCopy}
          disabled={!url}
          className="copy-btn rounded-lg px-4 py-2.5 text-[13px] font-semibold cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
          style={{
            fontFamily: 'var(--font-body)',
            backgroundColor: copied ? 'var(--sea-glass)' : 'var(--tidepool-blue)',
            color: 'white',
            border: 'none',
          }}
          aria-label={copied ? 'Link copied to clipboard' : 'Copy link to clipboard'}
        >
          {copied ? 'Copied \u2713' : 'Copy'}
        </button>
      </div>

      {/* Announce URL changes and copy status to screen readers */}
      <div aria-live="polite" className="sr-only">
        {copied ? 'Link copied to clipboard' : url ? `Generated URL: ${url}` : ''}
      </div>

      <output
        className="block text-sm break-all leading-relaxed"
        aria-labelledby="generated-link-label"
        style={{ fontFamily: 'var(--font-mono)', fontSize: '14px' }}
      >
        {url ? (
          <ColorCodedUrl url={url} />
        ) : (
          <span style={{ color: 'var(--text-muted)' }}>
            Your link will appear here
          </span>
        )}
      </output>

      {url && (
        <div className="mt-3 pt-3 flex flex-wrap gap-x-4 gap-y-1" style={{ borderTop: '1px solid var(--border-subtle)' }} aria-hidden="true">
          {[
            ['source', 'var(--sea-glass)'],
            ['medium', 'var(--periwinkle)'],
            ['campaign', 'var(--urchin)'],
          ].map(([label, color]) => (
            <span key={label} className="flex items-center gap-1.5 text-[10px]" style={{ fontFamily: 'var(--font-mono)', color }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }} />
              {label}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
