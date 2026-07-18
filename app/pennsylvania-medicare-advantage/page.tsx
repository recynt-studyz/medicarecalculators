import type { Metadata } from 'next'
import { STATES } from '@/lib/medicareData'
import StateMedicareAdvantagePage from '@/components/StateMedicareAdvantagePage'

const state = STATES['PA']

export const metadata: Metadata = {
  title: 'Pennsylvania Medicare Advantage Plans 2026 — Compare Options',
  description: 'Compare Pennsylvania Medicare Advantage plans for 2026. Free calculator showing estimated premiums, coverage differences, and how Medicare Advantage compares to Original Medicare in Pennsylvania.',
  alternates: { canonical: 'https://medicarecalculators.com/pennsylvania-medicare-advantage' },
  robots: { index: true, follow: true },
}

export default function Page() {
  return <StateMedicareAdvantagePage state={state} />
}
