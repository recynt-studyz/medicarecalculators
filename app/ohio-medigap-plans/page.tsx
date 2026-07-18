import type { Metadata } from 'next'
import { STATES } from '@/lib/medicareData'
import StateMedigapPage from '@/components/StateMedigapPage'

const state = STATES['OH']

export const metadata: Metadata = {
  title: 'Ohio Medigap Plans 2026 — Medicare Supplement Comparison',
  description: 'Compare 2026 Medigap Medicare supplement plans in Ohio. Free Plan G, Plan N, and Plan A comparison with estimated premiums for Ohio residents.',
  alternates: { canonical: 'https://medicarecalculators.com/ohio-medigap-plans' },
  robots: { index: true, follow: true },
}

export default function Page() {
  return <StateMedigapPage state={state} />
}
