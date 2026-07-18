export interface StateData {
  name: string
  slug: string
  abbr: string
  maPlans: number
  avgMAPremium: number
  medigapCommunityRated: boolean
  shipName: string
  shipPhone: string
}

export const STATES: Record<string, StateData> = {
  AL: { name: 'Alabama', slug: 'alabama', abbr: 'AL', maPlans: 42, avgMAPremium: 14, medigapCommunityRated: false, shipName: 'SHIP (CARES)', shipPhone: '1-800-243-5463' },
  AK: { name: 'Alaska', slug: 'alaska', abbr: 'AK', maPlans: 9, avgMAPremium: 28, medigapCommunityRated: false, shipName: 'SeniorCare Alaska', shipPhone: '1-907-276-1059' },
  AZ: { name: 'Arizona', slug: 'arizona', abbr: 'AZ', maPlans: 67, avgMAPremium: 12, medigapCommunityRated: false, shipName: 'Arizona SHIP', shipPhone: '1-800-432-4040' },
  AR: { name: 'Arkansas', slug: 'arkansas', abbr: 'AR', maPlans: 31, avgMAPremium: 16, medigapCommunityRated: false, shipName: 'Arkansas SHIIP', shipPhone: '1-800-224-6330' },
  CA: { name: 'California', slug: 'california', abbr: 'CA', maPlans: 118, avgMAPremium: 9, medigapCommunityRated: false, shipName: 'HICAP', shipPhone: '1-800-434-0222' },
  CO: { name: 'Colorado', slug: 'colorado', abbr: 'CO', maPlans: 57, avgMAPremium: 11, medigapCommunityRated: false, shipName: 'Colorado SHIP', shipPhone: '1-888-696-7213' },
  CT: { name: 'Connecticut', slug: 'connecticut', abbr: 'CT', maPlans: 36, avgMAPremium: 22, medigapCommunityRated: true, shipName: 'Connecticut SHIP', shipPhone: '1-800-994-9422' },
  DE: { name: 'Delaware', slug: 'delaware', abbr: 'DE', maPlans: 21, avgMAPremium: 19, medigapCommunityRated: false, shipName: 'Delaware SHIP', shipPhone: '1-800-336-9500' },
  FL: { name: 'Florida', slug: 'florida', abbr: 'FL', maPlans: 133, avgMAPremium: 8, medigapCommunityRated: false, shipName: 'Florida SHIP', shipPhone: '1-800-963-5337' },
  GA: { name: 'Georgia', slug: 'georgia', abbr: 'GA', maPlans: 62, avgMAPremium: 13, medigapCommunityRated: false, shipName: 'GeorgiaCares SHIP', shipPhone: '1-866-552-4464' },
  HI: { name: 'Hawaii', slug: 'hawaii', abbr: 'HI', maPlans: 19, avgMAPremium: 0, medigapCommunityRated: false, shipName: 'SAGE PLUS', shipPhone: '1-808-586-0100' },
  ID: { name: 'Idaho', slug: 'idaho', abbr: 'ID', maPlans: 26, avgMAPremium: 15, medigapCommunityRated: false, shipName: 'Idaho SHIBA', shipPhone: '1-800-247-4422' },
  IL: { name: 'Illinois', slug: 'illinois', abbr: 'IL', maPlans: 72, avgMAPremium: 10, medigapCommunityRated: false, shipName: 'Illinois SHIP', shipPhone: '1-800-548-9034' },
  IN: { name: 'Indiana', slug: 'indiana', abbr: 'IN', maPlans: 52, avgMAPremium: 11, medigapCommunityRated: false, shipName: 'SHIP Indiana', shipPhone: '1-800-452-4800' },
  IA: { name: 'Iowa', slug: 'iowa', abbr: 'IA', maPlans: 31, avgMAPremium: 16, medigapCommunityRated: false, shipName: 'Iowa SHIIP', shipPhone: '1-800-351-4664' },
  KS: { name: 'Kansas', slug: 'kansas', abbr: 'KS', maPlans: 29, avgMAPremium: 17, medigapCommunityRated: false, shipName: 'Kansas SHICK', shipPhone: '1-800-860-5260' },
  KY: { name: 'Kentucky', slug: 'kentucky', abbr: 'KY', maPlans: 46, avgMAPremium: 12, medigapCommunityRated: false, shipName: 'SHIP Kentucky', shipPhone: '1-877-293-7447' },
  LA: { name: 'Louisiana', slug: 'louisiana', abbr: 'LA', maPlans: 41, avgMAPremium: 13, medigapCommunityRated: false, shipName: 'Louisiana SHIP', shipPhone: '1-800-259-5301' },
  ME: { name: 'Maine', slug: 'maine', abbr: 'ME', maPlans: 16, avgMAPremium: 24, medigapCommunityRated: true, shipName: 'Maine SHIP', shipPhone: '1-877-353-3771' },
  MD: { name: 'Maryland', slug: 'maryland', abbr: 'MD', maPlans: 41, avgMAPremium: 18, medigapCommunityRated: false, shipName: 'Maryland SHIP', shipPhone: '1-410-767-1100' },
  MA: { name: 'Massachusetts', slug: 'massachusetts', abbr: 'MA', maPlans: 31, avgMAPremium: 25, medigapCommunityRated: true, shipName: 'SHINE Program', shipPhone: '1-800-243-4636' },
  MI: { name: 'Michigan', slug: 'michigan', abbr: 'MI', maPlans: 56, avgMAPremium: 9, medigapCommunityRated: false, shipName: 'Michigan SHIP', shipPhone: '1-800-803-7174' },
  MN: { name: 'Minnesota', slug: 'minnesota', abbr: 'MN', maPlans: 41, avgMAPremium: 21, medigapCommunityRated: true, shipName: 'Minnesota SHIP', shipPhone: '1-800-333-2433' },
  MS: { name: 'Mississippi', slug: 'mississippi', abbr: 'MS', maPlans: 31, avgMAPremium: 15, medigapCommunityRated: false, shipName: 'Mississippi SHIP', shipPhone: '1-800-948-3090' },
  MO: { name: 'Missouri', slug: 'missouri', abbr: 'MO', maPlans: 56, avgMAPremium: 11, medigapCommunityRated: false, shipName: 'Missouri SHIP', shipPhone: '1-800-390-3330' },
  MT: { name: 'Montana', slug: 'montana', abbr: 'MT', maPlans: 13, avgMAPremium: 18, medigapCommunityRated: false, shipName: 'Montana SHIP', shipPhone: '1-800-551-3191' },
  NE: { name: 'Nebraska', slug: 'nebraska', abbr: 'NE', maPlans: 23, avgMAPremium: 18, medigapCommunityRated: false, shipName: 'Nebraska SHIP', shipPhone: '1-800-234-7119' },
  NV: { name: 'Nevada', slug: 'nevada', abbr: 'NV', maPlans: 36, avgMAPremium: 10, medigapCommunityRated: false, shipName: 'Nevada SHIP', shipPhone: '1-800-307-4444' },
  NH: { name: 'New Hampshire', slug: 'new-hampshire', abbr: 'NH', maPlans: 19, avgMAPremium: 22, medigapCommunityRated: false, shipName: 'NH SHIP', shipPhone: '1-800-852-3388' },
  NJ: { name: 'New Jersey', slug: 'new-jersey', abbr: 'NJ', maPlans: 56, avgMAPremium: 16, medigapCommunityRated: false, shipName: 'SHIP New Jersey', shipPhone: '1-800-792-8820' },
  NM: { name: 'New Mexico', slug: 'new-mexico', abbr: 'NM', maPlans: 26, avgMAPremium: 11, medigapCommunityRated: false, shipName: 'New Mexico SHIP', shipPhone: '1-800-432-2080' },
  NY: { name: 'New York', slug: 'new-york', abbr: 'NY', maPlans: 82, avgMAPremium: 28, medigapCommunityRated: true, shipName: 'NY HIICAP', shipPhone: '1-800-701-0501' },
  NC: { name: 'North Carolina', slug: 'north-carolina', abbr: 'NC', maPlans: 62, avgMAPremium: 13, medigapCommunityRated: false, shipName: 'NC SHIIP', shipPhone: '1-855-408-1212' },
  ND: { name: 'North Dakota', slug: 'north-dakota', abbr: 'ND', maPlans: 11, avgMAPremium: 20, medigapCommunityRated: false, shipName: 'ND SHIC', shipPhone: '1-888-575-6611' },
  OH: { name: 'Ohio', slug: 'ohio', abbr: 'OH', maPlans: 72, avgMAPremium: 9, medigapCommunityRated: false, shipName: 'Ohio OSHIIP', shipPhone: '1-800-686-1578' },
  OK: { name: 'Oklahoma', slug: 'oklahoma', abbr: 'OK', maPlans: 36, avgMAPremium: 14, medigapCommunityRated: false, shipName: 'Oklahoma SHIP', shipPhone: '1-800-763-2828' },
  OR: { name: 'Oregon', slug: 'oregon', abbr: 'OR', maPlans: 41, avgMAPremium: 8, medigapCommunityRated: false, shipName: 'Oregon SHIBA', shipPhone: '1-800-722-4134' },
  PA: { name: 'Pennsylvania', slug: 'pennsylvania', abbr: 'PA', maPlans: 87, avgMAPremium: 11, medigapCommunityRated: false, shipName: 'PA APPRISE', shipPhone: '1-800-783-7067' },
  RI: { name: 'Rhode Island', slug: 'rhode-island', abbr: 'RI', maPlans: 19, avgMAPremium: 19, medigapCommunityRated: false, shipName: 'RI SHIP', shipPhone: '1-401-462-4000' },
  SC: { name: 'South Carolina', slug: 'south-carolina', abbr: 'SC', maPlans: 46, avgMAPremium: 12, medigapCommunityRated: false, shipName: 'SC SHIP', shipPhone: '1-800-868-9095' },
  SD: { name: 'South Dakota', slug: 'south-dakota', abbr: 'SD', maPlans: 13, avgMAPremium: 19, medigapCommunityRated: false, shipName: 'South Dakota SHIP', shipPhone: '1-605-773-3656' },
  TN: { name: 'Tennessee', slug: 'tennessee', abbr: 'TN', maPlans: 56, avgMAPremium: 10, medigapCommunityRated: false, shipName: 'Tennessee SHIP', shipPhone: '1-877-801-0044' },
  TX: { name: 'Texas', slug: 'texas', abbr: 'TX', maPlans: 113, avgMAPremium: 10, medigapCommunityRated: false, shipName: 'Texas SHIP', shipPhone: '1-800-252-9240' },
  UT: { name: 'Utah', slug: 'utah', abbr: 'UT', maPlans: 31, avgMAPremium: 13, medigapCommunityRated: false, shipName: 'Utah SHIP', shipPhone: '1-800-541-7735' },
  VT: { name: 'Vermont', slug: 'vermont', abbr: 'VT', maPlans: 9, avgMAPremium: 26, medigapCommunityRated: true, shipName: 'Vermont SHIP', shipPhone: '1-800-642-5119' },
  VA: { name: 'Virginia', slug: 'virginia', abbr: 'VA', maPlans: 62, avgMAPremium: 12, medigapCommunityRated: false, shipName: 'Virginia SHIP', shipPhone: '1-800-552-3402' },
  WA: { name: 'Washington', slug: 'washington', abbr: 'WA', maPlans: 51, avgMAPremium: 15, medigapCommunityRated: true, shipName: 'Statewide Health Insurance Benefits Advisors', shipPhone: '1-800-562-6900' },
  WV: { name: 'West Virginia', slug: 'west-virginia', abbr: 'WV', maPlans: 23, avgMAPremium: 16, medigapCommunityRated: false, shipName: 'WV SHIP', shipPhone: '1-877-987-4463' },
  WI: { name: 'Wisconsin', slug: 'wisconsin', abbr: 'WI', maPlans: 41, avgMAPremium: 13, medigapCommunityRated: false, shipName: 'Wisconsin SHIP (BEAM)', shipPhone: '1-800-242-1060' },
  WY: { name: 'Wyoming', slug: 'wyoming', abbr: 'WY', maPlans: 6, avgMAPremium: 22, medigapCommunityRated: false, shipName: 'Wyoming SHIP', shipPhone: '1-800-856-4398' },
}

