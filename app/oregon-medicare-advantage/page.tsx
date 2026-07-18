import type { Metadata } from 'next'
import { STATES } from '@/lib/medicareData'
import StateMedicareAdvantagePage from '@/components/StateMedicareAdvantagePage'

const state = STATES['OR']

export const metadata: Metadata = {
  title: 'Oregon Medicare Advantage Plans 2026 — Compare Options',
  description: 'Compare Oregon Medicare Advantage plans for 2026. Free calculator showing estimated premiums, coverage differences, and how Medicare Advantage compares to Original Medicare in Oregon.',
  alternates: { canonical: 'https://medicarecalculators.com/oregon-medicare-advantage' },
  robots: { index: true, follow: true },
}

export default function Page() {
  return <StateMedicareAdvantagePage state={state} />
}
