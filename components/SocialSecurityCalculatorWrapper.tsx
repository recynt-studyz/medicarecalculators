'use client'

import dynamic from 'next/dynamic'

const SocialSecurityCalculator = dynamic(() => import('./SocialSecurityCalculator'), { ssr: false })

export default function SocialSecurityCalculatorWrapper() {
  return <SocialSecurityCalculator />
}
