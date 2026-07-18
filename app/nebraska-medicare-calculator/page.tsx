import type { Metadata } from 'next'
import { STATES } from '@/lib/medicareData'
import StateMedicareCard from '@/components/StateMedicareCard'

const state = STATES['NE']

export const metadata: Metadata = {
  title: 'Nebraska Medicare Calculator 2026 — Costs, Part B, and Plans',
  description: 'Calculate your 2026 Medicare costs in Nebraska. Free calculator for Part B premiums, IRMAA surcharges, Medigap, and Medicare Advantage plans available in Nebraska.',
  alternates: { canonical: 'https://medicarecalculators.com/nebraska-medicare-calculator' },
  robots: { index: true, follow: true },
}

export default function Page() {
  return <StateMedicareCard state={state} />
}
