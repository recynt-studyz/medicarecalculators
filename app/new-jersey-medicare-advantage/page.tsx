import type { Metadata } from 'next'
import { STATES } from '@/lib/medicareData'
import StateMedicareAdvantagePage from '@/components/StateMedicareAdvantagePage'

const state = STATES['NJ']

export const metadata: Metadata = {
  title: 'New Jersey Medicare Advantage Plans 2026 — Compare Options',
  description: 'Compare New Jersey Medicare Advantage plans for 2026. Free calculator showing estimated premiums, coverage differences, and how Medicare Advantage compares to Original Medicare in New Jersey.',
  alternates: { canonical: 'https://medicarecalculators.com/new-jersey-medicare-advantage' },
  robots: { index: true, follow: true },
}

export default function Page() {
  return <StateMedicareAdvantagePage state={state} />
}
