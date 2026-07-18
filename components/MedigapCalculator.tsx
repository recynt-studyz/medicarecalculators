'use client'

import { useState, useEffect } from 'react'
import { STATE_LIST, STATES, MEDICARE_2026, fmtDec } from '@/lib/medicareData'
import AffiliateCTA from './AffiliateCTA'

const STORAGE_KEY = 'mc-medigap'

const inputCls = 'w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-[#0f2744] text-gray-900 dark:text-[#e2e8f0] text-sm focus:outline-none focus:ring-2 focus:ring-[#0f4c75]'
const labelCls = 'block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'
const sectionCls = 'rounded-xl border border-gray-100 dark:border-gray-700 p-4 space-y-3'
const btnActive = 'bg-[#0f4c75] text-white'
const btnInactive = 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'

type Gender = 'male' | 'female'
type Health = 'excellent' | 'good' | 'fair'
type PlanPref = 'help' | 'G' | 'N' | 'A' | 'F'

// Age-based premium adjustment (rough estimate)
function ageAdjust(basePremium: number, age: number, communityRated: boolean): number {
  if (communityRated) return basePremium // Same regardless of age
  const ageAdj = 1 + Math.max(0, (age - 65)) * 0.03
  return basePremium * ageAdj
}

// Tobacco adjustment
function tobaccoAdjust(premium: number, tobacco: boolean): number {
  return tobacco ? premium * 1.1 : premium
}