export const STATE_LIST = Object.values(STATES).sort((a, b) => a.name.localeCompare(b.name))

export const STATES_BY_SLUG: Record<string, StateData> = Object.values(STATES).reduce(
  (acc, s) => ({ ...acc, [s.slug]: s }),
  {}
)

export const fmt = (v: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(v)

export const fmtDec = (v: number, decimals = 2) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: decimals, maximumFractionDigits: decimals }).format(v)

// 2026 Medicare data constants
export const MEDICARE_2026 = {
  partA: {
    premiumFull: 0,
    premium30to39: 278,
    premiumUnder30: 505,
    deductible: 1676,
    coinsuranceDays61to90: 419,
    coinsuranceDays91plus: 838,
    snfDays21to100: 209.50,
  },
  partB: {
    standardPremium: 185.00,
    deductible: 257,
    irmaa: [
      { label: '≤$106,000 (Single) / ≤$212,000 (MFJ)', threshold: 106000, mfjThreshold: 212000, surcharge: 0, total: 185.00 },
      { label: '$106,001–$133,000 (Single)', threshold: 133000, mfjThreshold: 266000, surcharge: 74.00, total: 259.00 },
      { label: '$133,001–$167,000 (Single)', threshold: 167000, mfjThreshold: 334000, surcharge: 187.00, total: 372.00 },
      { label: '$167,001–$200,000 (Single)', threshold: 200000, mfjThreshold: 400000, surcharge: 300.40, total: 485.40 },
      { label: '$200,001–$500,000 (Single)', threshold: 500000, mfjThreshold: 750000, surcharge: 413.20, total: 598.20 },
      { label: '$500,001+ (Single)', threshold: Infinity, mfjThreshold: Infinity, surcharge: 450.00, total: 635.00 },
    ],
  },
  partC: {
    avgPremium: 17,
    oopMax: 9350,
  },
  partD: {
    avgPremium: 46.50,
    deductibleMax: 590,
    oopCap: 2000,
    extraHelpIndividual: 23340,
    extraHelpCouple: 31860,
  },
  medigap: {
    planG: { low: 100, high: 300, avg: 175 },
    planN: { low: 80, high: 200, avg: 140 },
    planA: { low: 60, high: 180, avg: 110 },
  },
}

