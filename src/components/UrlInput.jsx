import { useState, useRef } from 'react'
import { isValidUrl } from '../lib/utmBuilder'

export default function UrlInput({ value, onChange }) {
  const [touched, setTouched] = useState(false)
  const [focused, setFocused] = useState(false)
  const inputRef = useRef(null)

  // Strip the protocol for display — we always prepend https://
  const prefix = 'https://'
  const displayValue = value.startsWith(prefix)
    ? value.slice(prefix.length)
    : value.startsWith('http://')
      ? value.slice('http://'.length)
      : value

  const fullUrl = displayValue ? prefix + displayValue : ''
  const showError = touched && displayValue && !isValidUrl(fullUrl)

  function handleChange(e) {
    const raw = e.target.value
    // If someone pastes a full URL, strip the protocol
    if (raw.startsWith(prefix)) {
      onChange(raw)
    } else if (raw.startsWith('http://')) {
      onChange(prefix + raw.slice('http://'.length))
    } else {
      onChange(raw ? prefix + raw : '')
    }
  }

  function handleBlur() {
    setTouched(true)
    setFocused(false)
  }

  function borderColor() {
    if (showError) return 'var(--starfish)'
    if (focused) return 'var(--tidepool-blue)'
    return 'var(--border-default)'
  }

  return (
    <div className="mb-6">
      <label
        htmlFor="destination-url"
        className="block text-[11px] uppercase tracking-[2px] mb-2 font-medium"
        style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}
      >
        Destination URL
      </label>
      <div
        className="flex items-center rounded-lg"
        style={{
          border: `2px solid ${borderColor()}`,
          backgroundColor: 'var(--bg-input)',
          transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
          boxShadow: focused ? '0 0 0 3px rgba(45, 125, 154, 0.15)' : 'none',
        }}
      >
        <span
          className="pl-4 py-3.5 text-base select-none shrink-0"
          style={{ fontFamily: 'var(--font-body)', color: 'var(--text-muted)' }}
          aria-hidden="true"
        >
          https://
        </span>
        <input
          ref={inputRef}
          id="destination-url"
          type="text"
          value={displayValue}
          onChange={handleChange}
          onFocus={() => setFocused(true)}
          onBlur={handleBlur}
          placeholder="yoursite.com/landing-page"
          autoComplete="url"
          spellCheck={false}
          aria-describedby={showError ? 'url-error' : undefined}
          aria-invalid={showError || undefined}
          className="w-full pr-4 py-3.5 text-base bg-transparent"
          style={{
            fontFamily: 'var(--font-body)',
            color: 'var(--text-primary)',
            outline: 'none',
            border: 'none',
          }}
        />
      </div>
      {showError && (
        <p
          id="url-error"
          className="mt-2 text-sm animate-fade-in"
          style={{ color: 'var(--starfish)' }}
          role="alert"
        >
          Please enter a valid URL (e.g. yoursite.com/page)
        </p>
      )}
    </div>
  )
}
