'use client'

import { useState, useEffect } from 'react'
import { getPartBPremium, MEDICARE_2026, fmtDec } from '@/lib/medicareData'
import AffiliateCTA from './AffiliateCTA'

const STORAGE_KEY = 'mc-partb-irmaa'

const inputCls = 'w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-[#0f2744] text-gray-900 dark:text-[#e2e8f0] text-sm focus:outline-none focus:ring-2 focus:ring-[#0f4c75]'
const labelCls = 'block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'
const sectionCls = 'rounded-xl border border-gray-100 dark:border-gray-700 p-4 space-y-3'
const btnActive = 'bg-[#0f4c75] text-white'
const btnInactive = 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'

type FilingStatus = 'single' | 'mfj' | 'mfs'

const LCE_OPTIONS = [
  'Marriage',
  'Divorce or Annulment',
  'Death of Spouse',
  'Work Reduction',
  'Work Stoppage',
  'Loss of Pension',
  'Employer Settlement Payment',
]

export default function PartBIRMAACalculator() {
  const [income, setIncome] = useState('100000')
  const [filing, setFiling] = useState<FilingStatus>('single')
  const [hasLCE, setHasLCE] = useState(false)
  const [lceType, setLceType] = useState('')
  const [showResults, setShowResults] = useState(false)

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
      if (saved.income) setIncome(saved.income)
      if (saved.filing) setFiling(saved.filing)
      if (saved.hasLCE !== undefined) setHasLCE(saved.hasLCE)
      if (saved.lceType) setLceType(saved.lceType)
    } catch { /* ignore */ }
  }, [])

  const save = (updates: Record<string, unknown>) => {
    try {
      const cur = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...cur, ...updates }))
    } catch { /* ignore */ }
  }

  const magi = parseFloat(income) || 0
  const { premium, surcharge, bracket } = getPartBPremium(magi, filing)
  const brackets = MEDICARE_2026.partB.irmaa

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className={sectionCls}>
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Your 2024 Income</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              2026 IRMAA is based on your 2024 Modified Adjusted Gross Income (MAGI) from your tax return.
            </p>
            <div>
              <label className={labelCls}>2024 MAGI</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                <input
                  type="number" min="0" value={income}
                  onChange={e => { setIncome(e.target.value); save({ income: e.target.value }) }}
                  className={`${inputCls} pl-7`}
                />
              </div>
            </div>
            <div>
              <label className={labelCls}>Tax filing status</label>
              <div className="grid grid-cols-3 gap-2">
                {([
                  ['single', 'Single'],
                  ['mfj', 'Married (MFJ)'],
                  ['mfs', 'Married (MFS)'],
                ] as [FilingStatus, string][]).map(([val, label]) => (
                  <button key={val} onClick={() => { setFiling(val); save({ filing: val }) }}
                    className={`px-2 py-2 rounded-lg text-xs font-medium transition-colors ${filing === val ? btnActive : btnInactive}`}>
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className={sectionCls}>
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Life Changing Event (LCE)</p>
            <div className="flex items-center gap-2">
              <input
                type="checkbox" id="hasLCE" checked={hasLCE}
                onChange={e => { setHasLCE(e.target.checked); save({ hasLCE: e.target.checked }) }}
                className="rounded border-gray-300 dark:border-gray-600 w-4 h-4 accent-[#0f4c75]"
              />
              <label htmlFor="hasLCE" className="text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
                I experienced a life changing event that reduced my income
              </label>
            </div>
            {hasLCE && (
              <div>
                <label className={labelCls}>Type of life changing event</label>
                <select
                  value={lceType}
                  onChange={e => { setLceType(e.target.value); save({ lceType: e.target.value }) }}
                  className={inputCls}
                >
                  <option value="">Select event type...</option>
                  {LCE_OPTIONS.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
                <p className="text-xs text-[#0f4c75] dark:text-blue-300 mt-2 leading-relaxed">
                  You can appeal your IRMAA determination using SSA Form SSA-44.
                  Contact Social Security at 1-800-772-1213 or visit ssa.gov to request a reduction.
                </p>
              </div>
            )}
          </div>

          <button
            onClick={() => setShowResults(true)}
            className="w-full py-3 rounded-xl bg-[#0f4c75] text-white font-bold text-sm hover:bg-[#1565a0] transition"
          >
            Calculate My Part B Premium
          </button>
        </div>

        <div className="space-y-4">
          {showResults || magi > 0 ? (
            <>
              <div className={`rounded-xl p-5 border ${surcharge > 0 ? 'bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800' : 'bg-[#0f4c75]/10 dark:bg-[#0f4c75]/30 border-[#0f4c75]/30'}`}>
                <p className={`text-sm font-medium mb-1 ${surcharge > 0 ? 'text-amber-800 dark:text-amber-300' : 'text-[#0f4c75] dark:text-blue-300'}`}>
                  Your 2026 Part B Premium
                </p>
                <p className={`text-4xl font-bold ${surcharge > 0 ? 'text-amber-900 dark:text-amber-200' : 'text-[#0f4c75] dark:text-white'}`}>
                  {fmtDec(premium)}/mo
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {fmtDec(premium * 12)}/year annual Part B cost
                </p>
                {surcharge > 0 && (
                  <p className="text-sm text-amber-700 dark:text-amber-400 mt-2">
                    Includes IRMAA surcharge of {fmtDec(surcharge)}/month
                  </p>
                )}
              </div>

              <div className="rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-[#0f2744] p-4">
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">2026 IRMAA Bracket Table</p>
                <div className="space-y-1">
                  {brackets.map((b, i) => {
                    const isYou = i === bracket
                    return (
                      <div
                        key={i}
                        className={`flex justify-between text-xs rounded-lg px-3 py-2 ${
                          isYou
                            ? 'bg-[#0f4c75] text-white font-semibold'
                            : 'text-gray-600 dark:text-gray-400 odd:bg-gray-50 dark:odd:bg-gray-800/50'
                        }`}
                      >
                        <span>
                          {i === 0 ? `≤$${(106000).toLocaleString()} single / ≤$${(212000).toLocaleString()} MFJ` :
                           i === 1 ? `$${(106001).toLocaleString()}–$${(133000).toLocaleString()} single` :
                           i === 2 ? `$${(133001).toLocaleString()}–$${(167000).toLocaleString()} single` :
                           i === 3 ? `$${(167001).toLocaleString()}–$${(200000).toLocaleString()} single` :
                           i === 4 ? `$${(200001).toLocaleString()}–$${(500000).toLocaleString()} single` :
                           `$${(500001).toLocaleString()}+ single`}
                          {isYou && ' ← YOU'}
                        </span>
                        <span>{fmtDec(b.total)}/mo</span>
                      </div>
                    )
                  })}
                </div>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
                  MFJ thresholds are double the single thresholds. MFS uses single thresholds.
                </p>
              </div>

              {hasLCE && (
                <div className="rounded-xl border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/30 p-4">
                  <p className="text-sm font-semibold text-blue-800 dark:text-blue-300 mb-1">Life Changing Event Appeal</p>
                  <p className="text-sm text-blue-700 dark:text-blue-400 leading-relaxed">
                    {lceType ? `A "${lceType}" qualifies as a life changing event. ` : ''}
                    If your income has decreased due to a qualifying life changing event, you can appeal your IRMAA determination using SSA Form SSA-44.
                    Contact Social Security at 1-800-772-1213 or visit your local SSA office. If approved, your IRMAA may be recalculated using more recent income data.
                  </p>
                </div>
              )}

              <AffiliateCTA headline="Have questions about your Medicare Part B costs?" />

              <p className="text-xs text-gray-400 dark:text-gray-500 leading-relaxed">
                These calculators provide estimates based on 2026 Medicare data for educational purposes only. Contact Medicare at 1-800-MEDICARE or medicare.gov for official information. Not affiliated with Medicare or the US government.
              </p>
            </>
          ) : (
            <div className="rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-700 p-10 text-center">
              <div className="text-4xl mb-3">📋</div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Enter your 2024 income and filing status to calculate your 2026 Part B premium and IRMAA surcharge.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
