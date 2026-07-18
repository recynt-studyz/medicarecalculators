import type { Metadata } from 'next'
import { STATES } from '@/lib/medicareData'
import StateMedigapPage from '@/components/StateMedigapPage'

const state = STATES['NE']

export const metadata: Metadata = {
  title: 'Nebraska Medigap Plans 2026 — Medicare Supplement Comparison',
  description: 'Compare 2026 Medigap Medicare supplement plans in Nebraska. Free Plan G, Plan N, and Plan A comparison with estimated premiums for Nebraska residents.',
  alternates: { canonical: 'https://medicarecalculators.com/nebraska-medigap-plans' },
  robots: { index: true, follow: true },
}

export default function Page() {
  return <StateMedigapPage state={state} />
}
