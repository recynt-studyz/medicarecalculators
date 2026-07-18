'use client'

import dynamic from 'next/dynamic'

const PartDCalculator = dynamic(() => import('./PartDCalculator'), { ssr: false })

export default function PartDCalculatorWrapper() {
  return <PartDCalculator />
}
