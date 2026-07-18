'use client'

import dynamic from 'next/dynamic'

const AdvantageVsOriginalCalculator = dynamic(() => import('./AdvantageVsOriginalCalculator'), { ssr: false })

export default function AdvantageVsOriginalCalculatorWrapper({ defaultState }: { defaultState?: string }) {
  return <AdvantageVsOriginalCalculator defaultState={defaultState} />
}
