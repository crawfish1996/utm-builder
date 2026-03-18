import { useState, useRef } from 'react'
import { isValidUrl } from '../lib/utmBuilder'

export default function UrlInput({ value, onChange }) {
  const [touched, setTouched] = useState(false)
  const [focused, setFocused] = useState(false)
  const inputRef = useRef(null)
  const showError = touched && value && !isValidUrl(value)

  function handleBlur() {
    setTouched(true)
    setFocused(false)

    // Auto-prepend https:// if user typed a bare domain
    if (value && !value.startsWith('http://') && !value.startsWith('https://')) {
      onChange('https://' + value)
    }
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
      <input
        ref={inputRef}
        id="destination-url"
        type="url"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={handleBlur}
        placeholder="https://yoursite.com/landing-page"
        autoComplete="url"
        spellCheck={false}
        aria-describedby={showError ? 'url-error' : undefined}
        aria-invalid={showError || undefined}
        className="w-full px-4 py-3.5 rounded-lg text-base"
        style={{
          fontFamily: 'var(--font-body)',
          border: `2px solid ${borderColor()}`,
          backgroundColor: 'var(--bg-input)',
          color: 'var(--text-primary)',
          outline: 'none',
          transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
          boxShadow: focused ? '0 0 0 3px rgba(45, 125, 154, 0.15)' : 'none',
        }}
      />
      {showError && (
        <p
          id="url-error"
          className="mt-2 text-sm animate-fade-in"
          style={{ color: 'var(--starfish)' }}
          role="alert"
        >
          Please enter a valid URL starting with https://
        </p>
      )}
    </div>
  )
}