export function getPartBPremium(magi: number, filingStatus: 'single' | 'mfj' | 'mfs'): { premium: number; surcharge: number; bracket: number } {
  const brackets = MEDICARE_2026.partB.irmaa
  const threshold = filingStatus === 'mfj' ? 'mfjThreshold' : 'threshold'

  // Married filing separately has special rules — same as single thresholds but different
  // MFS: same brackets as single
  for (let i = 0; i < brackets.length; i++) {
    if (magi <= brackets[i][threshold]) {
      return { premium: brackets[i].total, surcharge: brackets[i].surcharge, bracket: i }
    }
  }
  const last = brackets[brackets.length - 1]
  return { premium: last.total, surcharge: last.surcharge, bracket: brackets.length - 1 }
}

export function getSocialSecurityFRA(birthYear: number): { years: number; months: number; label: string } {
  if (birthYear <= 1954) return { years: 66, months: 0, label: '66' }
  if (birthYear === 1955) return { years: 66, months: 2, label: '66 and 2 months' }
  if (birthYear === 1956) return { years: 66, months: 4, label: '66 and 4 months' }
  if (birthYear === 1957) return { years: 66, months: 6, label: '66 and 6 months' }
  if (birthYear === 1958) return { years: 66, months: 8, label: '66 and 8 months' }
  if (birthYear === 1959) return { years: 66, months: 10, label: '66 and 10 months' }
  return { years: 67, months: 0, label: '67' }
}

