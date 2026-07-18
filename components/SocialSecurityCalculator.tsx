'use client'

import { useState, useEffect } from 'react'
import { getSocialSecurityFRA, getSocialSecurityBenefit, fmtDec, fmt } from '@/lib/medicareData'
import AffiliateCTA from './AffiliateCTA'

const STORAGE_KEY = 'mc-social-security'

const inputCls = 'w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-[#0f2744] text-gray-900 dark:text-[#e2e8f0] text-sm focus:outline-none focus:ring-2 focus:ring-[#0f4c75]'
const labelCls = 'block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'
const sectionCls = 'rounded-xl border border-gray-100 dark:border-gray-700 p-4 space-y-3'
const btnActive = 'bg-[#0f4c75] text-white'
const btnInactive = 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'

type Health = 'excellent' | 'good' | 'fair' | 'poor'

const EARNINGS_LIMIT_2026 = 22320

export default function SocialSecurityCalculator() {
  const [birthYear, setBirthYear] = useState('1959')
  const [fraMonthly, setFraMonthly] = useState('2500')
  const [hasSpouse, setHasSpouse] = useState(false)
  const [spouseBirthYear, setSpouseBirthYear] = useState('1960')
  const [spouseFraMonthly, setSpouseFraMonthly] = useState('1800')
  const [health, setHealth] = useState<Health>('good')
  const [stillWorking, setStillWorking] = useState(false)
  const [annualEarnings, setAnnualEarnings] = useState('50000')
  const [showResults, setShowResults] = useState(false)

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
      if (saved.birthYear) setBirthYear(saved.birthYear)
      if (saved.fraMonthly) setFraMonthly(saved.fraMonthly)
      if (saved.hasSpouse !== undefined) setHasSpouse(saved.hasSpouse)
      if (saved.spouseBirthYear) setSpouseBirthYear(saved.spouseBirthYear)
      if (saved.spouseFraMonthly) setSpouseFraMonthly(saved.spouseFraMonthly)
      if (saved.health) setHealth(saved.health)
      if (saved.stillWorking !== undefined) setStillWorking(saved.stillWorking)
      if (saved.annualEarnings) setAnnualEarnings(saved.annualEarnings)
    } catch { /* ignore */ }
  }, [])

  const save = (updates: Record<string, unknown>) => {
    try {
      const cur = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...cur, ...updates }))
    } catch { /* ignore */ }
  }

  const year = parseInt(birthYear) || 1959
  const fra = getSocialSecurityFRA(year)
  const fraMonthlyNum = parseFloat(fraMonthly) || 2500

  const benefit62 = getSocialSecurityBenefit(fraMonthlyNum, year, 62)
  const benefitFRA = fraMonthlyNum
  const benefit70 = getSocialSecurityBenefit(fraMonthlyNum, year, 70)

  // Break-even calculation (months to accumulate the difference)
  const fraAge = fra.years + fra.months / 12
  const months62toFRA = (fraAge - 62) * 12
  const cumulative62atFRA = benefit62 * months62toFRA
  const benefitDiff = benefitFRA - benefit62
  // After FRA, 67 earns (benefitFRA - benefit62) extra per month
  const breakEven62vFRA = benefitDiff > 0
    ? Math.ceil(fraAge + cumulative62atFRA / benefitDiff / 12)
    : null

  const benefit70Diff = benefit70 - benefitFRA
  const monthsFRAto70 = (70 - fraAge) * 12
  const cumulativeFRAat70 = benefitFRA * monthsFRAto70
  const breakEvenFRAv70 = benefit70Diff > 0
    ? Math.ceil(70 + cumulativeFRAat70 / benefit70Diff / 12)
    : null

  // Earnings test
  const earningsNum = parseFloat(annualEarnings) || 0
  const earningsExcess = Math.max(0, earningsNum - EARNINGS_LIMIT_2026)
  const earningsWithheld = earningsExcess / 2

  // Spousal benefit
  const spouseYear = parseInt(spouseBirthYear) || 1960
  const spouseFra = getSocialSecurityFRA(spouseYear)
  const spouseFraMonthlyNum = parseFloat(spouseFraMonthly) || 1800
  const spousalBenefit = fraMonthlyNum * 0.5

  // Projection table
  const claimOptions = [
    { age: 62, benefit: benefit62, label: 'Age 62' },
    { age: fraAge, benefit: benefitFRA, label: `FRA (${fra.label})` },
    { age: 70, benefit: benefit70, label: 'Age 70' },
  ]

  const projectionAges = [75, 80, 85]

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className={sectionCls}>
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Your Social Security</p>
            <div>
              <label className={labelCls}>Birth year</label>
              <input type="number" min="1943" max="1962" value={birthYear}
                onChange={e => { setBirthYear(e.target.value); save({ birthYear: e.target.value }) }}
                className={inputCls} />
              <p className="text-xs text-gray-400 mt-1">Your Full Retirement Age: {fra.label}</p>
            </div>
            <div>
              <label className={labelCls}>Estimated monthly benefit at FRA ($)</label>
              <p className="text-xs text-gray-400 mb-1">Find this on your SSA.gov statement (my.ssa.gov)</p>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                <input type="number" min="0" value={fraMonthly}
                  onChange={e => { setFraMonthly(e.target.value); save({ fraMonthly: e.target.value }) }}
                  className={`${inputCls} pl-7`} />
              </div>
            </div>
            <div>
              <label className={labelCls}>Health status (affects break-even analysis)</label>
              <div className="grid grid-cols-2 gap-2">
                {(['excellent', 'good', 'fair', 'poor'] as Health[]).map(h => (
                  <button key={h} onClick={() => { setHealth(h); save({ health: h }) }}
                    className={`px-2 py-2 rounded-lg text-xs font-medium capitalize transition-colors ${health === h ? btnActive : btnInactive}`}>
                    {h}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className={sectionCls}>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="stillWorking" checked={stillWorking}
                onChange={e => { setStillWorking(e.target.checked); save({ stillWorking: e.target.checked }) }}
                className="rounded border-gray-300 dark:border-gray-600 w-4 h-4 accent-[#0f4c75]" />
              <label htmlFor="stillWorking" className="text-sm font-semibold text-gray-700 dark:text-gray-300 cursor-pointer">
                Still working
              </label>
            </div>
            {stillWorking && (
              <div>
                <label className={labelCls}>Annual earnings</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                  <input type="number" min="0" value={annualEarnings}
                    onChange={e => { setAnnualEarnings(e.target.value); save({ annualEarnings: e.target.value }) }}
                    className={`${inputCls} pl-7`} />
                </div>
              </div>
            )}
          </div>

          <div className={sectionCls}>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="hasSpouse" checked={hasSpouse}
                onChange={e => { setHasSpouse(e.target.checked); save({ hasSpouse: e.target.checked }) }}
                className="rounded border-gray-300 dark:border-gray-600 w-4 h-4 accent-[#0f4c75]" />
              <label htmlFor="hasSpouse" className="text-sm font-semibold text-gray-700 dark:text-gray-300 cursor-pointer">
                Include spouse analysis
              </label>
            </div>
            {hasSpouse && (
              <>
                <div>
                  <label className={labelCls}>Spouse birth year</label>
                  <input type="number" min="1943" max="1962" value={spouseBirthYear}
                    onChange={e => { setSpouseBirthYear(e.target.value); save({ spouseBirthYear: e.target.value }) }}
                    className={inputCls} />
                  <p className="text-xs text-gray-400 mt-1">Spouse FRA: {spouseFra.label}</p>
                </div>
                <div>
                  <label className={labelCls}>Spouse estimated FRA benefit ($)</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                    <input type="number" min="0" value={spouseFraMonthly}
                      onChange={e => { setSpouseFraMonthly(e.target.value); save({ spouseFraMonthly: e.target.value }) }}
                      className={`${inputCls} pl-7`} />
                  </div>
                </div>
              </>
            )}
          </div>

          <button onClick={() => setShowResults(true)}
            className="w-full py-3 rounded-xl bg-[#0f4c75] text-white font-bold text-sm hover:bg-[#1565a0] transition">
            Calculate My Options
          </button>
        </div>

        <div className="space-y-4">
          {showResults || fraMonthlyNum > 0 ? (
            <>
              <div className="rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-[#0f2744] p-4">
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Your Social Security Options</p>
                <div className="space-y-3">
                  {claimOptions.map(({ age: claimAge, benefit, label }) => (
                    <div key={label} className="rounded-lg bg-gray-50 dark:bg-gray-800 p-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Claim at {label}</span>
                        <span className="text-lg font-bold text-[#0f4c75] dark:text-blue-300">{fmtDec(benefit)}/mo</span>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                        {claimAge < fraAge
                          ? `${Math.round((1 - benefit / fraMonthlyNum) * 100)}% reduction from FRA benefit`
                          : claimAge > fraAge
                          ? `${Math.round((benefit / fraMonthlyNum - 1) * 100)}% increase from FRA benefit`
                          : 'Full retirement age benefit'}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-[#0f2744] p-4">
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Break-Even Analysis</p>
                <div className="space-y-2 text-sm">
                  {breakEven62vFRA && (
                    <p className="text-gray-600 dark:text-gray-400">
                      Claiming at 62 vs {fra.label}: you break even at age <span className="font-bold text-gray-900 dark:text-white">{breakEven62vFRA}</span>.
                      {health === 'poor' || health === 'fair'
                        ? ' Given your health status, earlier claiming may make sense.'
                        : ' Average life expectancy favors waiting to FRA.'}
                    </p>
                  )}
                  {breakEvenFRAv70 && (
                    <p className="text-gray-600 dark:text-gray-400">
                      Claiming at FRA vs age 70: you break even at age <span className="font-bold text-gray-900 dark:text-white">{breakEvenFRAv70}</span>.
                      {health === 'excellent'
                        ? ' Given excellent health, delaying to 70 typically pays off.'
                        : health === 'good'
                        ? ' Consider your family longevity history.'
                        : ' Earlier claiming may be preferable given your health status.'}
                    </p>
                  )}
                </div>
              </div>

              <div className="rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-[#0f2744] p-4 overflow-x-auto">
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">10-Year Cumulative Benefit Projection</p>
                <table className="w-full text-xs">
                  <thead>
                    <tr className="text-gray-500 dark:text-gray-400">
                      <th className="text-left pb-2">Claim Age</th>
                      <th className="text-right pb-2">Monthly</th>
                      {projectionAges.map(a => <th key={a} className="text-right pb-2">By {a}</th>)}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                    {claimOptions.map(({ age: claimAge, benefit, label }) => (
                      <tr key={label}>
                        <td className="py-2 font-medium text-gray-700 dark:text-gray-300">{label}</td>
                        <td className="py-2 text-right text-[#0f4c75] dark:text-blue-300 font-bold">{fmtDec(benefit)}</td>
                        {projectionAges.map(projAge => {
                          const months = Math.max(0, (projAge - Math.max(claimAge, fraAge)) * 12)
                          // Actually use when they actually start claiming
                          const startAge = claimAge
                          const receiveMonths = Math.max(0, (projAge - startAge) * 12)
                          const total = benefit * receiveMonths
                          return <td key={projAge} className="py-2 text-right text-gray-700 dark:text-gray-300">{fmt(total)}</td>
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {stillWorking && earningsNum > EARNINGS_LIMIT_2026 && (
                <div className="rounded-xl border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/30 p-4">
                  <p className="text-sm font-bold text-amber-800 dark:text-amber-300 mb-1">Earnings Test Warning</p>
                  <p className="text-sm text-amber-700 dark:text-amber-400 leading-relaxed">
                    In 2026, if you claim before FRA and earn more than ${EARNINGS_LIMIT_2026.toLocaleString()}/year,
                    $1 in benefits is withheld for every $2 earned above the limit.
                    Your estimated withheld amount: {fmtDec(earningsWithheld / 12)}/month.
                    Benefits withheld are returned to you as a higher monthly benefit after you reach FRA.
                  </p>
                </div>
              )}

              {hasSpouse && (
                <div className="rounded-xl border border-blue-100 dark:border-blue-900 bg-blue-50 dark:bg-blue-950/30 p-4">
                  <p className="text-sm font-bold text-blue-800 dark:text-blue-300 mb-1">Spousal Benefit Analysis</p>
                  <p className="text-sm text-blue-700 dark:text-blue-400 leading-relaxed">
                    Your spouse may be eligible for up to {fmtDec(spousalBenefit)}/month based on your record (50% of your FRA benefit),
                    or their own benefit of {fmtDec(spouseFraMonthlyNum)}/month — whichever is higher.
                    {spouseFraMonthlyNum > spousalBenefit
                      ? ` Based on the numbers entered, your spouse&apos;s own benefit (${fmtDec(spouseFraMonthlyNum)}/mo) is higher than the spousal benefit.`
                      : ` Based on the numbers entered, the spousal benefit (${fmtDec(spousalBenefit)}/mo) may be advantageous.`}
                  </p>
                </div>
              )}

              <AffiliateCTA headline="Get Medicare coverage in place when you claim Social Security" />

              <p className="text-xs text-gray-400 dark:text-gray-500 leading-relaxed">
                Estimates based on 2026 Social Security formulas. Actual benefits depend on your complete earnings history. Visit my.ssa.gov for your personalized estimate. Not affiliated with Social Security Administration or Medicare.
              </p>
            </>
          ) : (
            <div className="rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-700 p-10 text-center">
              <div className="text-4xl mb-3">💰</div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Enter your birth year and FRA benefit estimate to calculate your Social Security options.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