export default function MedigapCalculator({ defaultState }: { defaultState?: string }) {
  const [age, setAge] = useState('65')
  const [state, setState] = useState(defaultState ?? '')
  const [gender, setGender] = useState<Gender>('female')
  const [tobacco, setTobacco] = useState(false)
  const [health, setHealth] = useState<Health>('excellent')
  const [planPref, setPlanPref] = useState<PlanPref>('help')
  const [showResults, setShowResults] = useState(false)

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
      if (saved.age) setAge(saved.age)
      if (saved.state && !defaultState) setState(saved.state)
      if (saved.gender) setGender(saved.gender)
      if (saved.tobacco !== undefined) setTobacco(saved.tobacco)
      if (saved.health) setHealth(saved.health)
      if (saved.planPref) setPlanPref(saved.planPref)
    } catch { /* ignore */ }
  }, [defaultState])

  const save = (updates: Record<string, unknown>) => {
    try {
      const cur = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...cur, ...updates }))
    } catch { /* ignore */ }
  }

  const ageNum = parseInt(age) || 65
  const stateData = state ? STATES[state] : null
  const communityRated = stateData?.medigapCommunityRated ?? false

  const plans = [
    {
      name: 'Plan G',
      key: 'G',
      popular: true,
      premiumLow: tobaccoAdjust(ageAdjust(MEDICARE_2026.medigap.planG.low, ageNum, communityRated), tobacco),
      premiumHigh: tobaccoAdjust(ageAdjust(MEDICARE_2026.medigap.planG.high, ageNum, communityRated), tobacco),
      covers: [
        'Part A hospital coinsurance & hospital costs',
        'Part B coinsurance (20% of Medicare-approved costs)',
        'Part A deductible ($1,676 per benefit period)',
        'Part B excess charges',
        'Foreign travel emergency (80%)',
        'Skilled nursing facility coinsurance (days 21–100)',
      ],
      doesNotCover: ['Part B deductible ($257/year)'],
      bestFor: 'Maximum coverage. Ideal for frequent healthcare users who want predictable costs.',
      copays: 'No copays',
    },
    {
      name: 'Plan N',
      key: 'N',
      popular: false,
      premiumLow: tobaccoAdjust(ageAdjust(MEDICARE_2026.medigap.planN.low, ageNum, communityRated), tobacco),
      premiumHigh: tobaccoAdjust(ageAdjust(MEDICARE_2026.medigap.planN.high, ageNum, communityRated), tobacco),
      covers: [
        'Part A hospital coinsurance & hospital costs',
        'Part B coinsurance (20%) — with copays',
        'Part A deductible ($1,676)',
        'Foreign travel emergency (80%)',
        'Skilled nursing facility coinsurance (days 21–100)',
      ],
      doesNotCover: ['Part B deductible ($257/year)', 'Part B excess charges'],
      bestFor: 'Balance of coverage and lower premiums. Good for healthy seniors with few doctor visits.',
      copays: 'Up to $20 office visit, $50 ER visit',
    },
    {
      name: 'Plan A',
      key: 'A',
      popular: false,
      premiumLow: tobaccoAdjust(ageAdjust(MEDICARE_2026.medigap.planA.low, ageNum, communityRated), tobacco),
      premiumHigh: tobaccoAdjust(ageAdjust(MEDICARE_2026.medigap.planA.high, ageNum, communityRated), tobacco),
      covers: [
        'Part A hospital coinsurance & hospital costs (365 additional days)',
        'Part B coinsurance (20%)',
        'First 3 pints of blood',
        'Part A hospice care coinsurance',
      ],
      doesNotCover: ['Part A deductible ($1,676)', 'Part B deductible ($257)', 'Skilled nursing facility', 'Part B excess charges', 'Foreign travel'],
      bestFor: 'Basic coverage at the lowest premium. May not cover hospitalization costs fully.',
      copays: 'No copays',
    },
  ]

  const recommendedPlan = planPref === 'help'
    ? (health === 'fair' ? plans[0] : plans[1])
    : plans.find(p => p.key === planPref) ?? plans[0]

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className={sectionCls}>
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">About You</p>
            <div>
              <label className={labelCls}>Age</label>
              <input type="number" min="65" max="95" value={age}
                onChange={e => { setAge(e.target.value); save({ age: e.target.value }) }}
                className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>State</label>
              <select value={state} onChange={e => { setState(e.target.value); save({ state: e.target.value }) }} className={inputCls}>
                <option value="">Select state...</option>
                {STATE_LIST.map(s => <option key={s.abbr} value={s.abbr}>{s.name}</option>)}
              </select>
              {communityRated && (
                <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                  {stateData?.name} uses community rating — Medigap premiums are the same regardless of age.
                </p>
              )}
            </div>
            <div>
              <label className={labelCls}>Gender</label>
              <div className="grid grid-cols-2 gap-2">
                {([['male', 'Male'], ['female', 'Female']] as [Gender, string][]).map(([val, label]) => (
                  <button key={val} onClick={() => { setGender(val); save({ gender: val }) }}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${gender === val ? btnActive : btnInactive}`}>
                    {label}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="tobacco" checked={tobacco}
                onChange={e => { setTobacco(e.target.checked); save({ tobacco: e.target.checked }) }}
                className="rounded border-gray-300 dark:border-gray-600 w-4 h-4 accent-[#0f4c75]" />
              <label htmlFor="tobacco" className="text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
                Tobacco user (may increase premium ~10%)
              </label>
            </div>
            <div>
              <label className={labelCls}>Health status</label>
              <div className="grid grid-cols-3 gap-2">
                {(['excellent', 'good', 'fair'] as Health[]).map(h => (
                  <button key={h} onClick={() => { setHealth(h); save({ health: h }) }}
                    className={`px-2 py-2 rounded-lg text-xs font-medium capitalize transition-colors ${health === h ? btnActive : btnInactive}`}>
                    {h}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className={sectionCls}>
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Plan Preference</p>
            <div className="grid grid-cols-2 gap-2">
              {([
                ['help', 'Help me choose'],
                ['G', 'Plan G'],
                ['N', 'Plan N'],
                ['A', 'Plan A'],
                ['F', 'Plan F (grandfathered)'],
              ] as [PlanPref, string][]).map(([val, label]) => (
                <button key={val} onClick={() => { setPlanPref(val); save({ planPref: val }) }}
                  className={`px-2 py-2 rounded-lg text-xs font-medium transition-colors ${planPref === val ? btnActive : btnInactive}`}>
                  {label}
                </button>
              ))}
            </div>
            {planPref === 'F' && (
              <p className="text-xs text-amber-600 dark:text-amber-400">
                Plan F is only available to those who became eligible for Medicare before January 1, 2020.
              </p>
            )}
          </div>

          <button onClick={() => setShowResults(true)}
            className="w-full py-3 rounded-xl bg-[#0f4c75] text-white font-bold text-sm hover:bg-[#1565a0] transition">
            Compare Medigap Plans
          </button>
        </div>

        <div className="space-y-4">
          {showResults || ageNum >= 65 ? (
            <>
              <div className="rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-[#0f2744] p-4">
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Estimated Monthly Premiums (Age {age})</p>
                <div className="space-y-3">
                  {plans.map(plan => (
                    <div key={plan.key} className={`rounded-lg p-3 border ${plan.key === recommendedPlan.key && planPref === 'help' ? 'border-[#0f4c75] bg-[#0f4c75]/5 dark:bg-[#0f4c75]/20' : 'border-gray-100 dark:border-gray-700'}`}>
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-sm font-bold text-gray-900 dark:text-white">{plan.name}</span>
                          {plan.popular && <span className="ml-2 text-xs bg-[#0f4c75] text-white px-2 py-0.5 rounded-full">Most Popular</span>}
                          {plan.key === recommendedPlan.key && planPref === 'help' && (
                            <span className="ml-2 text-xs bg-green-600 text-white px-2 py-0.5 rounded-full">Recommended</span>
                          )}
                        </div>
                        <span className="text-sm font-bold text-[#0f4c75] dark:text-blue-300">
                          {fmtDec(plan.premiumLow)}–{fmtDec(plan.premiumHigh)}/mo
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{plan.copays}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 italic">{plan.bestFor}</p>
                    </div>
                  ))}
                </div>
              </div>

              {recommendedPlan && (
                <div className="rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-[#0f2744] p-4">
                  <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {recommendedPlan.name} Coverage Details
                  </p>
                  <div className="mb-2">
                    <p className="text-xs font-medium text-green-700 dark:text-green-400 mb-1">Covers:</p>
                    <ul className="space-y-0.5">
                      {recommendedPlan.covers.map(c => (
                        <li key={c} className="text-xs text-gray-600 dark:text-gray-400 flex gap-1.5">
                          <span className="text-green-500 shrink-0">✓</span>{c}
                        </li>
                      ))}
                    </ul>
                  </div>
                  {recommendedPlan.doesNotCover.length > 0 && (
                    <div>
                      <p className="text-xs font-medium text-red-600 dark:text-red-400 mb-1">Does NOT cover:</p>
                      <ul className="space-y-0.5">
                        {recommendedPlan.doesNotCover.map(c => (
                          <li key={c} className="text-xs text-gray-600 dark:text-gray-400 flex gap-1.5">
                            <span className="text-red-400 shrink-0">✗</span>{c}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              <div className="rounded-xl border border-blue-100 dark:border-blue-900 bg-blue-50 dark:bg-blue-950/30 p-4">
                <p className="text-sm font-bold text-blue-800 dark:text-blue-300 mb-1">Medigap Open Enrollment Window</p>
                <p className="text-sm text-blue-700 dark:text-blue-400 leading-relaxed">
                  You have 6 months from your Part B effective date to buy any Medigap plan regardless of health status — no medical underwriting allowed.
                  After this window, insurers can use medical underwriting in most states
                  {communityRated ? ` (except in ${stateData?.name}, which requires guaranteed issue year-round)` : ''}.
                  Buy during open enrollment for the best rates and guaranteed acceptance.
                </p>
              </div>

              <AffiliateCTA headline="Get Medigap plan quotes in your area — free" />

              <p className="text-xs text-gray-400 dark:text-gray-500 leading-relaxed">
                Premium estimates based on 2026 national averages. Actual premiums vary by insurer, state, age, and health status. Consult a licensed Medicare advisor for accurate quotes. Not affiliated with Medicare or the US government.
              </p>
            </>
          ) : (
            <div className="rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-700 p-10 text-center">
              <div className="text-4xl mb-3">🛡️</div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Enter your information to compare Medigap supplement plan options and estimated premiums.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
