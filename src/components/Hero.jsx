export default function Hero() {
  return (
    <section
      aria-label="Introduction"
      className="relative py-16 md:py-20 px-6"
      style={{ backgroundColor: 'var(--bg-page)' }}
    >
      {/* Topographic texture — decorative */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        aria-hidden="true"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='600' viewBox='0 0 600 600'%3E%3Cg fill='none' stroke='%23B8C4CB' stroke-width='1'%3E%3Cellipse cx='300' cy='300' rx='280' ry='180'/%3E%3Cellipse cx='300' cy='300' rx='240' ry='150'/%3E%3Cellipse cx='300' cy='300' rx='200' ry='120'/%3E%3Cellipse cx='300' cy='300' rx='160' ry='95'/%3E%3Cellipse cx='300' cy='300' rx='120' ry='70'/%3E%3Cellipse cx='300' cy='300' rx='80' ry='48'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '400px 400px',
        }}
      />
      <div className="relative max-w-5xl mx-auto text-center">
        <h1
          className="text-4xl md:text-[48px] leading-tight mb-5"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}
        >
          Build clean UTM links, <span style={{ color: 'var(--sea-glass)' }}>every time.</span>
        </h1>
        <p
          className="text-lg font-light max-w-lg mx-auto leading-relaxed"
          style={{ fontFamily: 'var(--font-body)', color: 'var(--text-secondary)' }}
        >
          No more typos. No more broken attribution. Paste a URL and fill in the blanks.
        </p>
      </div>
    </section>
  )
}
