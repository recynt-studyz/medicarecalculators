import type { Metadata } from 'next'
import { STATES } from '@/lib/medicareData'
import StateMedicareAdvantagePage from '@/components/StateMedicareAdvantagePage'

const state = STATES['SD']

export const metadata: Metadata = {
  title: 'South Dakota Medicare Advantage Plans 2026 — Compare Options',
  description: 'Compare South Dakota Medicare Advantage plans for 2026. Free calculator showing estimated premiums, coverage differences, and how Medicare Advantage compares to Original Medicare in South Dakota.',
  alternates: { canonical: 'https://medicarecalculators.com/south-dakota-medicare-advantage' },
  robots: { index: true, follow: true },
}

export default function Page() {
  return <StateMedicareAdvantagePage state={state} />
}
