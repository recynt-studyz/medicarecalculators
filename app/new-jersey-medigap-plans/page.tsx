import type { Metadata } from 'next'
import { STATES } from '@/lib/medicareData'
import StateMedigapPage from '@/components/StateMedigapPage'

const state = STATES['NJ']

export const metadata: Metadata = {
  title: 'New Jersey Medigap Plans 2026 — Medicare Supplement Comparison',
  description: 'Compare 2026 Medigap Medicare supplement plans in New Jersey. Free Plan G, Plan N, and Plan A comparison with estimated premiums for New Jersey residents.',
  alternates: { canonical: 'https://medicarecalculators.com/new-jersey-medigap-plans' },
  robots: { index: true, follow: true },
}

export default function Page() {
  return <StateMedigapPage state={state} />
}
