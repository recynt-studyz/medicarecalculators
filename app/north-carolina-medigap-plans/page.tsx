import type { Metadata } from 'next'
import { STATES } from '@/lib/medicareData'
import StateMedigapPage from '@/components/StateMedigapPage'

const state = STATES['NC']

export const metadata: Metadata = {
  title: 'North Carolina Medigap Plans 2026 — Medicare Supplement Comparison',
  description: 'Compare 2026 Medigap Medicare supplement plans in North Carolina. Free Plan G, Plan N, and Plan A comparison with estimated premiums for North Carolina residents.',
  alternates: { canonical: 'https://medicarecalculators.com/north-carolina-medigap-plans' },
  robots: { index: true, follow: true },
}

export default function Page() {
  return <StateMedigapPage state={state} />
}
