'use client'

import dynamic from 'next/dynamic'

const PartBIRMAACalculator = dynamic(() => import('./PartBIRMAACalculator'), { ssr: false })

export default function PartBIRMAACalculatorWrapper() {
  return <PartBIRMAACalculator />
}
