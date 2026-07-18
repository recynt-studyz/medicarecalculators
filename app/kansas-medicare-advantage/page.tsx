import type { Metadata } from 'next'
import { STATES } from '@/lib/medicareData'
import StateMedicareAdvantagePage from '@/components/StateMedicareAdvantagePage'

const state = STATES['KS']

export const metadata: Metadata = {
  title: 'Kansas Medicare Advantage Plans 2026 — Compare Options',
  description: 'Compare Kansas Medicare Advantage plans for 2026. Free calculator showing estimated premiums, coverage differences, and how Medicare Advantage compares to Original Medicare in Kansas.',
  alternates: { canonical: 'https://medicarecalculators.com/kansas-medicare-advantage' },
  robots: { index: true, follow: true },
}

export default function Page() {
  return <StateMedicareAdvantagePage state={state} />
}
