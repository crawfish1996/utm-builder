export function formatParam(value) {
  if (!value) return ''
  return value
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9\-_]/g, '')
}

export function buildUtmUrl({ destination, source, medium, campaign, content, term }) {
  if (!destination) return ''

  try {
    const url = new URL(destination)
    const params = url.searchParams

    if (source) params.set('utm_source', formatParam(source))
    if (medium) params.set('utm_medium', formatParam(medium))
    if (campaign) params.set('utm_campaign', formatParam(campaign))
    if (content) params.set('utm_content', formatParam(content))
    if (term) params.set('utm_term', formatParam(term))

    return url.toString()
  } catch {
    return ''
  }
}

export function isValidUrl(url) {
  if (!url) return true
  return /^https?:\/\/.+/.test(url)
}
