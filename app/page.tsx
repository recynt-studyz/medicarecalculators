import type { Metadata } from 'next'
import ToolHeader from '@/components/ToolHeader'
import MedicareCostCalculatorWrapper from '@/components/MedicareCostCalculatorWrapper'
import AdBanner from '@/components/AdBanner'
import FAQ from '@/components/FAQ'
import type { FaqItem } from '@/components/FAQ'
import Footer from '@/components/Footer'
import AffiliateCTA from '@/components/AffiliateCTA'

export const metadata: Metadata = {
  title: 'Medicare Cost Calculator 2026 — Estimate Your Monthly Premiums',
  description:
    'Calculate your total 2026 Medicare costs: Part A, Part B, IRMAA surcharges, Part D, and Medigap premiums. Free estimator with income-based IRMAA adjustment.',
  alternates: { canonical: 'https://medicarecalculators.com' },
  robots: { index: true, follow: true },
}

const faqs: FaqItem[] = [
  {
    q: 'How much does Medicare cost per month in 2026?',
    a: 'In 2026, the standard Medicare Part B premium is $185/month. Most people pay $0 for Part A if they or their spouse paid Medicare taxes for at least 10 years. If you add a Part D prescription drug plan (average $46.50/month) and a Medigap Plan G supplement (average ~$175/month for a 65-year-old), your total Medicare costs would be approximately $406/month. Medicare Advantage plans offer an alternative — average premium $17/month on top of Part B — with lower monthly costs but different coverage rules. Higher-income beneficiaries pay more due to IRMAA surcharges on Part B (and Part D).',
  },
  {
    q: 'What is the Medicare Part B premium for 2026?',
    a: 'The standard Medicare Part B premium for 2026 is $185.00 per month — a modest increase from prior years. However, if your income was above $106,000 (single) or $212,000 (married filing jointly) in 2024, you pay higher premiums called IRMAA surcharges, ranging from $259/month to $635/month depending on income. Part B covers outpatient services, doctor visits, preventive care, durable medical equipment, and most non-hospital Medicare services. The Part B annual deductible in 2026 is $257, after which Medicare pays 80% and you pay 20% (unless you have a Medigap supplement).',
  },
  {
    q: 'Does everyone pay the same Medicare premium?',
    a: 'No — Medicare premiums vary based on income, work history, and coverage choices. The standard Part B premium is $185/month, but higher-income beneficiaries pay more through IRMAA surcharges. Part A is free for those who paid Medicare taxes for 10+ years, but costs $278/month (30–39 quarters) or $505/month (under 30 quarters) for those without sufficient work history. Part D and Medigap premiums vary by plan and insurer. Your total Medicare cost depends on which coverage you choose and your specific income situation.',
  },
  {
    q: 'When does Medicare coverage start?',
    a: 'Medicare eligibility begins at age 65. Your Initial Enrollment Period (IEP) starts 3 months before your 65th birthday month and ends 3 months after — a 7-month window. If you are already receiving Social Security benefits, you are automatically enrolled in Parts A and B and coverage begins the first day of your birthday month. If you are not on Social Security, you must actively enroll. If you have employer coverage through active employment, you can delay Medicare enrollment without penalty using a Special Enrollment Period when that coverage ends.',
  },
  {
    q: 'Can I get Medicare if I never worked?',
    a: 'Yes, with some important differences. If you never worked (or have fewer than 30 quarters of Medicare-covered work), you can still get Medicare at age 65, but you will pay a premium for Part A — $278/month with 30–39 quarters of work, or $505/month with fewer than 30 quarters. Part B is available to everyone at 65 for the standard $185/month premium. You may also qualify through a spouse\'s work record — if your spouse has 40+ quarters of Medicare-covered employment and you are 65, you can get premium-free Part A. Spouses who are still married, divorced (after 10+ years of marriage), or widowed may qualify.',
  },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
}

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Medicare Cost Calculator 2026',
  url: 'https://medicarecalculators.com',
  description: 'Free 2026 Medicare cost calculator estimating Part A, Part B, IRMAA surcharges, Part D, and Medigap premiums.',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
}

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Calculate Your Total Medicare Costs',
  step: [
    { '@type': 'HowToStep', name: 'Enter your birth year and Part A situation', text: 'Enter your birth year and select your Part A premium situation based on your Medicare tax payment history.' },
    { '@type': 'HowToStep', name: 'Enter your income and coverage type', text: 'Enter your 2024 MAGI and filing status to calculate any IRMAA surcharges. Select Original Medicare or Medicare Advantage, and add Part D and Medigap if applicable.' },
    { '@type': 'HowToStep', name: 'View your estimated monthly Medicare costs', text: 'See your total monthly Medicare cost breakdown including all premiums and IRMAA surcharges, with a comparison to Medicare Advantage costs.' },
  ],
}

