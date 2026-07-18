import type { Metadata } from 'next'
import { STATES } from '@/lib/medicareData'
import StateMedicareAdvantagePage from '@/components/StateMedicareAdvantagePage'

const state = STATES['WY']

export const metadata: Metadata = {
  title: 'Wyoming Medicare Advantage Plans 2026 — Compare Options',
  description: 'Compare Wyoming Medicare Advantage plans for 2026. Free calculator showing estimated premiums, coverage differences, and how Medicare Advantage compares to Original Medicare in Wyoming.',
  alternates: { canonical: 'https://medicarecalculators.com/wyoming-medicare-advantage' },
  robots: { index: true, follow: true },
}

export default function Page() {
  return <StateMedicareAdvantagePage state={state} />
}
