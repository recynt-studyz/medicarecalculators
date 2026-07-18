import type { Metadata } from 'next'
import { STATES } from '@/lib/medicareData'
import StateSocialSecurityPage from '@/components/StateSocialSecurityPage'

const state = STATES['ME']

export const metadata: Metadata = {
  title: 'Maine Social Security Calculator 2026 — When to Claim',
  description: 'Calculate your Social Security benefits in Maine for 2026. Free break-even analysis and spousal benefit calculator to help you decide when to claim Social Security.',
  alternates: { canonical: 'https://medicarecalculators.com/maine-social-security-calculator' },
  robots: { index: true, follow: true },
}

export default function Page() {
  return <StateSocialSecurityPage state={state} />
}
