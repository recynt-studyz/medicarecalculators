'use client'

import { useState, useEffect } from 'react'
import { getPartBPremium, MEDICARE_2026, fmt, fmtDec } from '@/lib/medicareData'
import AffiliateCTA from './AffiliateCTA'

const STORAGE_KEY = 'mc-retirement-income'

const inputCls = 'w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-[#0f2744] text-gray-900 dark:text-[#e2e8f0] text-sm focus:outline-none focus:ring-2 focus:ring-[#0f4c75]'
const labelCls = 'block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'
const sectionCls = 'rounded-xl border border-gray-100 dark:border-gray-700 p-4 space-y-3'

function portfolioLongevity(balance: number, monthlyWithdrawal: number, monthlyReturn: number): number | null {
  let b = balance
  let months = 0
  while (b > 0 && months < 600) {
    b = b * (1 + monthlyReturn) - monthlyWithdrawal
    months++
  }
  return b <= 0 ? months : null
}

export default function RetirementIncomeCalculator() {
  const [currentAge, setCurrentAge] = useState('65')
  const [savings, setSavings] = useState('500000')
  const [socialSecurity, setSocialSecurity] = useState('2000')
  const [pension, setPension] = useState('0')
  const [expenses, setExpenses] = useState('4500')
  const [returnRate, setReturnRate] = useState('6')
  const [inflation, setInflation] = useState('3')
  const [lifeExpectancy, setLifeExpectancy] = useState('90')
  const [incomeLevel, setIncomeLevel] = useState('85000')
  const [showResults, setShowResults] = useState(false)

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
      if (saved.currentAge) setCurrentAge(saved.currentAge)
      if (saved.savings) setSavings(saved.savings)
      if (saved.socialSecurity) setSocialSecurity(saved.socialSecurity)
      if (saved.pension) setPension(saved.pension)
      if (saved.expenses) setExpenses(saved.expenses)
      if (saved.returnRate) setReturnRate(saved.returnRate)
      if (saved.inflation) setInflation(saved.inflation)
      if (saved.lifeExpectancy) setLifeExpectancy(saved.lifeExpectancy)
      if (saved.incomeLevel) setIncomeLevel(saved.incomeLevel)
    } catch { /* ignore */ }
  }, [])

  const save = (updates: Record<string, unknown>) => {
    try {
      const cur = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...cur, ...updates }))
    } catch { /* ignore */ }
  }

  const age = parseInt(currentAge) || 65
  const savingsNum = parseFloat(savings) || 500000
  const ssMonthly = parseFloat(socialSecurity) || 0
  const pensionMonthly = parseFloat(pension) || 0
  const expensesMonthly = parseFloat(expenses) || 4500
  const annualReturn = parseFloat(returnRate) / 100 || 0.06
  const annualInflation = parseFloat(inflation) / 100 || 0.03
  const targetAge = parseInt(lifeExpectancy) || 90

  // 4% rule withdrawal
  const fourPercentWithdrawal = savingsNum * 0.04 / 12

  // Portfolio withdrawal needed to cover gap
  const fixedIncome = ssMonthly + pensionMonthly
  const gap = Math.max(0, expensesMonthly - fixedIncome)
  const portfolioWithdrawal = gap

  // Medicare cost estimate
  const { premium: partBPremium } = getPartBPremium(parseFloat(incomeLevel) || 85000, 'single')
  const medicareCostMonthly = partBPremium + MEDICARE_2026.medigap.planG.avg + MEDICARE_2026.partD.avgPremium

  // Portfolio longevity scenarios
  const scenarios = [
    { label: 'Conservative (5%)', rate: 0.05 },
    { label: 'Moderate (7%)', rate: 0.07 },
    { label: 'Optimistic (9%)', rate: 0.09 },
  ]

  const longevityResults = scenarios.map(s => {
    const monthly = s.rate / 12
    const months = portfolioLongevity(savingsNum, portfolioWithdrawal, monthly)
    const depletedAge = months ? age + Math.floor(months / 12) : null
    return { ...s, depletedAge }
  })

  const mainLongevityMonths = portfolioLongevity(savingsNum, portfolioWithdrawal, annualReturn / 12)
  const mainDepletedAge = mainLongevityMonths ? age + Math.floor(mainLongevityMonths / 12) : null

  const totalMonthlyIncome = fixedIncome + Math.min(fourPercentWithdrawal, portfolioWithdrawal)
  const monthlyGap = expensesMonthly - totalMonthlyIncome

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className={sectionCls}>
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Your Retirement Profile</p>
            <div>
              <label className={labelCls}>Current age</label>
              <input type="number" min="55" max="80" value={currentAge}
                onChange={e => { setCurrentAge(e.target.value); save({ currentAge: e.target.value }) }}
                className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Retirement savings ($)</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                <input type="number" min="0" value={savings}
                  onChange={e => { setSavings(e.target.value); save({ savings: e.target.value }) }}
                  className={`${inputCls} pl-7`} />
              </div>
            </div>
            <div>
              <label className={labelCls}>Monthly Social Security income</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                <input type="number" min="0" value={socialSecurity}
                  onChange={e => { setSocialSecurity(e.target.value); save({ socialSecurity: e.target.value }) }}
                  className={`${inputCls} pl-7`} />
              </div>
            </div>
            <div>
              <label className={labelCls}>Monthly pension (if any)</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                <input type="number" min="0" value={pension}
                  onChange={e => { setPension(e.target.value); save({ pension: e.target.value }) }}
                  className={`${inputCls} pl-7`} />
              </div>
            </div>
            <div>
              <label className={labelCls}>Monthly expenses</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                <input type="number" min="0" value={expenses}
                  onChange={e => { setExpenses(e.target.value); save({ expenses: e.target.value }) }}
                  className={`${inputCls} pl-7`} />
              </div>
            </div>
          </div>

          <div className={sectionCls}>
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Assumptions</p>
            <div>
              <label className={labelCls}>Expected annual return: {returnRate}%</label>
              <input type="range" min="3" max="12" step="0.5" value={returnRate}
                onChange={e => { setReturnRate(e.target.value); save({ returnRate: e.target.value }) }}
                className="w-full accent-[#0f4c75]" />
            </div>
            <div>
              <label className={labelCls}>Expected annual inflation: {inflation}%</label>
              <input type="range" min="1" max="6" step="0.5" value={inflation}
                onChange={e => { setInflation(e.target.value); save({ inflation: e.target.value }) }}
                className="w-full accent-[#0f4c75]" />
            </div>
            <div>
              <label className={labelCls}>Life expectancy target: {lifeExpectancy}</label>
              <input type="range" min="75" max="100" value={lifeExpectancy}
                onChange={e => { setLifeExpectancy(e.target.value); save({ lifeExpectancy: e.target.value }) }}
                className="w-full accent-[#0f4c75]" />
            </div>
            <div>
              <label className={labelCls}>Annual income (for Medicare cost estimate)</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                <input type="number" min="0" value={incomeLevel}
                  onChange={e => { setIncomeLevel(e.target.value); save({ incomeLevel: e.target.value }) }}
                  className={`${inputCls} pl-7`} />
              </div>
            </div>
          </div>

          <button onClick={() => setShowResults(true)}
            className="w-full py-3 rounded-xl bg-[#0f4c75] text-white font-bold text-sm hover:bg-[#1565a0] transition">
            Analyze My Retirement Income
          </button>
        </div>

        <div className="space-y-4">
          {showResults || savingsNum > 0 ? (
            <>
              <div className={`rounded-xl p-5 border ${monthlyGap > 0 ? 'bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800' : 'bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800'}`}>
                <p className={`text-sm font-medium mb-1 ${monthlyGap > 0 ? 'text-amber-800 dark:text-amber-300' : 'text-green-800 dark:text-green-300'}`}>
                  {monthlyGap > 0 ? 'Monthly Income Gap' : 'Monthly Surplus'}
                </p>
                <p className={`text-4xl font-bold ${monthlyGap > 0 ? 'text-amber-900 dark:text-amber-200' : 'text-green-800 dark:text-green-300'}`}>
                  {monthlyGap > 0 ? `-${fmtDec(monthlyGap)}` : `+${fmtDec(Math.abs(monthlyGap))}`}/mo
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {monthlyGap > 0
                    ? `Annual gap of ${fmt(monthlyGap * 12)} needs to be covered by portfolio withdrawals`
                    : `Annual surplus of ${fmt(Math.abs(monthlyGap) * 12)}`}
                </p>
              </div>

              <div className="rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-[#0f2744] p-4">
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Monthly Income Breakdown</p>
                <div className="space-y-2">
                  {[
                    { label: 'Social Security', val: ssMonthly },
                    { label: 'Pension', val: pensionMonthly },
                    { label: `Portfolio (4% rule = ${fmtDec(fourPercentWithdrawal)}/mo)`, val: fourPercentWithdrawal },
                    { label: 'Total monthly income', val: fixedIncome + fourPercentWithdrawal, bold: true },
                    { label: 'Monthly expenses', val: -expensesMonthly },
                    { label: monthlyGap > 0 ? 'Monthly gap' : 'Monthly surplus', val: -(monthlyGap), bold: true },
                  ].map(({ label, val, bold }) => (
                    <div key={label} className={`flex justify-between text-sm ${bold ? 'border-t border-gray-100 dark:border-gray-600 pt-2 mt-1' : ''}`}>
                      <span className={bold ? 'font-semibold text-gray-800 dark:text-[#e2e8f0]' : 'text-gray-600 dark:text-gray-400'}>{label}</span>
                      <span className={`font-medium ${bold ? 'text-[#0f4c75] dark:text-blue-300' : val >= 0 ? 'text-gray-800 dark:text-[#e2e8f0]' : 'text-red-600 dark:text-red-400'}`}>
                        {val >= 0 ? fmtDec(val) : `-${fmtDec(Math.abs(val))}`}/mo
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-[#0f2744] p-4">
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Portfolio Longevity Scenarios</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                  Withdrawing {fmtDec(portfolioWithdrawal)}/month from {fmt(savingsNum)} portfolio
                </p>
                <div className="space-y-2">
                  {longevityResults.map(s => (
                    <div key={s.label} className="flex justify-between items-center text-sm">
                      <span className="text-gray-600 dark:text-gray-400">{s.label}</span>
                      <span className={`font-bold ${!s.depletedAge ? 'text-green-600 dark:text-green-400' : s.depletedAge >= targetAge ? 'text-[#0f4c75] dark:text-blue-300' : 'text-amber-600 dark:text-amber-400'}`}>
                        {s.depletedAge
                          ? s.depletedAge >= targetAge
                            ? `Lasts to age ${s.depletedAge}`
                            : `Depleted at age ${s.depletedAge}`
                          : 'Lasts indefinitely'}
                      </span>
                    </div>
                  ))}
                </div>
                {mainDepletedAge && mainDepletedAge < targetAge && (
                  <p className="text-xs text-amber-600 dark:text-amber-400 mt-2">
                    At current withdrawal rate, your portfolio may be depleted {targetAge - mainDepletedAge} years before your target age of {targetAge}. Consider reducing expenses or increasing income.
                  </p>
                )}
              </div>

              <div className="rounded-xl border border-blue-100 dark:border-blue-900 bg-blue-50 dark:bg-blue-950/30 p-4">
                <p className="text-sm font-bold text-blue-800 dark:text-blue-300 mb-1">Budget for Medicare Costs</p>
                <p className="text-sm text-blue-700 dark:text-blue-400 leading-relaxed">
                  Don&apos;t forget to budget approximately {fmtDec(medicareCostMonthly)}/month for Medicare premiums
                  (Part B + Plan G Medigap + Part D) based on your income level.
                  Medicare costs should be included in your monthly expense estimate above.
                  See our <a href="/" className="underline">Medicare Cost Calculator</a> for your personalized estimate.
                </p>
              </div>

              <AffiliateCTA headline="Get Medicare coverage to protect your retirement savings" />

              <p className="text-xs text-gray-400 dark:text-gray-500 leading-relaxed">
                Retirement projections are estimates for planning purposes. Actual results depend on investment returns, taxes, inflation, and spending. Consult a licensed financial advisor and Medicare advisor for personalized guidance. Not affiliated with Medicare or the US government.
              </p>
            </>
          ) : (
            <div className="rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-700 p-10 text-center">
              <div className="text-4xl mb-3">🏡</div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Enter your retirement income sources and expenses to analyze whether your savings will last.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
