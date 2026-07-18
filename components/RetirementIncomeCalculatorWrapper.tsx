'use client'

import dynamic from 'next/dynamic'

const RetirementIncomeCalculator = dynamic(() => import('./RetirementIncomeCalculator'), { ssr: false })

export default function RetirementIncomeCalculatorWrapper() {
  return <RetirementIncomeCalculator />
}