export function getSocialSecurityBenefit(
  fraMonthly: number,
  birthYear: number,
  claimAge: number,
  claimMonth = 0
): number {
  const fra = getSocialSecurityFRA(birthYear)
  const fraAgeInMonths = fra.years * 12 + fra.months
  const claimAgeInMonths = claimAge * 12 + claimMonth

  if (claimAgeInMonths >= fraAgeInMonths) {
    // Delayed credits: 8% per year
    const yearsDelayed = (claimAgeInMonths - fraAgeInMonths) / 12
    const maxDelay = Math.min(yearsDelayed, 70 - fra.years - fra.months / 12)
    return fraMonthly * (1 + 0.08 * Math.max(0, maxDelay))
  } else {
    // Early reduction
    const monthsEarly = fraAgeInMonths - claimAgeInMonths
    let reduction = 0
    const first36 = Math.min(monthsEarly, 36)
    const beyond36 = Math.max(0, monthsEarly - 36)
    reduction = (first36 * (5 / 9) + beyond36 * (5 / 12)) / 100
    return fraMonthly * (1 - reduction)
  }
}

export const RMD_FACTORS: Record<number, number> = {
  72: 27.4,
  73: 26.5,
  74: 25.5,
  75: 24.6,
  76: 23.7,
  77: 22.9,
  78: 22.0,
  79: 21.1,
  80: 20.2,
  81: 19.4,
  82: 18.5,
  83: 17.7,
  84: 16.8,
  85: 16.0,
  86: 15.2,
  87: 14.4,
  88: 13.7,
  89: 12.9,
  90: 12.2,
  91: 11.5,
  92: 10.8,
  93: 10.1,
  94: 9.5,
  95: 8.9,
  96: 8.4,
  97: 7.8,
  98: 7.3,
  99: 6.8,
  100: 6.4,
}

export function getRMDFactor(age: number): number {
  if (age < 72) return 0
  if (RMD_FACTORS[age]) return RMD_FACTORS[age]
  // Interpolate/extrapolate
  if (age > 100) return Math.max(1, RMD_FACTORS[100] - (age - 100) * 0.5)
  return RMD_FACTORS[72] // fallback
}
