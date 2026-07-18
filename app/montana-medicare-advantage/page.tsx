import type { Metadata } from 'next'
import { STATES } from '@/lib/medicareData'
import StateMedicareAdvantagePage from '@/components/StateMedicareAdvantagePage'

const state = STATES['MT']

export const metadata: Metadata = {
  title: 'Montana Medicare Advantage Plans 2026 — Compare Options',
  description: 'Compare Montana Medicare Advantage plans for 2026. Free calculator showing estimated premiums, coverage differences, and how Medicare Advantage compares to Original Medicare in Montana.',
  alternates: { canonical: 'https://medicarecalculators.com/montana-medicare-advantage' },
  robots: { index: true, follow: true },
}

export default function Page() {
  return <StateMedicareAdvantagePage state={state} />
}
