import type { Metadata } from 'next'
import { STATES } from '@/lib/medicareData'
import StateMedicareCard from '@/components/StateMedicareCard'

const state = STATES['MT']

export const metadata: Metadata = {
  title: 'Montana Medicare Calculator 2026 — Costs, Part B, and Plans',
  description: 'Calculate your 2026 Medicare costs in Montana. Free calculator for Part B premiums, IRMAA surcharges, Medigap, and Medicare Advantage plans available in Montana.',
  alternates: { canonical: 'https://medicarecalculators.com/montana-medicare-calculator' },
  robots: { index: true, follow: true },
}

export default function Page() {
  return <StateMedicareCard state={state} />
}
