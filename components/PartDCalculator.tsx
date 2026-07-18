'use client'

import { useState, useEffect } from 'react'
import { MEDICARE_2026, fmtDec, fmt } from '@/lib/medicareData'
import AffiliateCTA from './AffiliateCTA'

const STORAGE_KEY = 'mc-partd'

const inputCls = 'w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-[#0f2744] text-gray-900 dark:text-[#e2e8f0] text-sm focus:outline-none focus:ring-2 focus:ring-[#0f4c75]'
const labelCls = 'block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'
const sectionCls = 'rounded-xl border border-gray-100 dark:border-gray-700 p-4 space-y-3'
const btnActive = 'bg-[#0f4c75] text-white'
const btnInactive = 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'

const TIERS = [
  { id: 't1', label: 'Tier 1 — Preferred generics', copayLow: 4, copayHigh: 10, copayAvg: 7 },
  { id: 't2', label: 'Tier 2 — Generics', copayLow: 10, copayHigh: 20, copayAvg: 15 },
  { id: 't3', label: 'Tier 3 — Preferred brand', copayLow: 40, copayHigh: 50, copayAvg: 45 },
  { id: 't4', label: 'Tier 4 — Non-preferred brand', copayLow: 90, copayHigh: 100, copayAvg: 95 },
  { id: 't5', label: 'Tier 5 — Specialty', copayLow: 200, copayHigh: 400, copayAvg: 300 },
]

type FilingStatus = 'single' | 'couple'

interface DrugEntry {
  tier: string
  qty: number
}

