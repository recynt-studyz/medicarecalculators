import type { Metadata } from 'next'
import { STATES } from '@/lib/medicareData'
import StateMedigapPage from '@/components/StateMedigapPage'

const state = STATES['MN']

export const metadata: Metadata = {
  title: 'Minnesota Medigap Plans 2026 — Medicare Supplement Comparison',
  description: 'Compare 2026 Medigap Medicare supplement plans in Minnesota. Free Plan G, Plan N, and Plan A comparison with estimated premiums for Minnesota residents.',
  alternates: { canonical: 'https://medicarecalculators.com/minnesota-medigap-plans' },
  robots: { index: true, follow: true },
}

export default function Page() {
  return <StateMedigapPage state={state} />
}
