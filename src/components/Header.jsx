export default function Header() {
  return (
    <header
      className="px-6 py-4 md:px-10 sticky top-0 z-50"
      style={{
        backgroundColor: 'var(--bg-header)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--border-subtle)',
      }}
    >
      <nav aria-label="Main navigation" className="max-w-5xl mx-auto flex items-center justify-between">
        <div className="flex items-baseline gap-3">
          <span
            className="text-2xl"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}
            aria-label="Tidepool"
          >
            tidepool
          </span>
          <span
            className="text-[11px] uppercase tracking-[3px] hidden sm:inline"
            style={{ fontFamily: 'var(--font-mono)', color: 'var(--tidepool-blue-text)' }}
            aria-hidden="true"
          >
            UTM Builder
          </span>
        </div>
        <a
          href="https://usetidepool.com"
          target="_blank"
          rel="noopener noreferrer"
          className="nav-cta text-[13px] font-semibold px-4 py-2.5 rounded-lg"
          style={{
            fontFamily: 'var(--font-body)',
            backgroundColor: 'var(--tidepool-blue)',
            color: 'white',
            textDecoration: 'none',
          }}
        >
          Subscribe to the newsletter
          <span className="sr-only"> (opens in new tab)</span>
        </a>
      </nav>
    </header>
  )
}
