import type { Metadata } from 'next'
import { STATES } from '@/lib/medicareData'
import StateMedicareAdvantagePage from '@/components/StateMedicareAdvantagePage'

const state = STATES['MD']

export const metadata: Metadata = {
  title: 'Maryland Medicare Advantage Plans 2026 — Compare Options',
  description: 'Compare Maryland Medicare Advantage plans for 2026. Free calculator showing estimated premiums, coverage differences, and how Medicare Advantage compares to Original Medicare in Maryland.',
  alternates: { canonical: 'https://medicarecalculators.com/maryland-medicare-advantage' },
  robots: { index: true, follow: true },
}

export default function Page() {
  return <StateMedicareAdvantagePage state={state} />
}
