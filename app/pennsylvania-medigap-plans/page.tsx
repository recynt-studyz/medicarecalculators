import type { Metadata } from 'next'
import { STATES } from '@/lib/medicareData'
import StateMedigapPage from '@/components/StateMedigapPage'

const state = STATES['PA']

export const metadata: Metadata = {
  title: 'Pennsylvania Medigap Plans 2026 — Medicare Supplement Comparison',
  description: 'Compare 2026 Medigap Medicare supplement plans in Pennsylvania. Free Plan G, Plan N, and Plan A comparison with estimated premiums for Pennsylvania residents.',
  alternates: { canonical: 'https://medicarecalculators.com/pennsylvania-medigap-plans' },
  robots: { index: true, follow: true },
}

export default function Page() {
  return <StateMedigapPage state={state} />
}
