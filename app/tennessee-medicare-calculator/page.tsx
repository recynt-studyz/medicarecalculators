import type { Metadata } from 'next'
import { STATES } from '@/lib/medicareData'
import StateMedicareCard from '@/components/StateMedicareCard'

const state = STATES['TN']

export const metadata: Metadata = {
  title: 'Tennessee Medicare Calculator 2026 — Costs, Part B, and Plans',
  description: 'Calculate your 2026 Medicare costs in Tennessee. Free calculator for Part B premiums, IRMAA surcharges, Medigap, and Medicare Advantage plans available in Tennessee.',
  alternates: { canonical: 'https://medicarecalculators.com/tennessee-medicare-calculator' },
  robots: { index: true, follow: true },
}

export default function Page() {
  return <StateMedicareCard state={state} />
}
