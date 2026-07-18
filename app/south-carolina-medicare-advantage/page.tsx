import type { Metadata } from 'next'
import { STATES } from '@/lib/medicareData'
import StateMedicareAdvantagePage from '@/components/StateMedicareAdvantagePage'

const state = STATES['SC']

export const metadata: Metadata = {
  title: 'South Carolina Medicare Advantage Plans 2026 — Compare Options',
  description: 'Compare South Carolina Medicare Advantage plans for 2026. Free calculator showing estimated premiums, coverage differences, and how Medicare Advantage compares to Original Medicare in South Carolina.',
  alternates: { canonical: 'https://medicarecalculators.com/south-carolina-medicare-advantage' },
  robots: { index: true, follow: true },
}

export default function Page() {
  return <StateMedicareAdvantagePage state={state} />
}
