import type { StateData } from '@/lib/medicareData'
import ToolHeader from './ToolHeader'
import AdBanner from './AdBanner'
import AffiliateCTA from './AffiliateCTA'
import FAQ from './FAQ'
import type { FaqItem } from './FAQ'
import Footer from './Footer'
import SocialSecurityCalculatorWrapper from './SocialSecurityCalculatorWrapper'

const trustSignals = ['🏥 2026 Updated', '🔒 Private', '⚡ Instant', '✓ Free']

export default function StateSocialSecurityPage({ state: s }: { state: StateData }) {
  const faqs: FaqItem[] = [
    {
      q: `Does ${s.name} tax Social Security benefits?`,
      a: `Social Security taxation at the state level varies widely. At the federal level, up to 85% of Social Security benefits may be taxable depending on your combined income (adjusted gross income + nontaxable interest + half of Social Security benefits). At the state level, ${s.name}'s rules depend on current state tax law — some states fully exempt Social Security from state income tax, while others tax it similarly to the federal government. Consult a tax advisor familiar with ${s.name} state income tax rules for current guidance, as state tax laws change frequently.`,
    },
    {
      q: `What is the best age to claim Social Security in ${s.name}?`,
      a: `The optimal age to claim Social Security benefits is the same regardless of state — it depends on your health, life expectancy, financial needs, and spousal situation. Claiming at 62 gives you the maximum number of benefit checks but permanently reduces each check by up to 30% (if your FRA is 67). Waiting until your Full Retirement Age (66 to 67 depending on birth year) gives you your full benefit. Delaying to 70 increases your benefit by 8% per year beyond FRA, up to 32% more. Our calculator above helps you compare break-even ages and total lifetime benefits for each claiming strategy.`,
    },
    {
      q: `When does Medicare start if I claim Social Security early in ${s.name}?`,
      a: `Medicare eligibility starts at age 65 regardless of when you claim Social Security. If you claim Social Security before 65, you do NOT receive Medicare automatically — you must actively enroll during your Initial Enrollment Period (3 months before your 65th birthday through 3 months after). If you claim Social Security at or after 65, you are typically enrolled in Medicare Part A and Part B automatically. Your Part B premium is deducted from your Social Security check. Contact ${s.shipName} at ${s.shipPhone} for free enrollment guidance.`,
    },
    {
      q: `How does working affect my Social Security benefits in ${s.name}?`,
      a: `If you claim Social Security before your Full Retirement Age and continue working, the earnings test applies. In 2026, if you earn more than $22,320/year and are below FRA, Social Security withholds $1 in benefits for every $2 you earn above the limit. In the year you reach FRA, the limit rises to $59,520 and only $1 is withheld per $3 earned above that amount. After you reach FRA, there is NO earnings limit — you can earn any amount without affecting your benefits. Benefits withheld under the earnings test are NOT lost — they are credited back as a higher monthly benefit once you reach FRA.`,
    },
    {
      q: `What are Social Security survivor benefits, and how do they work for ${s.name} spouses?`,
      a: `If your spouse passes away, you may be eligible for Social Security survivor benefits of up to 100% of your deceased spouse's benefit (compared to the 50% spousal benefit available while both spouses are alive). Survivor benefits can be claimed as early as age 60 (or 50 if disabled). To maximize lifetime benefits, couples often coordinate their claiming strategy — for example, the lower-earning spouse claims early while the higher earner delays to 70, maximizing the survivor benefit the widow/widower will eventually receive. Medicare eligibility for surviving spouses follows standard Medicare rules regardless of state. Contact the Social Security Administration at 1-800-772-1213 for personalized guidance.`,
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
    name: `${s.name} Social Security Calculator 2026`,
    url: `https://medicarecalculators.com/${s.slug}-social-security-calculator`,
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Any',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  }

  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: `How to Calculate Social Security Benefits in ${s.name}`,
    step: [
      { '@type': 'HowToStep', name: 'Enter your birth year and FRA benefit', text: 'Enter your birth year and estimated monthly benefit at Full Retirement Age from your SSA.gov statement.' },
      { '@type': 'HowToStep', name: 'Indicate spouse and work status', text: 'Optionally add spouse information for spousal benefit analysis, and indicate if you are still working.' },
      { '@type': 'HowToStep', name: 'Review your claiming options', text: `Compare benefit amounts at 62, FRA, and 70, with break-even analysis and lifetime projection table to make the best claiming decision.` },
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
              {s.name} Social Security Calculator 2026
            </h1>
            <p className="text-lg sm:text-xl text-white/80 mb-6 max-w-2xl mx-auto">
              Calculate when to claim Social Security in {s.name}. Compare benefits at 62, FRA, and 70 with break-even analysis.
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
              <SocialSecurityCalculatorWrapper />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white dark:from-[#0a1929] to-transparent pointer-events-none" />
      </section>

      <section className="bg-white dark:bg-[#0a1929] pt-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="pb-4"><AdBanner slot="2222222222" /></div>

          <div className="mb-4 text-center">
            <a href="/social-security" className="text-sm text-[#0f4c75] dark:text-blue-400 hover:underline">
              ← Back to Social Security Calculator
            </a>
          </div>

          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Social Security Claiming Strategy in {s.name}</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Deciding when to claim Social Security is one of the most consequential financial decisions {s.name} seniors make.
              Benefits are calculated the same way nationwide, but your personal circumstances — health, finances, spouse&apos;s benefits, and {s.name} state income tax rules — affect the optimal claiming age.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Claiming at 62 gives you money sooner but permanently reduces your monthly benefit by up to 30% (if your FRA is 67).
              Waiting until your Full Retirement Age (between 66 and 67 depending on birth year) gives you 100% of your earned benefit.
              Delaying until 70 increases your benefit by 8% per year beyond FRA — a cumulative 32% increase for those with an FRA of 67.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              An important consideration for {s.name} seniors: Medicare starts at 65 regardless of when you claim Social Security.
              If you retire early in {s.name} and don&apos;t have employer coverage, you&apos;ll need to arrange your own health coverage until Medicare kicks in at 65 — a significant expense that can affect the timing of both Social Security and retirement decisions.
              Contact {s.shipName} at {s.shipPhone} for free Medicare enrollment guidance.
            </p>
          </div>

          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Worked Example: When to Claim Social Security</h2>
            <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/40 rounded-2xl p-6">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Patricia is a {s.name} resident born in 1959 (FRA: 66 and 10 months). Her SSA statement shows an estimated benefit of $2,500/month at FRA. She&apos;s in good health and her mother lived to 91.
              </p>
              <div className="space-y-1 text-sm text-gray-700 dark:text-gray-300 mb-4 font-mono bg-white/60 dark:bg-black/20 rounded-xl px-4 py-3">
                <div>Claim at 62: ~$1,750/month (30% reduction)</div>
                <div>Claim at FRA (66 + 10 mo): $2,500/month</div>
                <div>Claim at 70: ~$3,100/month (24% increase)</div>
                <div className="pt-2">Break-even (62 vs FRA): ~age 80</div>
                <div>Break-even (FRA vs 70): ~age 83</div>
                <div className="pt-2 font-bold">Recommendation: Delay to 70 given good health + longevity</div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Given Patricia&apos;s good health and family longevity history, waiting until 70 may add over $250,000 in total lifetime benefits compared to claiming at 62.
                If she predeceases her spouse, her higher benefit also becomes the survivor benefit — potentially benefiting her spouse for decades.
              </p>
            </div>
          </div>

          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Key Factors in the Social Security Claiming Decision</h2>
            <ul className="space-y-5">
              <li>
                <p className="font-semibold text-gray-900 dark:text-white mb-1">Health and Life Expectancy</p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">Break-even analysis is central to the claiming decision. To come out ahead by waiting from 62 to FRA, you generally need to live past age 80. To benefit from delaying FRA to 70, you need to live past approximately 83. {s.name} residents should consider personal health, family history, and lifestyle when setting a life expectancy assumption. Those in excellent health with long-lived family members benefit most from delaying to 70 — those with serious health conditions often maximize total lifetime benefits by claiming earlier.</p>
              </li>
              <li>
                <p className="font-semibold text-gray-900 dark:text-white mb-1">Spousal Coordination</p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">For married couples in {s.name}, coordinating Social Security claiming between spouses can significantly increase lifetime household income. The spouse with the higher benefit should generally delay as long as possible — their benefit becomes the survivor benefit the widowed spouse collects for the rest of their life. The lower earner can claim earlier to provide household income while the higher earner delays. This strategy can produce tens of thousands of dollars in additional lifetime benefits for the surviving spouse.</p>
              </li>
              <li>
                <p className="font-semibold text-gray-900 dark:text-white mb-1">Medicare and Social Security Interaction</p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">Medicare begins at 65 regardless of when you claim Social Security. If you delay Social Security past 65, you must actively enroll in Medicare Part B — you will not be enrolled automatically. Your Medicare Part B premium ($185/month in 2026) is deducted directly from your Social Security check once enrolled in both. Large RMDs starting at 73 can push income above IRMAA thresholds and raise your Medicare premium. Contact {s.shipName} at {s.shipPhone} for free, unbiased Medicare and retirement coordination guidance in {s.name}.</p>
              </li>
            </ul>
          </div>

          <div className="mb-6">
            <AffiliateCTA headline={`Coordinate Medicare with your ${s.name} Social Security strategy`} />
          </div>

          <div className="pb-10">
            <FAQ questions={faqs} />
          </div>

          <div className="rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 px-6 py-5 mb-10">
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Medicare Disclaimer</p>
            <p className="text-sm text-slate-700 dark:text-slate-400 leading-relaxed">
              These calculators provide estimates based on 2026 data for educational purposes only. Actual Social Security benefits depend on your complete earnings history. Visit ssa.gov or contact 1-800-MEDICARE for official Medicare and Social Security information. Consult a licensed Medicare advisor for personalized guidance. Not affiliated with the Social Security Administration, Medicare, or the US government.
            </p>
          </div>

          <div className="pb-6"><AdBanner slot="3333333333" /></div>
        </div>
      </section>

      <Footer />
    </>
  )
}
