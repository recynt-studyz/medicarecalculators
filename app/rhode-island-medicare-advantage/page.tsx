import type { Metadata } from 'next'
import { STATES } from '@/lib/medicareData'
import StateMedicareAdvantagePage from '@/components/StateMedicareAdvantagePage'

const state = STATES['RI']

export const metadata: Metadata = {
  title: 'Rhode Island Medicare Advantage Plans 2026 — Compare Options',
  description: 'Compare Rhode Island Medicare Advantage plans for 2026. Free calculator showing estimated premiums, coverage differences, and how Medicare Advantage compares to Original Medicare in Rhode Island.',
  alternates: { canonical: 'https://medicarecalculators.com/rhode-island-medicare-advantage' },
  robots: { index: true, follow: true },
}

export default function Page() {
  return <StateMedicareAdvantagePage state={state} />
}