const trustSignals = ['🏥 2026 Updated', '🔒 Private', '⚡ Instant', '✓ Free']

const STATES = [
  { slug: 'alabama', name: 'Alabama' }, { slug: 'alaska', name: 'Alaska' }, { slug: 'arizona', name: 'Arizona' },
  { slug: 'arkansas', name: 'Arkansas' }, { slug: 'california', name: 'California' }, { slug: 'colorado', name: 'Colorado' },
  { slug: 'connecticut', name: 'Connecticut' }, { slug: 'delaware', name: 'Delaware' }, { slug: 'florida', name: 'Florida' },
  { slug: 'georgia', name: 'Georgia' }, { slug: 'hawaii', name: 'Hawaii' }, { slug: 'idaho', name: 'Idaho' },
  { slug: 'illinois', name: 'Illinois' }, { slug: 'indiana', name: 'Indiana' }, { slug: 'iowa', name: 'Iowa' },
  { slug: 'kansas', name: 'Kansas' }, { slug: 'kentucky', name: 'Kentucky' }, { slug: 'louisiana', name: 'Louisiana' },
  { slug: 'maine', name: 'Maine' }, { slug: 'maryland', name: 'Maryland' }, { slug: 'massachusetts', name: 'Massachusetts' },
  { slug: 'michigan', name: 'Michigan' }, { slug: 'minnesota', name: 'Minnesota' }, { slug: 'mississippi', name: 'Mississippi' },
  { slug: 'missouri', name: 'Missouri' }, { slug: 'montana', name: 'Montana' }, { slug: 'nebraska', name: 'Nebraska' },
  { slug: 'nevada', name: 'Nevada' }, { slug: 'new-hampshire', name: 'New Hampshire' }, { slug: 'new-jersey', name: 'New Jersey' },
  { slug: 'new-mexico', name: 'New Mexico' }, { slug: 'new-york', name: 'New York' }, { slug: 'north-carolina', name: 'North Carolina' },
  { slug: 'north-dakota', name: 'North Dakota' }, { slug: 'ohio', name: 'Ohio' }, { slug: 'oklahoma', name: 'Oklahoma' },
  { slug: 'oregon', name: 'Oregon' }, { slug: 'pennsylvania', name: 'Pennsylvania' }, { slug: 'rhode-island', name: 'Rhode Island' },
  { slug: 'south-carolina', name: 'South Carolina' }, { slug: 'south-dakota', name: 'South Dakota' }, { slug: 'tennessee', name: 'Tennessee' },
  { slug: 'texas', name: 'Texas' }, { slug: 'utah', name: 'Utah' }, { slug: 'vermont', name: 'Vermont' },
  { slug: 'virginia', name: 'Virginia' }, { slug: 'washington', name: 'Washington' }, { slug: 'west-virginia', name: 'West Virginia' },
  { slug: 'wisconsin', name: 'Wisconsin' }, { slug: 'wyoming', name: 'Wyoming' },
]

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, '\\u003c') }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema).replace(/</g, '\\u003c') }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema).replace(/</g, '\\u003c') }} />

      <section className="relative bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/herobgmc.webp')" }}>
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 pb-10">
          <ToolHeader />
          <div className="text-center text-white px-4 py-8">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 leading-tight">
              Medicare Cost Calculator 2026
            </h1>
            <p className="text-lg sm:text-xl text-white/80 mb-6 max-w-2xl mx-auto">
              Estimate your total 2026 Medicare premiums — Part A, Part B, IRMAA surcharges, Part D drug coverage, and Medigap supplements. Free for all 50 states.
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-sm">
              {trustSignals.map(t => (
                <span key={t} className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 text-white font-medium">{t}</span>
              ))}
            </div>
          </div>

          <div className="max-w-4xl mx-auto px-4 mb-4">
            <AdBanner slot="1111111111" />
          </div>

          <div className="max-w-5xl mx-auto px-4">
            <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-2xl rounded-2xl overflow-hidden">
              <MedicareCostCalculatorWrapper />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white dark:from-[#0a1929] to-transparent pointer-events-none" />
      </section>

      <section className="bg-white dark:bg-[#0a1929] pt-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="pb-4">
            <AdBanner slot="2222222222" />
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 mb-10">
            {[
              { icon: '🔒', label: 'Private', sub: 'All calculations in your browser' },
              { icon: '⚡', label: 'Instant', sub: 'Results update as you type' },
              { icon: '🏥', label: '2026 Updated', sub: 'Current CMS Medicare data' },
              { icon: '✓', label: 'Free', sub: 'No signup, no limits' },
            ].map(t => (
              <div key={t.label} className="flex flex-col items-center rounded-xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-[#0f2744] p-4 text-center shadow-sm">
                <span className="text-2xl mb-1">{t.icon}</span>
                <span className="text-sm font-semibold text-gray-800 dark:text-[#e2e8f0]">{t.label}</span>
                <span className="text-xs text-gray-400 mt-0.5">{t.sub}</span>
              </div>
            ))}
          </div>

          <div className="rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 px-6 py-5 mb-10">
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Medicare Disclaimer</p>
            <p className="text-sm text-slate-700 dark:text-slate-400 leading-relaxed">
              These calculators provide estimates based on 2026 Medicare data for educational purposes only. Medicare costs and coverage vary by plan, location, and individual circumstances. Contact Medicare directly at 1-800-MEDICARE or medicare.gov for official information. Consult a licensed Medicare advisor for plan-specific guidance. This site is not affiliated with or endorsed by Medicare or the US government.
            </p>
          </div>

          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">How Medicare Costs Are Calculated in 2026</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Understanding Medicare costs starts with knowing the four parts of Medicare. Part A (hospital insurance) covers inpatient hospital stays, skilled nursing facility care, and home health care. Most people pay nothing for Part A if they or their spouse paid Medicare taxes for at least 10 years (40 quarters). Those with 30–39 quarters pay $278/month, and those with fewer than 30 quarters pay $505/month in 2026.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Part B (medical insurance) covers outpatient services, doctor visits, and preventive care. The standard 2026 Part B premium is $185/month. However, Medicare uses a 2-year lookback — your 2026 premium is based on your 2024 Modified Adjusted Gross Income (MAGI). If your income exceeds certain thresholds, you pay Income-Related Monthly Adjustment Amounts (IRMAA), ranging from $74/month to $450/month in additional Part B premiums. Singles earning over $106,000 and couples earning over $212,000 trigger IRMAA.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Your total Medicare cost depends heavily on whether you choose Original Medicare or Medicare Advantage. With Original Medicare, you typically add a Part D prescription drug plan (average $46.50/month in 2026) and a Medigap supplement like Plan G (averaging ~$175/month for a 65-year-old) to fill coverage gaps — total roughly $406/month before any IRMAA. Medicare Advantage combines Parts A, B, and usually D into one plan, with an average premium of just $17/month in 2026 on top of your Part B premium, saving many seniors $200–$300/month in premiums.
            </p>
          </div>

          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Worked Example: Margaret&apos;s 2026 Medicare Costs</h2>
            <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/40 rounded-2xl p-6">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Margaret is 64 and will turn 65 in March 2026. She worked for 30 years paying Medicare taxes. Her 2024 MAGI was $98,000 (single filer). She wants original Medicare with the most comprehensive coverage.
              </p>
              <div className="space-y-1 text-sm text-gray-700 dark:text-gray-300 mb-4 font-mono bg-white/60 dark:bg-black/20 rounded-xl px-4 py-3">
                <div>Part A premium: $0/month (10+ years Medicare taxes)</div>
                <div>Part B premium: $185.00/month (income below $106,000 — no IRMAA)</div>
                <div>IRMAA surcharge: $0 (2024 MAGI of $98,000 below threshold)</div>
                <div>Part D premium: $46.50/month (national average)</div>
                <div>Medigap Plan G: ~$175/month (age 65 estimate)</div>
                <div className="font-bold pt-1">TOTAL: $406.50/month | $4,878/year</div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                If Margaret chose Medicare Advantage instead, her average premium would be $17/month (in addition to $185 Part B), totaling approximately $202/month — saving $204.50/month ($2,454/year). However, she&apos;d have copays for services, network restrictions, and prior authorization requirements. With her current doctor relationships and desire for predictable costs, Original Medicare with Plan G is a strong choice for Margaret.
              </p>
            </div>
          </div>

          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Key Factors That Affect Your Medicare Costs</h2>
            <ul className="space-y-5">
              <li>
                <p className="font-semibold text-gray-900 dark:text-white mb-1">Income-Related Monthly Adjustment Amounts (IRMAA)</p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">IRMAA is the most overlooked Medicare cost driver. If your MAGI in 2024 exceeds $106,000 (single) or $212,000 (married filing jointly), you pay additional Part B premiums ranging from $74/month to $450/month extra. IRMAA is a cliff — earning $1 above the threshold can cost $74/month more. Recent retirees who had a high-income year often trigger IRMAA based on that prior income, even if their current income is much lower. You can appeal using SSA Form SSA-44 if you had a qualifying life-changing event that reduced your income.</p>
              </li>
              <li>
                <p className="font-semibold text-gray-900 dark:text-white mb-1">Original Medicare vs. Medicare Advantage</p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">The biggest cost decision is between Original Medicare (Parts A + B with optional Medigap and Part D) and Medicare Advantage (Part C). Original Medicare with Plan G provides comprehensive, predictable coverage with no network restrictions — you can see any Medicare-accepting provider nationwide. Medicare Advantage offers lower monthly premiums (average $17/month in 2026) and often includes extra benefits like dental and vision, but requires using network providers and may need prior authorization for services.</p>
              </li>
              <li>
                <p className="font-semibold text-gray-900 dark:text-white mb-1">Part A Work History</p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">Premium-free Part A requires 40 quarters (10 years) of Medicare-covered employment. If you or your spouse have fewer qualifying quarters, you pay Part A premiums — significantly increasing your total Medicare cost. Immigrants who became US citizens later in life, those who worked primarily in non-covered government positions, or those with limited work histories should calculate their actual Part A premium when estimating Medicare costs.</p>
              </li>
              <li>
                <p className="font-semibold text-gray-900 dark:text-white mb-1">Medigap Plan Choice and Timing</p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">Medigap (Medicare Supplement) premiums vary significantly by plan type, insurer, age, and state. Plan G is the most comprehensive for new Medicare beneficiaries, while Plan N offers lower premiums with office visit copays. The most important timing consideration: buy Medigap during your 6-month open enrollment window starting when you turn 65 with Part B. During this period, insurers cannot deny coverage or charge more based on health status. Missing this window can make Medigap unavailable or much more expensive.</p>
              </li>
            </ul>
          </div>

          <div className="mb-6">
            <AffiliateCTA headline="Want help navigating your Medicare options?" />
          </div>

          <div className="pb-10">
            <FAQ questions={faqs} />
          </div>

          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Medicare Cost Calculator by State</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              While Medicare premiums are set federally, Medicare Advantage plan availability, Medigap regulations, and state-specific Medicare programs vary significantly by state. Select your state for local Medicare information.
            </p>
            <div className="flex flex-wrap gap-2">
              {STATES.map(({ slug, name }) => (
                <a key={slug} href={`/${slug}-medicare-calculator`}
                  className="text-xs px-3 py-1.5 rounded-full border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-[#0f4c75] hover:text-white hover:border-[#0f4c75] transition-colors">
                  {name}
                </a>
              ))}
            </div>
          </div>

          <div className="pb-6">
            <AdBanner slot="3333333333" />
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
