import { useState, useEffect } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import UrlInput from './components/UrlInput'
import MadLibBuilder from './components/MadLibBuilder'
import GeneratedLink from './components/GeneratedLink'
import LinkLibrary from './components/LinkLibrary'
import NewsletterBlurb from './components/NewsletterBlurb'
import Footer from './components/Footer'
import { buildUtmUrl, isValidUrl } from './lib/utmBuilder'
import { supabase } from './lib/supabase'
import { getSessionId } from './lib/session'

function App() {
  const [destination, setDestination] = useState('')
  const [source, setSource] = useState('')
  const [medium, setMedium] = useState('')
  const [campaign, setCampaign] = useState('')
  const [content, setContent] = useState('')
  const [term, setTerm] = useState('')
  const [links, setLinks] = useState([])

  const generatedUrl = isValidUrl(destination) && destination
    ? buildUtmUrl({ destination, source, medium, campaign, content, term })
    : ''

  // Load links from Supabase on mount
  useEffect(() => {
    async function loadLinks() {
      if (!supabase) return
      const sessionId = getSessionId()
      const { data } = await supabase
        .from('utm_links')
        .select('*')
        .eq('session_id', sessionId)
        .order('created_at', { ascending: false })
        .limit(20)
      if (data) setLinks(data)
    }
    loadLinks()
  }, [])

  function handleParamChange(param, value) {
    switch (param) {
      case 'source': setSource(value); break
      case 'medium': setMedium(value); break
      case 'campaign': setCampaign(value); break
      case 'content': setContent(value); break
      case 'term': setTerm(value); break
    }
  }

  async function handleCopy() {
    if (!generatedUrl || !source || !medium) return

    // Check for duplicates in current session
    if (links.some((l) => l.full_url === generatedUrl)) return

    const linkData = {
      session_id: getSessionId(),
      destination_url: destination,
      utm_source: source,
      utm_medium: medium,
      utm_campaign: campaign || null,
      utm_content: content || null,
      utm_term: term || null,
      full_url: generatedUrl,
      created_at: new Date().toISOString(),
    }

    if (supabase) {
      const { data } = await supabase
        .from('utm_links')
        .insert(linkData)
        .select()
        .single()
      if (data) {
        setLinks((prev) => [data, ...prev].slice(0, 20))
      }
    } else {
      // Fallback to local-only storage
      const localLink = { ...linkData, id: crypto.randomUUID() }
      setLinks((prev) => [localLink, ...prev].slice(0, 20))
    }
  }

  const showBuilder = destination.length > 0

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--bg-page)' }}>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <Header />

      <main id="main-content">
        <Hero />

        {/* Builder section */}
        <section aria-label="UTM link builder" className="px-4 sm:px-6 -mt-6 relative z-10 pb-8">
          <div
            className="max-w-3xl mx-auto rounded-2xl p-5 sm:p-6 md:p-8"
            style={{
              backgroundColor: 'var(--bg-surface)',
              boxShadow: 'var(--shadow-card)',
              border: '1px solid var(--border-subtle)',
            }}
          >
            <UrlInput value={destination} onChange={setDestination} />

            {showBuilder && (
              <MadLibBuilder
                source={source}
                medium={medium}
                campaign={campaign}
                content={content}
                term={term}
                onChange={handleParamChange}
              />
            )}

            <GeneratedLink url={generatedUrl} onCopy={handleCopy} />
          </div>
        </section>

        <LinkLibrary links={links} />

        <NewsletterBlurb />
      </main>

      <Footer />
    </div>
  )
}

export default App
