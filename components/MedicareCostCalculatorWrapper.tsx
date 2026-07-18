'use client'

import dynamic from 'next/dynamic'

const MedicareCostCalculator = dynamic(() => import('./MedicareCostCalculator'), { ssr: false })

export default function MedicareCostCalculatorWrapper() {
  return <MedicareCostCalculator />
}
