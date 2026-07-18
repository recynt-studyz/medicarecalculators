import type { Metadata } from 'next'
import { STATES } from '@/lib/medicareData'
import StateMedigapPage from '@/components/StateMedigapPage'

const state = STATES['VT']

export const metadata: Metadata = {
  title: 'Vermont Medigap Plans 2026 — Medicare Supplement Comparison',
  description: 'Compare 2026 Medigap Medicare supplement plans in Vermont. Free Plan G, Plan N, and Plan A comparison with estimated premiums for Vermont residents.',
  alternates: { canonical: 'https://medicarecalculators.com/vermont-medigap-plans' },
  robots: { index: true, follow: true },
}

export default function Page() {
  return <StateMedigapPage state={state} />
}
