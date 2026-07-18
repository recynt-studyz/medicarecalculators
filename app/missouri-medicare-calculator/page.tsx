import type { Metadata } from 'next'
import { STATES } from '@/lib/medicareData'
import StateMedicareCard from '@/components/StateMedicareCard'

const state = STATES['MO']

export const metadata: Metadata = {
  title: 'Missouri Medicare Calculator 2026 — Costs, Part B, and Plans',
  description: 'Calculate your 2026 Medicare costs in Missouri. Free calculator for Part B premiums, IRMAA surcharges, Medigap, and Medicare Advantage plans available in Missouri.',
  alternates: { canonical: 'https://medicarecalculators.com/missouri-medicare-calculator' },
  robots: { index: true, follow: true },
}

export default function Page() {
  return <StateMedicareCard state={state} />
}
