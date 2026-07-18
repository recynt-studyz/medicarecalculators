import type { Metadata } from 'next'
import { STATES } from '@/lib/medicareData'
import StateMedigapPage from '@/components/StateMedigapPage'

const state = STATES['WY']

export const metadata: Metadata = {
  title: 'Wyoming Medigap Plans 2026 — Medicare Supplement Comparison',
  description: 'Compare 2026 Medigap Medicare supplement plans in Wyoming. Free Plan G, Plan N, and Plan A comparison with estimated premiums for Wyoming residents.',
  alternates: { canonical: 'https://medicarecalculators.com/wyoming-medigap-plans' },
  robots: { index: true, follow: true },
}

export default function Page() {
  return <StateMedigapPage state={state} />
}
