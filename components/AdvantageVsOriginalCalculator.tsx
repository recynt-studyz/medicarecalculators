'use client'

import { useState, useEffect } from 'react'
import { STATE_LIST, getPartBPremium, MEDICARE_2026, fmtDec } from '@/lib/medicareData'
import AffiliateCTA from './AffiliateCTA'

const STORAGE_KEY = 'mc-advantage-vs-original'

const inputCls = 'w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-[#0f2744] text-gray-900 dark:text-[#e2e8f0] text-sm focus:outline-none focus:ring-2 focus:ring-[#0f4c75]'
const labelCls = 'block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'
const sectionCls = 'rounded-xl border border-gray-100 dark:border-gray-700 p-4 space-y-3'
const btnActive = 'bg-[#0f4c75] text-white'
const btnInactive = 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'

type Health = 'excellent' | 'good' | 'fair' | 'poor'
type Hospitalization = 'none' | 'one' | 'two'
type DoctorPref = 'flexible' | 'keep'
type Travel = 'local' | 'frequent'
type Rx = 'none' | 'generics' | 'brand'

export default function AdvantageVsOriginalCalculator({ defaultState }: { defaultState?: string }) {
  const [age, setAge] = useState('65')
  const [state, setState] = useState(defaultState ?? '')
  const [health, setHealth] = useState<Health>('good')
  const [visits, setVisits] = useState('6')
  const [hospital, setHospital] = useState<Hospitalization>('none')
  const [doctorPref, setDoctorPref] = useState<DoctorPref>('flexible')
  const [travel, setTravel] = useState<Travel>('local')
  const [rx, setRx] = useState<Rx>('generics')
  const [income, setIncome] = useState('85000')
  const [showResults, setShowResults] = useState(false)

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
      if (saved.age) setAge(saved.age)
      if (saved.state && !defaultState) setState(saved.state)
      if (saved.health) setHealth(saved.health)
      if (saved.visits) setVisits(saved.visits)
      if (saved.hospital) setHospital(saved.hospital)
      if (saved.doctorPref) setDoctorPref(saved.doctorPref)
      if (saved.travel) setTravel(saved.travel)
      if (saved.rx) setRx(saved.rx)
      if (saved.income) setIncome(saved.income)
    } catch { /* ignore */ }
  }, [defaultState])

  const save = (updates: Record<string, unknown>) => {
    try {
      const cur = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...cur, ...updates }))
    } catch { /* ignore */ }
  }

  const magi = parseFloat(income) || 0
  const { premium: partBPremium } = getPartBPremium(magi, 'single')

  // Original Medicare monthly estimate
  const medigapEst = 175 // Plan G at 65
  const partDEst = MEDICARE_2026.partD.avgPremium
  const originalTotal = partBPremium + medigapEst + partDEst

  // Medicare Advantage monthly estimate (use state avg if available)
  const stateData = STATE_LIST.find(s => s.abbr === state)
  const maAvgPremium = stateData ? stateData.avgMAPremium : MEDICARE_2026.partC.avgPremium
  const maTotal = partBPremium + maAvgPremium

  // Recommendation logic
  let recommendation: 'original' | 'advantage' = 'original'
  let reason = ''

  const score = { original: 0, advantage: 0 }
  if (doctorPref === 'keep') score.original += 3
  if (travel === 'frequent') score.original += 2
  if (health === 'excellent' || health === 'good') score.advantage += 1
  if (hospital === 'none') score.advantage += 1
  if (rx === 'none') score.advantage += 1
  if (doctorPref === 'flexible') score.advantage += 1

  if (score.original > score.advantage) {
    recommendation = 'original'
    reason = doctorPref === 'keep'
      ? 'you want to keep your current doctors (Original Medicare accepts any doctor nationwide)'
      : 'you travel frequently and need nationwide coverage without network restrictions'
  } else {
    recommendation = 'advantage'
    reason = `your health is ${health} and you may benefit from lower monthly premiums and extra benefits like dental and vision`
  }

  const healthVisitCost = parseInt(visits) * 20 // $20 copay est for MA

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className={sectionCls}>
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Your Situation</p>
            <div>
              <label className={labelCls}>Age</label>
              <input type="number" min="64" max="95" value={age}
                onChange={e => { setAge(e.target.value); save({ age: e.target.value }) }}
                className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>State</label>
              <select value={state} onChange={e => { setState(e.target.value); save({ state: e.target.value }) }} className={inputCls}>
                <option value="">Select state...</option>
                {STATE_LIST.map(s => <option key={s.abbr} value={s.abbr}>{s.name}</option>)}
              </select>
            </div>
            <div>
              <label className={labelCls}>Annual income (for IRMAA context)</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                <input type="number" min="0" value={income}
                  onChange={e => { setIncome(e.target.value); save({ income: e.target.value }) }}
                  className={`${inputCls} pl-7`} />
              </div>
            </div>
          </div>

          <div className={sectionCls}>
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Health & Usage</p>
            <div>
              <label className={labelCls}>Health status</label>
              <div className="grid grid-cols-2 gap-2">
                {(['excellent', 'good', 'fair', 'poor'] as Health[]).map(h => (
                  <button key={h} onClick={() => { setHealth(h); save({ health: h }) }}
                    className={`px-2 py-2 rounded-lg text-xs font-medium capitalize transition-colors ${health === h ? btnActive : btnInactive}`}>
                    {h}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className={labelCls}>Expected annual doctor visits: {visits}</label>
              <input type="range" min="0" max="30" value={visits}
                onChange={e => { setVisits(e.target.value); save({ visits: e.target.value }) }}
                className="w-full accent-[#0f4c75]" />
            </div>
            <div>
              <label className={labelCls}>Expected hospitalizations</label>
              <div className="grid grid-cols-3 gap-2">
                {([['none', 'None'], ['one', '1'], ['two', '2+']] as [Hospitalization, string][]).map(([val, label]) => (
                  <button key={val} onClick={() => { setHospital(val); save({ hospital: val }) }}
                    className={`px-2 py-2 rounded-lg text-xs font-medium transition-colors ${hospital === val ? btnActive : btnInactive}`}>
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className={sectionCls}>
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Preferences</p>
            <div>
              <label className={labelCls}>Preferred doctors</label>
              <div className="grid grid-cols-2 gap-2">
                {([
                  ['flexible', 'Flexible with doctors'],
                  ['keep', 'Must keep current doctors'],
                ] as [DoctorPref, string][]).map(([val, label]) => (
                  <button key={val} onClick={() => { setDoctorPref(val); save({ doctorPref: val }) }}
                    className={`px-2 py-2 rounded-lg text-xs font-medium transition-colors ${doctorPref === val ? btnActive : btnInactive}`}>
                    {label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className={labelCls}>Travel frequency</label>
              <div className="grid grid-cols-2 gap-2">
                {([['local', 'Stay mostly local'], ['frequent', 'Travel frequently']] as [Travel, string][]).map(([val, label]) => (
                  <button key={val} onClick={() => { setTravel(val); save({ travel: val }) }}
                    className={`px-2 py-2 rounded-lg text-xs font-medium transition-colors ${travel === val ? btnActive : btnInactive}`}>
                    {label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className={labelCls}>Prescription drugs</label>
              <div className="grid grid-cols-3 gap-2">
                {([['none', 'None'], ['generics', 'Generics'], ['brand', 'Brand name']] as [Rx, string][]).map(([val, label]) => (
                  <button key={val} onClick={() => { setRx(val); save({ rx: val }) }}
                    className={`px-2 py-2 rounded-lg text-xs font-medium transition-colors ${rx === val ? btnActive : btnInactive}`}>
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button onClick={() => setShowResults(true)}
            className="w-full py-3 rounded-xl bg-[#0f4c75] text-white font-bold text-sm hover:bg-[#1565a0] transition">
            Compare My Options
          </button>
        </div>

        <div className="space-y-4">
          {showResults || age ? (
            <>
              <div className="rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-[#0f2744] p-4">
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Side-by-Side Monthly Cost Comparison</p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900 p-3">
                    <p className="text-xs font-bold text-[#0f4c75] dark:text-blue-300 mb-2">Original Medicare</p>
                    <div className="space-y-1 text-xs text-gray-600 dark:text-gray-400">
                      <div className="flex justify-between"><span>Part B</span><span>{fmtDec(partBPremium)}</span></div>
                      <div className="flex justify-between"><span>Plan G Medigap</span><span>{fmtDec(medigapEst)}</span></div>
                      <div className="flex justify-between"><span>Part D (avg)</span><span>{fmtDec(partDEst)}</span></div>
                      <div className="flex justify-between font-bold text-gray-800 dark:text-white border-t border-blue-200 dark:border-blue-800 pt-1 mt-1">
                        <span>Total</span><span>{fmtDec(originalTotal)}/mo</span>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-lg bg-teal-50 dark:bg-teal-950/30 border border-teal-100 dark:border-teal-900 p-3">
                    <p className="text-xs font-bold text-teal-700 dark:text-teal-300 mb-2">Medicare Advantage</p>
                    <div className="space-y-1 text-xs text-gray-600 dark:text-gray-400">
                      <div className="flex justify-between"><span>Part B</span><span>{fmtDec(partBPremium)}</span></div>
                      <div className="flex justify-between"><span>MA premium{stateData ? ` (${stateData.name} avg)` : ' (avg)'}</span><span>{fmtDec(maAvgPremium)}</span></div>
                      <div className="flex justify-between text-teal-600 dark:text-teal-400"><span>Part D (usually incl.)</span><span>$0</span></div>
                      <div className="flex justify-between font-bold text-gray-800 dark:text-white border-t border-teal-200 dark:border-teal-800 pt-1 mt-1">
                        <span>Total</span><span>{fmtDec(maTotal)}/mo</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-3 text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Monthly savings with MA: <span className={`font-bold ${originalTotal - maTotal > 0 ? 'text-green-600 dark:text-green-400' : 'text-gray-800 dark:text-white'}`}>
                      {fmtDec(Math.abs(originalTotal - maTotal))}/mo
                      {originalTotal - maTotal > 0 ? ' less' : ' more'}
                    </span>
                  </p>
                </div>
              </div>

              <div className="rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-[#0f2744] p-4">
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Key Differences</p>
                <div className="space-y-2 text-xs">
                  {[
                    { label: 'Any doctor nationwide', original: true, advantage: false, note: 'MA uses networks; referrals may be required' },
                    { label: 'No referrals needed', original: true, advantage: false, note: 'MA often requires prior authorization' },
                    { label: 'Predictable costs (with Medigap)', original: true, advantage: false, note: 'MA has copays that vary by service' },
                    { label: 'Lower/zero premiums', original: false, advantage: true, note: 'Some MA plans have $0 premium' },
                    { label: 'Extra benefits (dental, vision)', original: false, advantage: true, note: 'Most MA plans include extras Original lacks' },
                    { label: 'Out-of-pocket maximum ($9,350 max)', original: false, advantage: true, note: 'Original Medicare has no OOP cap without Medigap' },
                    { label: 'International coverage', original: true, advantage: false, note: 'MA coverage is limited outside the US' },
                  ].map(({ label, original, advantage, note }) => (
                    <div key={label} className="flex items-start gap-2">
                      <span className={`mt-0.5 shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${original && !advantage ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300' : !original && advantage ? 'bg-teal-100 dark:bg-teal-900 text-teal-700 dark:text-teal-300' : 'bg-gray-100 dark:bg-gray-700 text-gray-500'}`}>
                        {original && !advantage ? 'O' : !original && advantage ? 'A' : '~'}
                      </span>
                      <div>
                        <span className="text-gray-800 dark:text-gray-200 font-medium">{label}</span>
                        <span className="text-gray-400 dark:text-gray-500 ml-1">— {note}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className={`rounded-xl p-4 border ${recommendation === 'original' ? 'bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800' : 'bg-teal-50 dark:bg-teal-950/30 border-teal-200 dark:border-teal-800'}`}>
                <p className={`text-sm font-bold mb-1 ${recommendation === 'original' ? 'text-blue-800 dark:text-blue-300' : 'text-teal-800 dark:text-teal-300'}`}>
                  Recommendation: {recommendation === 'original' ? 'Original Medicare with Medigap' : 'Medicare Advantage'}
                </p>
                <p className={`text-sm leading-relaxed ${recommendation === 'original' ? 'text-blue-700 dark:text-blue-400' : 'text-teal-700 dark:text-teal-400'}`}>
                  Based on your inputs, {recommendation === 'original' ? 'Original Medicare with a Plan G Medigap supplement' : 'Medicare Advantage'} may better fit your situation because {reason}.
                  A licensed Medicare advisor can compare specific plans available in your area.
                </p>
              </div>

              <AffiliateCTA headline="Compare Medicare Advantage plans in your area — free" />

              <p className="text-xs text-gray-400 dark:text-gray-500 leading-relaxed">
                Estimates based on 2026 national averages. Actual plan costs vary by location, carrier, and individual health. Contact Medicare at 1-800-MEDICARE or medicare.gov for official plan comparison. Not affiliated with Medicare or the US government.
              </p>
            </>
          ) : (
            <div className="rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-700 p-10 text-center">
              <div className="text-4xl mb-3">⚖️</div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Enter your information and preferences to compare Original Medicare vs Medicare Advantage.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
