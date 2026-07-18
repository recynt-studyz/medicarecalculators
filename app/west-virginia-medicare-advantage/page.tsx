import type { Metadata } from 'next'
import { STATES } from '@/lib/medicareData'
import StateMedicareAdvantagePage from '@/components/StateMedicareAdvantagePage'

const state = STATES['WV']

export const metadata: Metadata = {
  title: 'West Virginia Medicare Advantage Plans 2026 — Compare Options',
  description: 'Compare West Virginia Medicare Advantage plans for 2026. Free calculator showing estimated premiums, coverage differences, and how Medicare Advantage compares to Original Medicare in West Virginia.',
  alternates: { canonical: 'https://medicarecalculators.com/west-virginia-medicare-advantage' },
  robots: { index: true, follow: true },
}

export default function Page() {
  return <StateMedicareAdvantagePage state={state} />
}