export default function PartDCalculator() {
  const [income, setIncome] = useState('22000')
  const [filing, setFiling] = useState<FilingStatus>('single')
  const [premium, setPremium] = useState(String(MEDICARE_2026.partD.avgPremium))
  const [drugs, setDrugs] = useState<DrugEntry[]>([
    { tier: 't1', qty: 1 },
    { tier: 't2', qty: 1 },
    { tier: 't3', qty: 1 },
  ])
  const [showResults, setShowResults] = useState(false)

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
      if (saved.income) setIncome(saved.income)
      if (saved.filing) setFiling(saved.filing)
      if (saved.premium) setPremium(saved.premium)
      if (saved.drugs) setDrugs(saved.drugs)
    } catch { /* ignore */ }
  }, [])

  const save = (updates: Record<string, unknown>) => {
    try {
      const cur = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...cur, ...updates }))
    } catch { /* ignore */ }
  }

  const annualIncome = parseFloat(income) || 0
  const monthlyPremium = parseFloat(premium) || 0
  const annualPremium = monthlyPremium * 12
  const annualDeductible = MEDICARE_2026.partD.deductibleMax

  const annualDrugCopays = drugs.reduce((sum, d) => {
    const tier = TIERS.find(t => t.id === d.tier)
    return sum + (tier ? tier.copayAvg * d.qty * 12 : 0)
  }, 0)

  const totalAnnual = annualPremium + annualDeductible + Math.max(0, annualDrugCopays)
  const oopCap = MEDICARE_2026.partD.oopCap

  // Extra Help eligibility
  const threshold = filing === 'single' ? MEDICARE_2026.partD.extraHelpIndividual : MEDICARE_2026.partD.extraHelpCouple
  const qualifiesExtraHelp = annualIncome <= threshold

  const updateDrug = (i: number, field: keyof DrugEntry, value: string | number) => {
    const updated = drugs.map((d, idx) => idx === i ? { ...d, [field]: value } : d)
    setDrugs(updated)
    save({ drugs: updated })
  }

  const addDrug = () => {
    const updated = [...drugs, { tier: 't1', qty: 1 }]
    setDrugs(updated)
    save({ drugs: updated })
  }

  const removeDrug = (i: number) => {
    const updated = drugs.filter((_, idx) => idx !== i)
    setDrugs(updated)
    save({ drugs: updated })
  }

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className={sectionCls}>
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Income & Extra Help</p>
            <div>
              <label className={labelCls}>Annual income</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                <input type="number" min="0" value={income}
                  onChange={e => { setIncome(e.target.value); save({ income: e.target.value }) }}
                  className={`${inputCls} pl-7`} />
              </div>
            </div>
            <div>
              <label className={labelCls}>Household</label>
              <div className="grid grid-cols-2 gap-2">
                {([['single', 'Individual'], ['couple', 'Couple']] as [FilingStatus, string][]).map(([val, label]) => (
                  <button key={val} onClick={() => { setFiling(val); save({ filing: val }) }}
                    className={`px-2 py-2 rounded-lg text-xs font-medium transition-colors ${filing === val ? btnActive : btnInactive}`}>
                    {label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className={labelCls}>Current monthly premium</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                <input type="number" min="0" step="0.01" value={premium}
                  onChange={e => { setPremium(e.target.value); save({ premium: e.target.value }) }}
                  className={`${inputCls} pl-7`} />
              </div>
              <p className="text-xs text-gray-400 mt-1">2026 national average: $46.50/month</p>
            </div>
          </div>

          <div className={sectionCls}>
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Your Prescriptions</p>
              <button onClick={addDrug} className="text-xs text-[#0f4c75] dark:text-blue-300 hover:underline">+ Add drug</button>
            </div>
            {drugs.map((drug, i) => (
              <div key={i} className="rounded-lg bg-gray-50 dark:bg-gray-800 p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-gray-600 dark:text-gray-400">Prescription {i + 1}</span>
                  {drugs.length > 1 && (
                    <button onClick={() => removeDrug(i)} className="text-xs text-red-500 hover:underline">Remove</button>
                  )}
                </div>
                <div>
                  <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">Drug tier</label>
                  <select value={drug.tier} onChange={e => updateDrug(i, 'tier', e.target.value)} className={inputCls}>
                    {TIERS.map(t => <option key={t.id} value={t.id}>{t.label} (~${t.copayAvg}/mo)</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">Fills per month: {drug.qty}</label>
                  <input type="range" min="1" max="5" value={drug.qty}
                    onChange={e => updateDrug(i, 'qty', parseInt(e.target.value))}
                    className="w-full accent-[#0f4c75]" />
                </div>
              </div>
            ))}
          </div>

          <button onClick={() => setShowResults(true)}
            className="w-full py-3 rounded-xl bg-[#0f4c75] text-white font-bold text-sm hover:bg-[#1565a0] transition">
            Calculate Part D Costs
          </button>
        </div>

        <div className="space-y-4">
          {showResults || annualIncome > 0 ? (
            <>
              {qualifiesExtraHelp && (
                <div className="rounded-xl border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/30 p-4">
                  <p className="text-sm font-bold text-green-800 dark:text-green-300 mb-1">You May Qualify for Extra Help!</p>
                  <p className="text-sm text-green-700 dark:text-green-400 leading-relaxed">
                    Your income of {fmt(annualIncome)} is at or below the {filing === 'single' ? 'individual' : 'couple'} Extra Help threshold of {fmt(threshold)}.
                    Extra Help (Low Income Subsidy) could reduce your Part D costs to near $0. Contact Social Security at 1-800-772-1213 to apply.
                  </p>
                </div>
              )}

              <div className="rounded-xl bg-[#0f4c75]/10 dark:bg-[#0f4c75]/30 border border-[#0f4c75]/30 p-5">
                <p className="text-sm text-[#0f4c75] dark:text-blue-300 font-medium mb-1">Estimated Annual Part D Costs</p>
                <p className="text-4xl font-bold text-[#0f4c75] dark:text-white">{fmt(Math.min(totalAnnual, annualPremium + oopCap))}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {fmtDec(Math.min(totalAnnual, annualPremium + oopCap) / 12)}/month average
                </p>
              </div>

              <div className="rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-[#0f2744] p-4">
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Annual Cost Breakdown</p>
                <div className="space-y-2">
                  {[
                    { label: 'Annual premium', val: annualPremium },
                    { label: 'Estimated annual deductible', val: annualDeductible },
                    { label: 'Estimated drug copays', val: annualDrugCopays },
                    { label: 'Total before OOP cap', val: totalAnnual, bold: true },
                    { label: `2026 out-of-pocket cap`, val: oopCap, highlight: true },
                  ].map(({ label, val, bold, highlight }) => (
                    <div key={label} className={`flex justify-between text-sm ${bold ? 'border-t border-gray-100 dark:border-gray-600 pt-2 mt-1' : ''}`}>
                      <span className={bold ? 'font-semibold text-gray-800 dark:text-[#e2e8f0]' : highlight ? 'text-green-700 dark:text-green-400 font-medium' : 'text-gray-600 dark:text-gray-400'}>{label}</span>
                      <span className={`font-medium ${bold ? 'text-[#0f4c75] dark:text-blue-300' : highlight ? 'text-green-700 dark:text-green-400' : 'text-gray-800 dark:text-[#e2e8f0]'}`}>
                        {fmt(val)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-blue-100 dark:border-blue-900 bg-blue-50 dark:bg-blue-950/30 p-4">
                <p className="text-sm font-bold text-blue-800 dark:text-blue-300 mb-1">2026 Out-of-Pocket Cap (New!)</p>
                <p className="text-sm text-blue-700 dark:text-blue-400 leading-relaxed">
                  Under 2026 rules, once you spend $2,000 out of pocket on covered drugs, you pay $0 for the rest of the year.
                  This catastrophic coverage threshold is new for 2026 — previously there was no annual out-of-pocket cap for Part D.
                  This is a significant benefit for Medicare beneficiaries with high drug costs.
                </p>
              </div>

              <AffiliateCTA headline="Compare Part D drug plans in your area" />

              <p className="text-xs text-gray-400 dark:text-gray-500 leading-relaxed">
                Estimates based on 2026 Part D data. Actual costs vary by specific plan, pharmacy, and drug formulary. Contact Medicare at 1-800-MEDICARE for official plan comparisons. Not affiliated with Medicare or the US government.
              </p>
            </>
          ) : (
            <div className="rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-700 p-10 text-center">
              <div className="text-4xl mb-3">💊</div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Enter your income and prescriptions to estimate your 2026 Part D drug costs.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
