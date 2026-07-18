import type { Metadata } from 'next'
import { STATES } from '@/lib/medicareData'
import StateMedigapPage from '@/components/StateMedigapPage'

const state = STATES['SD']

export const metadata: Metadata = {
  title: 'South Dakota Medigap Plans 2026 — Medicare Supplement Comparison',
  description: 'Compare 2026 Medigap Medicare supplement plans in South Dakota. Free Plan G, Plan N, and Plan A comparison with estimated premiums for South Dakota residents.',
  alternates: { canonical: 'https://medicarecalculators.com/south-dakota-medigap-plans' },
  robots: { index: true, follow: true },
}

export default function Page() {
  return <StateMedigapPage state={state} />
}
