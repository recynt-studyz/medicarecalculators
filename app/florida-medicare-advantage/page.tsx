import type { Metadata } from 'next'
import { STATES } from '@/lib/medicareData'
import StateMedicareAdvantagePage from '@/components/StateMedicareAdvantagePage'

const state = STATES['FL']

export const metadata: Metadata = {
  title: 'Florida Medicare Advantage Plans 2026 — Compare Options',
  description: 'Compare Florida Medicare Advantage plans for 2026. Free calculator showing estimated premiums, coverage differences, and how Medicare Advantage compares to Original Medicare in Florida.',
  alternates: { canonical: 'https://medicarecalculators.com/florida-medicare-advantage' },
  robots: { index: true, follow: true },
}

export default function Page() {
  return <StateMedicareAdvantagePage state={state} />
}
