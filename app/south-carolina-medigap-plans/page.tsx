import type { Metadata } from 'next'
import { STATES } from '@/lib/medicareData'
import StateMedigapPage from '@/components/StateMedigapPage'

const state = STATES['SC']

export const metadata: Metadata = {
  title: 'South Carolina Medigap Plans 2026 — Medicare Supplement Comparison',
  description: 'Compare 2026 Medigap Medicare supplement plans in South Carolina. Free Plan G, Plan N, and Plan A comparison with estimated premiums for South Carolina residents.',
  alternates: { canonical: 'https://medicarecalculators.com/south-carolina-medigap-plans' },
  robots: { index: true, follow: true },
}

export default function Page() {
  return <StateMedigapPage state={state} />
}
