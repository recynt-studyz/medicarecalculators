'use client'

import dynamic from 'next/dynamic'

const MedigapCalculator = dynamic(() => import('./MedigapCalculator'), { ssr: false })

export default function MedigapCalculatorWrapper({ defaultState }: { defaultState?: string }) {
  return <MedigapCalculator defaultState={defaultState} />
}
