'use client'

import { useState, useEffect } from 'react'
import { getRMDFactor, fmt, fmtDec } from '@/lib/medicareData'
import AffiliateCTA from './AffiliateCTA'

const STORAGE_KEY = 'mc-rmd'

const inputCls = 'w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-[#0f2744] text-gray-900 dark:text-[#e2e8f0] text-sm focus:outline-none focus:ring-2 focus:ring-[#0f4c75]'
const labelCls = 'block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'
const sectionCls = 'rounded-xl border border-gray-100 dark:border-gray-700 p-4 space-y-3'
const btnActive = 'bg-[#0f4c75] text-white'
const btnInactive = 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'

type AccountType = 'ira' | '401k' | '403b' | 'inherited' | 'roth'

const TAX_BRACKETS = [
  { rate: 0.12, label: '12%', threshold: 47150 },
  { rate: 0.22, label: '22%', threshold: 100525 },
  { rate: 0.24, label: '24%', threshold: 191950 },
  { rate: 0.32, label: '32%', threshold: 243725 },
  { rate: 0.35, label: '35%', threshold: 609350 },
  { rate: 0.37, label: '37%', threshold: Infinity },
]

function estimateTaxBracket(income: number): number {
  for (const b of TAX_BRACKETS) {
    if (income <= b.threshold) return b.rate
  }
  return 0.37
}

