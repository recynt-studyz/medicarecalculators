import type { Metadata } from 'next'
import { STATES } from '@/lib/medicareData'
import StateMedicareAdvantagePage from '@/components/StateMedicareAdvantagePage'

const state = STATES['IL']

export const metadata: Metadata = {
  title: 'Illinois Medicare Advantage Plans 2026 — Compare Options',
  description: 'Compare Illinois Medicare Advantage plans for 2026. Free calculator showing estimated premiums, coverage differences, and how Medicare Advantage compares to Original Medicare in Illinois.',
  alternates: { canonical: 'https://medicarecalculators.com/illinois-medicare-advantage' },
  robots: { index: true, follow: true },
}

export default function Page() {
  return <StateMedicareAdvantagePage state={state} />
}
