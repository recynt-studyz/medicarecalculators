import type { Metadata } from 'next'
import { STATES } from '@/lib/medicareData'
import StateMedicareAdvantagePage from '@/components/StateMedicareAdvantagePage'

const state = STATES['NE']

export const metadata: Metadata = {
  title: 'Nebraska Medicare Advantage Plans 2026 — Compare Options',
  description: 'Compare Nebraska Medicare Advantage plans for 2026. Free calculator showing estimated premiums, coverage differences, and how Medicare Advantage compares to Original Medicare in Nebraska.',
  alternates: { canonical: 'https://medicarecalculators.com/nebraska-medicare-advantage' },
  robots: { index: true, follow: true },
}

export default function Page() {
  return <StateMedicareAdvantagePage state={state} />
}
