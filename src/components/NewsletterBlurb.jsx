export default function NewsletterBlurb() {
  return (
    <section
      aria-label="About Tidepool"
      className="px-4 sm:px-6 py-16 md:py-20"
      style={{ backgroundColor: 'var(--bg-surface)', borderTop: '1px solid var(--border-subtle)' }}
    >
      <div className="max-w-2xl mx-auto">
        <p
          className="text-[11px] uppercase tracking-[3px] mb-5"
          style={{ fontFamily: 'var(--font-mono)', color: 'var(--tidepool-blue-text)' }}
        >
          Why Tidepool
        </p>
        <h2
          className="text-3xl md:text-4xl leading-tight mb-8"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}
        >
          Small tools. Surprising depth.
        </h2>

        <div
          className="space-y-5 text-base leading-relaxed"
          style={{ fontFamily: 'var(--font-body)', color: 'var(--text-secondary)' }}
        >
          <p>
            The marketers who understand the AI shift early will have a real edge. I've spent the last few months obsessed with finding mine. The result is Tidepool.
          </p>
          <p>
            The name comes from my time in Maine. Tidepools are tiny ecosystems carved into granite, each one complete on its own. Starfish, sea urchins, kelp. An entire world in a space you could step over. Small, self-contained, surprisingly powerful.
          </p>
          <p>
            That's the design principle here. Every tool does one thing. It does it well. No feature bloat. No enterprise upsell. No demo request form. Just open it, use it, get what you came for.
          </p>
          <p style={{ color: 'var(--text-primary)' }}>
            Subscribe to the newsletter to get access to new tools, follow the journey, and get my take on the latest AI news from a marketer's perspective.
          </p>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <a
            href="https://usetidepool.com"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-cta inline-flex items-center gap-2 text-[15px] font-semibold px-6 py-3 rounded-lg"
            style={{
              fontFamily: 'var(--font-body)',
              backgroundColor: 'var(--tidepool-blue)',
              color: 'white',
              textDecoration: 'none',
            }}
          >
            Subscribe to the newsletter
            <span className="sr-only">(opens in new tab)</span>
          </a>
        </div>

        <p
          className="mt-8 text-sm"
          style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}
        >
          — Dustin
        </p>
      </div>
    </section>
  )
}
