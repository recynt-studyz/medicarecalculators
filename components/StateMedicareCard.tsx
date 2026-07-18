import type { StateData } from '@/lib/medicareData'
import ToolHeader from './ToolHeader'
import AdBanner from './AdBanner'
import AffiliateCTA from './AffiliateCTA'
import FAQ from './FAQ'
import type { FaqItem } from './FAQ'
import Footer from './Footer'
import MedicareCostCalculatorWrapper from './MedicareCostCalculatorWrapper'

const trustSignals = ['🏥 2026 Updated', '🔒 Private', '⚡ Instant', '✓ Free']

interface StateMedicareCostPageProps {
  state: StateData
}

export default function StateMedicareCostPage({ state: s }: StateMedicareCostPageProps) {
  const faqs: FaqItem[] = [
    {
      q: `How many Medicare Advantage plans are available in ${s.name}?`,
      a: `In 2026, approximately ${s.maPlans} Medicare Advantage plans are available in ${s.name}. The number of plans varies by county — urban areas typically have more options than rural counties. The average Medicare Advantage premium in ${s.name} is approximately $${s.avgMAPremium}/month in 2026, compared to the national average of $17/month. You can compare all available plans at medicare.gov during the Annual Enrollment Period (October 15 – December 7) or when you first become eligible for Medicare.`,
    },
    {
      q: `Does ${s.name} have special Medigap rules?`,
      a: `${s.medigapCommunityRated
        ? `Yes — ${s.name} is one of the few states that requires community rating for Medigap (Medicare Supplement) policies. This means insurers must offer the same premium regardless of your age, gender, or health status. Community rating provides significant protections for older beneficiaries who might otherwise face steep premium increases. You have stronger guaranteed issue rights in ${s.name} than in most other states.`
        : `${s.name} follows standard federal Medigap rules. Insurers can use attained-age rating, issue-age rating, or community rating. Most use attained-age rating, meaning premiums increase as you age. Your guaranteed issue window is the 6 months following your Part B effective date — buy during this period to avoid medical underwriting. After this window, insurers can deny coverage or charge more based on health status.`}`,
    },
    {
      q: `What is the Medicare SHIP program in ${s.name}?`,
      a: `${s.name}'s State Health Insurance Assistance Program (SHIP) is called ${s.shipName}. SHIP provides free, unbiased Medicare counseling to ${s.name} Medicare beneficiaries. Counselors can help you compare Medicare Advantage and Medigap plans, understand your Medicare rights, file appeals, and navigate billing problems. Contact ${s.name} SHIP at ${s.shipPhone} — all services are free and provided by trained volunteers. This is an excellent resource for unbiased plan comparison guidance.`,
    },
    {
      q: `When can I enroll in Medicare in ${s.name}?`,
      a: `Medicare enrollment timelines are the same in ${s.name} as nationwide. Your Initial Enrollment Period (IEP) begins 3 months before your 65th birthday month and ends 3 months after. If you miss your IEP, the General Enrollment Period runs January 1 – March 31 each year, with coverage starting July 1. If you have employer health coverage through active work, you have a Special Enrollment Period when that coverage ends. The Annual Enrollment Period for Medicare Advantage and Part D is October 15 – December 7. Contact ${s.shipName} at ${s.shipPhone} for personalized enrollment guidance.`,
    },
    {
      q: `How much does Medicare cost per month in ${s.name}?`,
      a: `In ${s.name}, the standard Medicare Part B premium is $185/month in 2026 (same for all states). Part A is typically free if you paid Medicare taxes for 10+ years. If you have a Medicare Advantage plan, the average MA premium in ${s.name} is approximately $${s.avgMAPremium}/month. With Original Medicare plus a Plan G Medigap supplement and Part D drug coverage, total premiums typically run $400–$450/month for most seniors in ${s.name}. Your actual costs depend on your income (which affects IRMAA surcharges), specific plan choice, and coverage type. Use our calculator above for a personalized estimate.`,
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
    name: `${s.name} Medicare Calculator 2026`,
    url: `https://medicarecalculators.com/${s.slug}-medicare-calculator`,
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Any',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  }

  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: `How to Calculate Medicare Costs in ${s.name}`,
    step: [
      { '@type': 'HowToStep', name: 'Enter your personal information', text: `Enter your birth year, Part A premium situation, and annual income. ${s.name} is pre-selected.` },
      { '@type': 'HowToStep', name: 'Select your coverage type', text: `Choose between Original Medicare (with optional Medigap and Part D) or Medicare Advantage. ${s.name} has approximately ${s.maPlans} MA plans available.` },
      { '@type': 'HowToStep', name: 'View your estimated costs', text: `See your estimated monthly Medicare costs including any IRMAA surcharges based on your income.` },
    ],
  }

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
              {s.name} Medicare Calculator 2026
            </h1>
            <p className="text-lg sm:text-xl text-white/80 mb-6 max-w-2xl mx-auto">
              Calculate your Medicare costs in {s.name} for 2026.
              {s.medigapCommunityRated ? ` ${s.name} requires community-rated Medigap plans.` : ''}
              {` ${s.maPlans} Medicare Advantage plans available.`}
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-sm">
              {trustSignals.map(t => (
                <span key={t} className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 text-white font-medium">{t}</span>
              ))}
            </div>
          </div>
          <div className="max-w-4xl mx-auto px-4 mb-4"><AdBanner slot="1111111111" /></div>
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
          <div className="pb-4"><AdBanner slot="2222222222" /></div>

          <div className="rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 px-6 py-5 mb-10">
            <h2 className="text-base font-bold text-slate-900 dark:text-slate-200 mb-2">{s.name} Medicare Overview 2026</h2>
            <p className="text-sm text-slate-700 dark:text-slate-400 leading-relaxed">
              {s.name} has approximately {s.maPlans} Medicare Advantage plans available in 2026,
              with an average MA premium of ${s.avgMAPremium}/month (vs. the $17/month national average).
              {s.medigapCommunityRated
                ? ` ${s.name} is one of a handful of states that requires community-rated Medigap policies — all enrollees pay the same premium regardless of age.`
                : ` ${s.name} uses standard Medigap underwriting rules. Buy during your 6-month open enrollment window for guaranteed acceptance.`}
              {` Free Medicare counseling is available through ${s.shipName} at ${s.shipPhone}.`}
            </p>
          </div>

          <div className="mb-4 text-center">
            <a href="/" className="text-sm text-[#0f4c75] dark:text-blue-400 hover:underline">
              ← Back to Medicare Cost Calculator
            </a>
          </div>

          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">How Medicare Works in {s.name}</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Medicare in {s.name} works the same as nationwide — it is administered by the federal government through the Centers for Medicare & Medicaid Services (CMS).
              However, several important aspects of Medicare vary by state, including the number and quality of Medicare Advantage plans available,
              Medigap regulation, and state-specific assistance programs.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              In {s.name}, there are approximately {s.maPlans} Medicare Advantage plans available in 2026, compared to a national average of around 40 plans per area.
              The average MA premium in {s.name} is ${s.avgMAPremium}/month.
              {s.maPlans > 50
                ? ` With this many options, ${s.name} seniors have excellent choices for Medicare Advantage coverage, ranging from $0 premium plans to comprehensive plans with rich extra benefits.`
                : ` Fewer plan options mean less competition, but ${s.name} seniors can still find quality Medicare Advantage coverage. Use our comparison tool above to evaluate whether Advantage or Original Medicare better fits your needs.`}
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {s.medigapCommunityRated
                ? `${s.name} has unique Medigap (Medicare Supplement) protections. Unlike most states where premiums increase significantly with age, ${s.name} requires community rating — insurers must charge the same premium to all enrollees regardless of age, gender, or health status. This makes ${s.name} one of the most senior-friendly states for Medigap coverage, and older enrollees enjoy significant savings compared to attained-age rated states.`
                : `Medigap (Medicare Supplement) insurance in ${s.name} follows standard federal rules. Insurers use attained-age rating in most cases, meaning premiums increase as you age. Your best opportunity to buy Medigap is during your 6-month open enrollment period — the 6 months starting the first month you have Part B and are 65 or older. During this window, insurers cannot deny coverage or charge more due to health conditions.`}
            </p>
          </div>

          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Worked Example: Medicare Costs in {s.name}</h2>
            <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/40 rounded-2xl p-6">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Margaret is 64 and will turn 65 in March 2026, becoming eligible for Medicare in {s.name}.
                She worked for 30+ years paying Medicare taxes (so Part A is free).
                Her 2024 MAGI was $88,000 (single filer — below the $106,000 IRMAA threshold).
              </p>
              <div className="space-y-1 text-sm text-gray-700 dark:text-gray-300 mb-4 font-mono bg-white/60 dark:bg-black/20 rounded-xl px-4 py-3">
                <div>Part A premium: $0/month (10+ years Medicare taxes)</div>
                <div>Part B premium: $185.00/month (standard — no IRMAA)</div>
                <div>Part D drug coverage: $46.50/month (average)</div>
                <div>Medigap Plan G: ~${s.medigapCommunityRated ? '175' : '175'}/month (age 65 estimate in {s.name})</div>
                <div className="font-bold pt-1">TOTAL: ~$406.50/month | ~$4,878/year</div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                If Margaret chose Medicare Advantage instead: average premium in {s.name} is ${s.avgMAPremium}/month.
                Her total MA cost would be ${185 + s.avgMAPremium}/month (Part B + MA premium), saving her approximately ${Math.round(406.50 - 185 - s.avgMAPremium)}/month
                compared to Original Medicare with Medigap. However, she would face network restrictions and copays for services.
              </p>
            </div>
          </div>

          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Key Factors Affecting Your {s.name} Medicare Costs</h2>
            <ul className="space-y-5">
              <li>
                <p className="font-semibold text-gray-900 dark:text-white mb-1">Medicare Advantage Plan Availability ({s.maPlans} plans in {s.name})</p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{s.name} has {s.maPlans} Medicare Advantage plans available in 2026, with an average premium of ${s.avgMAPremium}/month. Plan availability varies by county — you may have more or fewer options depending on your specific location within {s.name}. Use medicare.gov&apos;s plan finder or contact {s.shipName} to see all plans available at your address.</p>
              </li>
              <li>
                <p className="font-semibold text-gray-900 dark:text-white mb-1">Income-Related Adjustments (IRMAA)</p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">Your Part B premium is the same regardless of which state you live in — it&apos;s determined by your income. In 2026, singles earning over $106,000 (or couples over $212,000) pay IRMAA surcharges on top of the standard $185/month Part B premium. IRMAA is based on your 2024 tax return. If your income has decreased due to retirement or a life event, you can appeal the surcharge using SSA Form SSA-44.</p>
              </li>
              <li>
                <p className="font-semibold text-gray-900 dark:text-white mb-1">{s.medigapCommunityRated ? `Community Rating in ${s.name}` : `Medigap Underwriting in ${s.name}`}</p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{s.medigapCommunityRated
                  ? `${s.name} requires community-rated Medigap policies, meaning all enrollees pay the same premium regardless of age. This is a major benefit for older ${s.name} seniors compared to attained-age rating states where premiums can double or triple from age 65 to 85. Insurers in ${s.name} also have stronger guaranteed issue requirements.`
                  : `In ${s.name}, Medigap premiums typically use attained-age rating, meaning your premium increases each year as you age. Buying a Medigap policy at 65 during your open enrollment window locks in your best rate — you may not be able to buy or switch plans at the same rate later if your health changes.`}</p>
              </li>
            </ul>
          </div>

          <div className="mb-6">
            <AffiliateCTA headline={`Compare Medicare Plans in ${s.name} — Free`} />
          </div>

          <div className="pb-10">
            <FAQ questions={faqs} />
          </div>

          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Other Medicare Calculators</h2>
            <div className="flex flex-wrap gap-2">
              <a href="/part-b-irmaa" className="text-xs px-3 py-1.5 rounded-full border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-[#0f4c75] hover:text-white hover:border-[#0f4c75] transition-colors">Part B & IRMAA</a>
              <a href="/advantage-vs-original" className="text-xs px-3 py-1.5 rounded-full border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-[#0f4c75] hover:text-white hover:border-[#0f4c75] transition-colors">Advantage vs Original</a>
              <a href="/part-d" className="text-xs px-3 py-1.5 rounded-full border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-[#0f4c75] hover:text-white hover:border-[#0f4c75] transition-colors">Part D Drug</a>
              <a href="/medigap" className="text-xs px-3 py-1.5 rounded-full border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-[#0f4c75] hover:text-white hover:border-[#0f4c75] transition-colors">Medigap Plans</a>
              <a href="/social-security" className="text-xs px-3 py-1.5 rounded-full border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-[#0f4c75] hover:text-white hover:border-[#0f4c75] transition-colors">Social Security</a>
              <a href="/rmd" className="text-xs px-3 py-1.5 rounded-full border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-[#0f4c75] hover:text-white hover:border-[#0f4c75] transition-colors">RMD Calculator</a>
              <a href={`/${s.slug}-medicare-advantage`} className="text-xs px-3 py-1.5 rounded-full border border-[#0f4c75] text-[#0f4c75] dark:text-blue-300 hover:bg-[#0f4c75] hover:text-white transition-colors">{s.name} Medicare Advantage</a>
              <a href={`/${s.slug}-medigap-plans`} className="text-xs px-3 py-1.5 rounded-full border border-[#0f4c75] text-[#0f4c75] dark:text-blue-300 hover:bg-[#0f4c75] hover:text-white transition-colors">{s.name} Medigap Plans</a>
            </div>
          </div>

          <div className="rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 px-6 py-5 mb-10">
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Medicare Disclaimer</p>
            <p className="text-sm text-slate-700 dark:text-slate-400 leading-relaxed">
              These calculators provide estimates based on 2026 Medicare data for educational purposes only. Medicare costs and coverage vary by plan, location, and individual circumstances. Contact Medicare directly at 1-800-MEDICARE or medicare.gov for official information. Consult a licensed Medicare advisor for personalized plan comparison. This site is not affiliated with or endorsed by Medicare or the US government.
            </p>
          </div>

          <div className="pb-6"><AdBanner slot="3333333333" /></div>
        </div>
      </section>

      <Footer />
    </>
  )
}
