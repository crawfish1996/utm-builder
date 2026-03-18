import { useState } from 'react'
import { formatParam } from '../lib/utmBuilder'

const SOURCE_OPTIONS = [
  'LinkedIn', 'Google', 'Newsletter', 'Podcast', 'Partner',
  'Facebook', 'Twitter / X', 'Direct', 'Event', 'Other',
]

const MEDIUM_OPTIONS = [
  'Paid', 'Organic', 'Email', 'Referral', 'Social',
  'Event', 'Retargeting', 'Other',
]

function UtmSelect({ label, value, onChange, options }) {
  const hasValue = value !== ''
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-label={`UTM ${label}`}
      className={`utm-pill inline-block px-3 py-1.5 pr-8 ${hasValue ? 'utm-pill--filled' : 'utm-pill--empty'}`}
    >
      <option value="">{label}</option>
      {options.map((opt) => (
        <option key={opt} value={formatParam(opt)}>{opt}</option>
      ))}
    </select>
  )
}

function UtmTextInput({ value, onChange, placeholder, label }) {
  const hasValue = value !== ''
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(formatParam(e.target.value))}
      placeholder={placeholder}
      aria-label={label}
      spellCheck={false}
      className={`utm-pill inline-block px-3 py-1.5 w-36 ${hasValue ? 'utm-pill--filled' : 'utm-pill--empty'}`}
    />
  )
}

export default function MadLibBuilder({ source, medium, campaign, content, term, onChange }) {
  const [showOptional, setShowOptional] = useState(false)

  return (
    <fieldset className="animate-slide-down border-0 p-0 m-0">
      <legend className="sr-only">UTM parameters</legend>

      <div
        className="text-lg leading-loose flex flex-wrap items-center gap-x-2 gap-y-3"
        style={{ fontFamily: 'var(--font-body)', color: 'var(--text-secondary)' }}
      >
        <span>This link is from</span>
        <UtmSelect
          label="Source"
          value={source}
          onChange={(v) => onChange('source', v)}
          options={SOURCE_OPTIONS}
        />
        <span>via</span>
        <UtmSelect
          label="Medium"
          value={medium}
          onChange={(v) => onChange('medium', v)}
          options={MEDIUM_OPTIONS}
        />
        <span>for the</span>
        <UtmTextInput
          value={campaign}
          onChange={(v) => onChange('campaign', v)}
          placeholder="q1-launch"
          label="Campaign name"
        />
        <span>campaign.</span>
      </div>

      {!showOptional ? (
        <button
          onClick={() => setShowOptional(true)}
          className="mt-5 text-sm cursor-pointer inline-flex items-center gap-1.5 group min-h-[44px]"
          style={{
            color: 'var(--tidepool-blue-text)',
            fontFamily: 'var(--font-body)',
            background: 'none',
            border: 'none',
            padding: '4px 0',
          }}
          aria-expanded="false"
          aria-controls="optional-params"
        >
          <span
            className="inline-flex items-center justify-center w-5 h-5 rounded-full text-xs"
            aria-hidden="true"
            style={{
              border: '1.5px solid var(--tidepool-blue-text)',
              color: 'var(--tidepool-blue-text)',
            }}
          >
            +
          </span>
          <span className="group-hover:underline">
            Add utm_content or utm_term
          </span>
          <span style={{ color: 'var(--text-muted)' }}>(optional)</span>
        </button>
      ) : (
        <div id="optional-params" className="mt-5 flex flex-wrap items-center gap-3 animate-slide-down">
          <label
            htmlFor="utm-content"
            className="font-medium"
            style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px' }}
          >
            Content:
          </label>
          <input
            id="utm-content"
            type="text"
            value={content}
            onChange={(e) => onChange('content', formatParam(e.target.value))}
            placeholder="banner-v2"
            aria-label="UTM Content"
            spellCheck={false}
            className={`utm-pill inline-block px-3 py-1.5 w-36 ${content ? 'utm-pill--filled' : 'utm-pill--empty'}`}
          />
          <label
            htmlFor="utm-term"
            className="font-medium ml-2"
            style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px' }}
          >
            Term:
          </label>
          <input
            id="utm-term"
            type="text"
            value={term}
            onChange={(e) => onChange('term', formatParam(e.target.value))}
            placeholder="utm-tools"
            aria-label="UTM Term"
            spellCheck={false}
            className={`utm-pill inline-block px-3 py-1.5 w-36 ${term ? 'utm-pill--filled' : 'utm-pill--empty'}`}
          />
        </div>
      )}
    </fieldset>
  )
}
