import { useState } from 'react'

function CopyButton({ url }) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
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
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={handleCopy}
      className="copy-btn text-xs px-3 py-2 rounded-md cursor-pointer"
      style={{
        fontFamily: 'var(--font-body)',
        fontWeight: 500,
        color: copied ? 'white' : 'var(--sea-glass)',
        border: `1px solid ${copied ? 'var(--sea-glass)' : 'rgba(91,184,166,0.3)'}`,
        backgroundColor: copied ? 'var(--sea-glass)' : 'transparent',
      }}
      aria-label={copied ? 'Link copied to clipboard' : 'Copy link to clipboard'}
    >
      {copied ? 'Copied \u2713' : 'Copy'}
    </button>
  )
}

function truncate(str, len = 30) {
  if (!str) return '\u2014'
  return str.length > len ? str.slice(0, len) + '\u2026' : str
}

function formatDate(dateStr) {
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })
}

export default function LinkLibrary({ links }) {
  const headerStyle = {
    fontFamily: 'var(--font-mono)',
    fontSize: '10px',
    letterSpacing: '2px',
    textTransform: 'uppercase',
    color: 'var(--text-muted)',
    padding: '14px 16px',
    textAlign: 'left',
    fontWeight: 500,
  }

  const cellStyle = (index) => ({
    fontFamily: 'var(--font-body)',
    fontSize: '14px',
    color: 'var(--text-secondary)',
    padding: '14px 16px',
    backgroundColor: index % 2 === 0 ? 'var(--bg-raised)' : 'var(--bg-table-alt)',
  })

  return (
    <section aria-label="Link library" className="py-12 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-baseline justify-between mb-6">
          <h2
            className="text-2xl"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}
          >
            Link Library
          </h2>
          {links.length > 0 && (
            <span
              className="text-xs"
              style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}
              aria-live="polite"
            >
              {links.length} {links.length === 1 ? 'link' : 'links'}
            </span>
          )}
        </div>

        {links.length === 0 ? (
          <div
            className="rounded-xl py-16 text-center"
            style={{
              backgroundColor: 'var(--bg-raised)',
              boxShadow: 'var(--shadow-table)',
            }}
          >
            <div
              className="w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center"
              aria-hidden="true"
              style={{ backgroundColor: 'var(--bg-table-alt)', border: '1px solid var(--border-subtle)' }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
              </svg>
            </div>
            <p
              className="text-lg italic"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--text-secondary)' }}
            >
              Your links will appear here after you build your first one.
            </p>
            <p className="text-sm mt-2" style={{ color: 'var(--text-muted)' }}>
              Fill in the builder above, then click Copy
            </p>
          </div>
        ) : (
          <div
            className="rounded-xl overflow-hidden"
            style={{
              backgroundColor: 'var(--bg-raised)',
              boxShadow: 'var(--shadow-table)',
              border: '1px solid var(--border-subtle)',
            }}
          >
            {/* Desktop table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full" aria-label="Previously generated UTM links">
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--border-table)' }}>
                    <th scope="col" style={headerStyle}>Destination</th>
                    <th scope="col" style={headerStyle}>Source</th>
                    <th scope="col" style={headerStyle}>Medium</th>
                    <th scope="col" style={headerStyle}>Campaign</th>
                    <th scope="col" style={headerStyle}>Created</th>
                    <th scope="col" style={{ ...headerStyle, textAlign: 'right' }}>
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {links.map((link, i) => (
                    <tr key={link.id} className="link-row link-entry" style={{ animationDelay: `${Math.min(i * 50, 200)}ms` }}>
                      <td style={cellStyle(i)}>
                        <span className="font-medium">{truncate(link.destination_url, 35)}</span>
                      </td>
                      <td style={cellStyle(i)}>
                        {link.utm_source ? (
                          <span className="inline-block px-2 py-0.5 rounded text-xs" style={{ backgroundColor: 'rgba(91,184,166,0.1)', color: 'var(--sea-glass)', fontFamily: 'var(--font-mono)' }}>
                            {link.utm_source}
                          </span>
                        ) : '\u2014'}
                      </td>
                      <td style={cellStyle(i)}>
                        {link.utm_medium ? (
                          <span className="inline-block px-2 py-0.5 rounded text-xs" style={{ backgroundColor: 'rgba(123,175,196,0.1)', color: 'var(--periwinkle)', fontFamily: 'var(--font-mono)' }}>
                            {link.utm_medium}
                          </span>
                        ) : '\u2014'}
                      </td>
                      <td style={cellStyle(i)}>
                        {link.utm_campaign ? (
                          <span className="inline-block px-2 py-0.5 rounded text-xs" style={{ backgroundColor: 'rgba(212,132,90,0.1)', color: 'var(--urchin)', fontFamily: 'var(--font-mono)' }}>
                            {link.utm_campaign}
                          </span>
                        ) : '\u2014'}
                      </td>
                      <td style={{ ...cellStyle(i), whiteSpace: 'nowrap' }}>{formatDate(link.created_at)}</td>
                      <td style={{ ...cellStyle(i), textAlign: 'right' }}>
                        <CopyButton url={link.full_url} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="md:hidden divide-y" style={{ borderColor: 'var(--border-table)' }} role="list" aria-label="Previously generated UTM links">
              {links.map((link, i) => (
                <div
                  key={link.id}
                  className="p-4 link-entry"
                  role="listitem"
                  style={{
                    backgroundColor: i % 2 === 0 ? 'var(--bg-raised)' : 'var(--bg-table-alt)',
                    animationDelay: `${Math.min(i * 50, 200)}ms`,
                  }}
                >
                  <p className="text-xs mb-2 break-all font-medium" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>
                    {truncate(link.destination_url, 50)}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {link.utm_source && (
                      <span className="text-xs px-2 py-0.5 rounded" style={{ backgroundColor: 'rgba(91,184,166,0.1)', color: 'var(--sea-glass)', fontFamily: 'var(--font-mono)' }}>
                        {link.utm_source}
                      </span>
                    )}
                    {link.utm_medium && (
                      <span className="text-xs px-2 py-0.5 rounded" style={{ backgroundColor: 'rgba(123,175,196,0.1)', color: 'var(--periwinkle)', fontFamily: 'var(--font-mono)' }}>
                        {link.utm_medium}
                      </span>
                    )}
                    {link.utm_campaign && (
                      <span className="text-xs px-2 py-0.5 rounded" style={{ backgroundColor: 'rgba(212,132,90,0.1)', color: 'var(--urchin)', fontFamily: 'var(--font-mono)' }}>
                        {link.utm_campaign}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                      {formatDate(link.created_at)}
                    </span>
                    <CopyButton url={link.full_url} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