export default function RMDCalculator() {
  const [age, setAge] = useState('73')
  const [balance, setBalance] = useState('500000')
  const [accountType, setAccountType] = useState<AccountType>('ira')
  const [otherIncome, setOtherIncome] = useState('40000')
  const [growthRate, setGrowthRate] = useState('7')
  const [showResults, setShowResults] = useState(false)

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
      if (saved.age) setAge(saved.age)
      if (saved.balance) setBalance(saved.balance)
      if (saved.accountType) setAccountType(saved.accountType)
      if (saved.otherIncome) setOtherIncome(saved.otherIncome)
      if (saved.growthRate) setGrowthRate(saved.growthRate)
    } catch { /* ignore */ }
  }, [])

  const save = (updates: Record<string, unknown>) => {
    try {
      const cur = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...cur, ...updates }))
    } catch { /* ignore */ }
  }

  const ageNum = parseInt(age) || 73
  const balanceNum = parseFloat(balance) || 500000
  const otherIncomeNum = parseFloat(otherIncome) || 0
  const growth = parseFloat(growthRate) / 100 || 0.07

  const factor = getRMDFactor(ageNum)
  const rmd = factor > 0 && accountType !== 'roth' ? balanceNum / factor : 0
  const taxBracket = estimateTaxBracket(otherIncomeNum + rmd)
  const estimatedTax = rmd * taxBracket

  // Future projections
  const projections: Array<{ year: number; age: number; balance: number; rmd: number; factor: number }> = []
  let projBalance = balanceNum
  for (let i = 0; i < 13; i++) {
    const projAge = ageNum + i
    const projFactor = getRMDFactor(projAge)
    const projRMD = projFactor > 0 ? projBalance / projFactor : 0
    projections.push({ year: i + 1, age: projAge, balance: projBalance, rmd: projRMD, factor: projFactor })
    projBalance = (projBalance - projRMD) * (1 + growth)
  }

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className={sectionCls}>
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Your Account</p>
            <div>
              <label className={labelCls}>Current age</label>
              <input type="number" min="72" max="100" value={age}
                onChange={e => { setAge(e.target.value); save({ age: e.target.value }) }}
                className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Account balance ($)</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                <input type="number" min="0" value={balance}
                  onChange={e => { setBalance(e.target.value); save({ balance: e.target.value }) }}
                  className={`${inputCls} pl-7`} />
              </div>
            </div>
            <div>
              <label className={labelCls}>Account type</label>
              <div className="grid grid-cols-2 gap-2">
                {([
                  ['ira', 'Traditional IRA'],
                  ['401k', '401(k)'],
                  ['403b', '403(b)'],
                  ['inherited', 'Inherited IRA'],
                  ['roth', 'Roth IRA (no RMD)'],
                ] as [AccountType, string][]).map(([val, label]) => (
                  <button key={val} onClick={() => { setAccountType(val); save({ accountType: val }) }}
                    className={`px-2 py-2 rounded-lg text-xs font-medium transition-colors ${accountType === val ? btnActive : btnInactive}`}>
                    {label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className={labelCls}>Other annual income (for tax estimate)</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                <input type="number" min="0" value={otherIncome}
                  onChange={e => { setOtherIncome(e.target.value); save({ otherIncome: e.target.value }) }}
                  className={`${inputCls} pl-7`} />
              </div>
            </div>
            <div>
              <label className={labelCls}>Assumed annual portfolio growth: {growthRate}%</label>
              <input type="range" min="0" max="12" step="0.5" value={growthRate}
                onChange={e => { setGrowthRate(e.target.value); save({ growthRate: e.target.value }) }}
                className="w-full accent-[#0f4c75]" />
            </div>
          </div>

          <button onClick={() => setShowResults(true)}
            className="w-full py-3 rounded-xl bg-[#0f4c75] text-white font-bold text-sm hover:bg-[#1565a0] transition">
            Calculate My RMD
          </button>
        </div>

        <div className="space-y-4">
          {showResults || balanceNum > 0 ? (
            <>
              {accountType === 'roth' ? (
                <div className="rounded-xl border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/30 p-5">
                  <p className="text-sm font-bold text-green-800 dark:text-green-300 mb-1">No RMD Required for Roth IRA</p>
                  <p className="text-sm text-green-700 dark:text-green-400 leading-relaxed">
                    Roth IRAs are not subject to Required Minimum Distributions during your lifetime.
                    Your Roth IRA can continue to grow tax-free. Note: inherited Roth IRAs may have RMD requirements.
                  </p>
                </div>
              ) : (
                <>
                  <div className="rounded-xl bg-[#0f4c75]/10 dark:bg-[#0f4c75]/30 border border-[#0f4c75]/30 p-5">
                    <p className="text-sm text-[#0f4c75] dark:text-blue-300 font-medium mb-1">Your 2026 Required Minimum Distribution</p>
                    <p className="text-4xl font-bold text-[#0f4c75] dark:text-white">{fmt(rmd)}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {fmtDec(rmd / 12)}/month equivalent
                    </p>
                  </div>

                  <div className="rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-[#0f2744] p-4">
                    <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">RMD Calculation</p>
                    <div className="space-y-2">
                      {[
                        { label: 'Account balance', val: fmt(balanceNum) },
                        { label: `Your age`, val: String(ageNum) },
                        { label: `IRS life expectancy factor`, val: factor > 0 ? String(factor) : 'N/A' },
                        { label: 'RMD = Balance ÷ Factor', val: fmt(rmd), bold: true },
                        { label: `Estimated tax (${Math.round(taxBracket * 100)}% bracket)`, val: fmt(estimatedTax), warn: true },
                      ].map(({ label, val, bold, warn }) => (
                        <div key={label} className={`flex justify-between text-sm ${bold ? 'border-t border-gray-100 dark:border-gray-600 pt-2 mt-1' : ''}`}>
                          <span className={bold ? 'font-semibold text-gray-800 dark:text-[#e2e8f0]' : warn ? 'text-amber-700 dark:text-amber-400' : 'text-gray-600 dark:text-gray-400'}>{label}</span>
                          <span className={`font-medium ${bold ? 'text-[#0f4c75] dark:text-blue-300' : warn ? 'text-amber-700 dark:text-amber-400' : 'text-gray-800 dark:text-[#e2e8f0]'}`}>{val}</span>
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-gray-400 mt-2">
                      Tax estimate is approximate. Your RMD of {fmt(rmd)} will be added to your taxable income.
                      Consult a tax advisor for accurate planning.
                    </p>
                  </div>

                  <div className="rounded-xl border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/30 p-4">
                    <p className="text-sm font-bold text-amber-800 dark:text-amber-300 mb-1">Missed RMD Penalty</p>
                    <p className="text-sm text-amber-700 dark:text-amber-400 leading-relaxed">
                      Failing to take your full RMD results in a 25% excise tax on the amount not withdrawn.
                      This is reduced to 10% if you correct the missed RMD within 2 years (the Correction Window).
                      RMDs must be taken by December 31 each year (except your first RMD, which can be delayed to April 1 of the following year).
                    </p>
                  </div>

                  <div className="rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-[#0f2744] p-4 overflow-x-auto">
                    <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                      Future RMD Projection ({growthRate}% annual growth)
                    </p>
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="text-gray-500 dark:text-gray-400">
                          <th className="text-left pb-2">Age</th>
                          <th className="text-right pb-2">Balance</th>
                          <th className="text-right pb-2">Factor</th>
                          <th className="text-right pb-2">RMD</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                        {projections.filter((_, i) => i === 0 || i % 2 === 0 || i === projections.length - 1).map(p => (
                          <tr key={p.age}>
                            <td className="py-1.5 font-medium text-gray-700 dark:text-gray-300">{p.age}</td>
                            <td className="py-1.5 text-right text-gray-600 dark:text-gray-400">{fmt(p.balance)}</td>
                            <td className="py-1.5 text-right text-gray-500 dark:text-gray-500">{p.factor}</td>
                            <td className="py-1.5 text-right text-[#0f4c75] dark:text-blue-300 font-medium">{fmt(p.rmd)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="rounded-xl border border-blue-100 dark:border-blue-900 bg-blue-50 dark:bg-blue-950/30 p-4">
                    <p className="text-sm font-bold text-blue-800 dark:text-blue-300 mb-1">SECURE Act 2.0 Update</p>
                    <p className="text-sm text-blue-700 dark:text-blue-400 leading-relaxed">
                      The SECURE Act 2.0 raised the RMD starting age to 73 in 2023 and will raise it to 75 in 2033.
                      If you turned 72 before January 1, 2023, your RMD age is 72. If you turn 72 in 2023 or later,
                      your RMD age is 73. Plan ahead — your RMD amount grows each year as life expectancy factors decrease.
                    </p>
                  </div>
                </>
              )}

              <AffiliateCTA headline="Plan your Medicare costs alongside your RMD strategy" />

              <p className="text-xs text-gray-400 dark:text-gray-500 leading-relaxed">
                RMD calculations use 2026 IRS Uniform Lifetime Table factors. For inherited IRAs, different tables apply. Consult a financial advisor or tax professional for personalized guidance. Not affiliated with Medicare or the US government.
              </p>
            </>
          ) : (
            <div className="rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-700 p-10 text-center">
              <div className="text-4xl mb-3">📊</div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Enter your age and account balance to calculate your 2026 Required Minimum Distribution.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
