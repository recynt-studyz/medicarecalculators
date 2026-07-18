import type { Metadata } from 'next'
import { STATES } from '@/lib/medicareData'
import StateMedicareAdvantagePage from '@/components/StateMedicareAdvantagePage'

const state = STATES['NH']

export const metadata: Metadata = {
  title: 'New Hampshire Medicare Advantage Plans 2026 — Compare Options',
  description: 'Compare New Hampshire Medicare Advantage plans for 2026. Free calculator showing estimated premiums, coverage differences, and how Medicare Advantage compares to Original Medicare in New Hampshire.',
  alternates: { canonical: 'https://medicarecalculators.com/new-hampshire-medicare-advantage' },
  robots: { index: true, follow: true },
}

export default function Page() {
  return <StateMedicareAdvantagePage state={state} />
}
