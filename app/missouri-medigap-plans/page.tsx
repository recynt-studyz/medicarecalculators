import type { Metadata } from 'next'
import { STATES } from '@/lib/medicareData'
import StateMedigapPage from '@/components/StateMedigapPage'

const state = STATES['MO']

export const metadata: Metadata = {
  title: 'Missouri Medigap Plans 2026 — Medicare Supplement Comparison',
  description: 'Compare 2026 Medigap Medicare supplement plans in Missouri. Free Plan G, Plan N, and Plan A comparison with estimated premiums for Missouri residents.',
  alternates: { canonical: 'https://medicarecalculators.com/missouri-medigap-plans' },
  robots: { index: true, follow: true },
}

export default function Page() {
  return <StateMedigapPage state={state} />
}
