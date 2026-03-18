export default function Footer() {
  return (
    <footer role="contentinfo">
      <div
        className="py-10 px-6 text-center"
        style={{ backgroundColor: 'var(--deep-atlantic)' }}
      >
        <span
          className="text-2xl"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--foam)' }}
        >
          tidepool
        </span>
        <p
          className="mt-3 text-[11px] tracking-wide"
          style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}
        >
          Small tools. Surprising depth. — Bar Harbor, Maine
        </p>
      </div>
      {/* Color strip — decorative */}
      <div className="flex h-1.5" aria-hidden="true">
        <div className="flex-1" style={{ backgroundColor: 'var(--deep-atlantic)' }} />
        <div className="flex-1" style={{ backgroundColor: 'var(--granite)' }} />
        <div className="flex-1" style={{ backgroundColor: 'var(--tidepool-blue)' }} />
        <div className="flex-1" style={{ backgroundColor: 'var(--sea-glass)' }} />
        <div className="flex-1" style={{ backgroundColor: 'var(--urchin)' }} />
        <div className="flex-1" style={{ backgroundColor: 'var(--starfish)' }} />
      </div>
    </footer>
  )
}
