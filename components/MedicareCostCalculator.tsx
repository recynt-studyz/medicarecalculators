'use client'

import { useState, useEffect } from 'react'
import { getPartBPremium, MEDICARE_2026, fmtDec } from '@/lib/medicareData'
import AffiliateCTA from './AffiliateCTA'

const STORAGE_KEY = 'mc-medicare-cost'

const inputCls = 'w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-[#0f2744] text-gray-900 dark:text-[#e2e8f0] text-sm focus:outline-none focus:ring-2 focus:ring-[#0f4c75] dark:focus:ring-blue-400'
const labelCls = 'block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'
const sectionCls = 'rounded-xl border border-gray-100 dark:border-gray-700 p-4 space-y-3'
const btnActive = 'bg-[#0f4c75] text-white'
const btnInactive = 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'

type PartASituation = 'full' | 'partial' | 'none'
type FilingStatus = 'single' | 'mfj' | 'mfs'
type CoverageType = 'original' | 'advantage'
type MedigapPlan = 'G' | 'N' | 'A' | 'other' | 'none'

export default function MedicareCostCalculator() {
  const [birthYear, setBirthYear] = useState('1959')
  const [partASit, setPartASit] = useState<PartASituation>('full')
  const [income, setIncome] = useState('85000')
  const [filing, setFiling] = useState<FilingStatus>('single')
  const [coverage, setCoverage] = useState<CoverageType>('original')
  const [hasPartD, setHasPartD] = useState(true)
  const [medigap, setMedigap] = useState<MedigapPlan>('G')
  const [showResults, setShowResults] = useState(false)

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
      if (saved.birthYear) setBirthYear(saved.birthYear)
      if (saved.partASit) setPartASit(saved.partASit)
      if (saved.income) setIncome(saved.income)
      if (saved.filing) setFiling(saved.filing)
      if (saved.coverage) setCoverage(saved.coverage)
      if (saved.hasPartD !== undefined) setHasPartD(saved.hasPartD)
      if (saved.medigap) setMedigap(saved.medigap)
    } catch { /* ignore */ }
  }, [])

  const save = (updates: Record<string, unknown>) => {
    try {
      const cur = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...cur, ...updates }))
    } catch { /* ignore */ }
  }

  const magi = parseFloat(income) || 0
  const { premium: partBPremium, surcharge: irmaa } = getPartBPremium(magi, filing)

  const partAPremium =
    partASit === 'full' ? 0 :
    partASit === 'partial' ? MEDICARE_2026.partA.premium30to39 :
    MEDICARE_2026.partA.premiumUnder30

  const partDPremium = hasPartD ? MEDICARE_2026.partD.avgPremium : 0

  const medigapPremium =
    medigap === 'G' ? MEDICARE_2026.medigap.planG.avg :
    medigap === 'N' ? MEDICARE_2026.medigap.planN.avg :
    medigap === 'A' ? MEDICARE_2026.medigap.planA.avg :
    medigap === 'other' ? 150 : 0

  const totalOriginal = partAPremium + partBPremium + partDPremium + medigapPremium
  const totalAdvantage = partAPremium + partBPremium + MEDICARE_2026.partC.avgPremium
  const maSavings = totalOriginal - totalAdvantage

  const displayTotal = coverage === 'original' ? totalOriginal : totalAdvantage

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* INPUTS */}
        <div className="space-y-4">
          <div className={sectionCls}>
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">About You</p>
            <div>
              <label className={labelCls}>Birth year</label>
              <input
                type="number" min="1940" max="1970" value={birthYear}
                onChange={e => { setBirthYear(e.target.value); save({ birthYear: e.target.value }) }}
                className={inputCls}
              />
            </div>
            <div>
              <label className={labelCls}>Part A premium situation</label>
              <div className="space-y-2">
                {([
                  ['full', 'Paid Medicare taxes 10+ years — $0/month'],
                  ['partial', '30–39 quarters — $278/month'],
                  ['none', 'Under 30 quarters — $505/month'],
                ] as [PartASituation, string][]).map(([val, label]) => (
                  <button key={val} onClick={() => { setPartASit(val); save({ partASit: val }) }}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${partASit === val ? btnActive : btnInactive}`}>
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className={sectionCls}>
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Income (for IRMAA)</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Your 2024 MAGI — Medicare uses income from 2 years ago</p>
            <div>
              <label className={labelCls}>Annual income (MAGI, 2024)</label>
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
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Coverage Type</p>
            <div className="grid grid-cols-2 gap-2">
              {([
                ['original', 'Original Medicare'],
                ['advantage', 'Medicare Advantage'],
              ] as [CoverageType, string][]).map(([val, label]) => (
                <button key={val} onClick={() => { setCoverage(val); save({ coverage: val }) }}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${coverage === val ? btnActive : btnInactive}`}>
                  {label}
                </button>
              ))}
            </div>

            {coverage === 'original' && (
              <>
                <div>
                  <label className={labelCls}>Part D (drug coverage)</label>
                  <div className="grid grid-cols-2 gap-2">
                    {([
                      [true, 'Yes — $46.50/month avg'],
                      [false, 'No Part D'],
                    ] as [boolean, string][]).map(([val, label]) => (
                      <button key={String(val)} onClick={() => { setHasPartD(val); save({ hasPartD: val }) }}
                        className={`px-2 py-2 rounded-lg text-xs font-medium transition-colors ${hasPartD === val ? btnActive : btnInactive}`}>
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className={labelCls}>Medigap supplement plan</label>
                  <div className="grid grid-cols-2 gap-2">
                    {([
                      ['G', 'Plan G (~$175/mo)'],
                      ['N', 'Plan N (~$140/mo)'],
                      ['A', 'Plan A (~$110/mo)'],
                      ['other', 'Other supplement'],
                      ['none', 'No supplement'],
                    ] as [MedigapPlan, string][]).map(([val, label]) => (
                      <button key={val} onClick={() => { setMedigap(val); save({ medigap: val }) }}
                        className={`px-2 py-2 rounded-lg text-xs font-medium transition-colors ${medigap === val ? btnActive : btnInactive}`}>
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          <button
            onClick={() => setShowResults(true)}
            className="w-full py-3 rounded-xl bg-[#0f4c75] text-white font-bold text-sm hover:bg-[#1565a0] transition"
          >
            Calculate My Medicare Costs
          </button>
        </div>

        {/* RESULTS */}
        <div className="space-y-4">
          {showResults || magi > 0 ? (
            <>
              <div className="rounded-xl bg-[#0f4c75]/10 dark:bg-[#0f4c75]/30 border border-[#0f4c75]/30 p-5">
                <p className="text-sm text-[#0f4c75] dark:text-blue-300 font-medium mb-1">Your Estimated Monthly Medicare Costs</p>
                <p className="text-4xl font-bold text-[#0f4c75] dark:text-white">
                  {fmtDec(displayTotal)}/mo
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {fmtDec(displayTotal * 12)}/year estimated
                </p>
              </div>

              <div className="rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-[#0f2744] p-4">
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Monthly Cost Breakdown</p>
                <div className="space-y-2">
                  {[
                    { label: 'Part A premium', val: partAPremium },
                    { label: 'Part B premium (standard)', val: MEDICARE_2026.partB.standardPremium },
                    ...(irmaa > 0 ? [{ label: `IRMAA surcharge (income $${magi.toLocaleString()})`, val: irmaa, warn: true }] : []),
                    ...(coverage === 'original' && hasPartD ? [{ label: 'Part D premium (avg)', val: partDPremium }] : []),
                    ...(coverage === 'original' && medigap !== 'none' ? [{ label: `Medigap Plan ${medigap} (est. age 65)`, val: medigapPremium }] : []),
                    ...(coverage === 'advantage' ? [{ label: 'Medicare Advantage premium (avg)', val: MEDICARE_2026.partC.avgPremium }] : []),
                    { label: 'TOTAL ESTIMATED', val: displayTotal, bold: true },
                  ].map(({ label, val, bold, warn }) => (
                    <div key={label} className={`flex justify-between text-sm ${bold ? 'border-t border-gray-100 dark:border-gray-600 pt-2 mt-1' : ''}`}>
                      <span className={`${bold ? 'font-semibold text-gray-800 dark:text-[#e2e8f0]' : warn ? 'text-amber-700 dark:text-amber-400' : 'text-gray-600 dark:text-gray-400'}`}>{label}</span>
                      <span className={`font-medium ${bold ? 'text-[#0f4c75] dark:text-blue-300' : warn ? 'text-amber-700 dark:text-amber-400' : 'text-gray-800 dark:text-[#e2e8f0]'}`}>
                        {fmtDec(val)}/mo
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {irmaa > 0 && (
                <div className="rounded-xl border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/30 p-4">
                  <p className="text-sm font-semibold text-amber-800 dark:text-amber-300 mb-1">IRMAA Surcharge Applies</p>
                  <p className="text-sm text-amber-700 dark:text-amber-400 leading-relaxed">
                    Your income of ${magi.toLocaleString()} may trigger an IRMAA surcharge. Based on your 2024 MAGI,
                    your Part B premium increases to {fmtDec(MEDICARE_2026.partB.standardPremium + irmaa)}/month
                    ({fmtDec(irmaa)} more than the standard ${MEDICARE_2026.partB.standardPremium}/month premium).
                    IRMAA is based on income from 2 years ago.
                  </p>
                </div>
              )}

              {coverage === 'original' && (
                <div className="rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-[#0f2744] p-4">
                  <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Medicare Advantage Alternative</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Average MA premium</span>
                      <span className="font-medium text-gray-800 dark:text-[#e2e8f0]">{fmtDec(MEDICARE_2026.partC.avgPremium)}/mo</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Total with MA (Part B + MA avg)</span>
                      <span className="font-medium text-gray-800 dark:text-[#e2e8f0]">{fmtDec(totalAdvantage)}/mo</span>
                    </div>
                    <div className="flex justify-between border-t border-gray-100 dark:border-gray-600 pt-2">
                      <span className="font-semibold text-gray-800 dark:text-[#e2e8f0]">Potential monthly savings</span>
                      <span className={`font-bold ${maSavings > 0 ? 'text-green-600 dark:text-green-400' : 'text-gray-800 dark:text-[#e2e8f0]'}`}>
                        {maSavings > 0 ? `+${fmtDec(maSavings)}/mo` : fmtDec(maSavings) + '/mo'}
                      </span>
                    </div>
                  </div>
                  {maSavings > 0 && (
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 italic">
                      MA plans may have network restrictions and prior authorization requirements. Compare plans carefully.
                    </p>
                  )}
                </div>
              )}

              <AffiliateCTA headline="Want help choosing the right Medicare plan?" />

              <p className="text-xs text-gray-400 dark:text-gray-500 leading-relaxed">
                These calculators provide estimates based on 2026 Medicare data for educational purposes only. Medicare costs and coverage vary by plan, location, and individual circumstances. Contact Medicare directly at 1-800-MEDICARE or medicare.gov for official information. Not affiliated with Medicare or the US government.
              </p>
            </>
          ) : (
            <div className="rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-700 p-10 text-center">
              <div className="text-4xl mb-3">🏥</div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Enter your information to the left and click Calculate to see your estimated 2026 Medicare costs.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
