import type { Metadata } from 'next'
import { STATES } from '@/lib/medicareData'
import StateMedigapPage from '@/components/StateMedigapPage'

const state = STATES['RI']

export const metadata: Metadata = {
  title: 'Rhode Island Medigap Plans 2026 — Medicare Supplement Comparison',
  description: 'Compare 2026 Medigap Medicare supplement plans in Rhode Island. Free Plan G, Plan N, and Plan A comparison with estimated premiums for Rhode Island residents.',
  alternates: { canonical: 'https://medicarecalculators.com/rhode-island-medigap-plans' },
  robots: { index: true, follow: true },
}

export default function Page() {
  return <StateMedigapPage state={state} />
}
