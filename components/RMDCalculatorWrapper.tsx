'use client'

import dynamic from 'next/dynamic'

const RMDCalculator = dynamic(() => import('./RMDCalculator'), { ssr: false })

export default function RMDCalculatorWrapper() {
  return <RMDCalculator />
}
