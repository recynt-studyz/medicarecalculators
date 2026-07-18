import type { Metadata } from 'next'
import ToolHeader from '@/components/ToolHeader'
import SocialSecurityCalculatorWrapper from '@/components/SocialSecurityCalculatorWrapper'
import AdBanner from '@/components/AdBanner'
import FAQ from '@/components/FAQ'
import type { FaqItem } from '@/components/FAQ'
import Footer from '@/components/Footer'
import AffiliateCTA from '@/components/AffiliateCTA'

export const metadata: Metadata = {
  title: 'Social Security Calculator 2026 — When Should You Claim?',
  description:
    'Calculate your Social Security benefits at age 62, full retirement age, and 70. Free 2026 calculator with break-even analysis and spousal benefit estimates.',
  alternates: { canonical: 'https://medicarecalculators.com/social-security' },
  robots: { index: true, follow: true },
}

const faqs: FaqItem[] = [
  {
    q: 'What is the best age to claim Social Security?',
    a: 'There is no single "best age" — the optimal claiming age depends on your health, life expectancy, financial needs, and spousal situation. Claiming at 62 maximizes total months of benefits but permanently reduces each check by up to 30% (for those with an FRA of 67). Waiting until Full Retirement Age (66–67 depending on birth year) gives you 100% of your earned benefit. Delaying to 70 adds 8% per year beyond FRA, increasing your benefit by up to 32% for those with an FRA of 67. If you expect to live past 80 and don\'t urgently need the income, delaying generally results in higher lifetime benefits. If you have poor health or immediate financial need, claiming earlier makes sense.',
  },
  {
    q: 'How much will my Social Security benefit be reduced if I claim at 62?',
    a: 'The reduction depends on your Full Retirement Age (FRA). For those born in 1960 or later with an FRA of 67, claiming at 62 permanently reduces your monthly benefit by 30%. The reduction formula works as follows: benefits are reduced 5/9 of 1% for each month before FRA (up to 36 months), and an additional 5/12 of 1% for each month beyond 36 months early. So for someone with an FRA of 67, claiming at 62 is 60 months early: 36 months × 5/9% = 20% reduction, plus 24 months × 5/12% = 10% reduction, for a total 30% reduction. A $2,500 FRA benefit becomes $1,750/month if claimed at 62.',
  },
  {
    q: 'What happens to my Social Security if I keep working?',
    a: 'If you claim Social Security before your Full Retirement Age and continue working, the earnings test applies. In 2026, if you earn more than $22,320/year, $1 in Social Security benefits is withheld for every $2 you earn above the limit. In the year you reach FRA, the limit rises and only $1 per $3 is withheld above a higher threshold. Once you reach FRA, there is NO earnings test — you can earn any amount without affecting your benefits. Benefits withheld under the earnings test are returned to you as a higher monthly benefit once you reach FRA — they are not permanently lost. Working also continues building your earnings record, potentially increasing your future benefit.',
  },
  {
    q: 'What is the Social Security full retirement age?',
    a: 'Full Retirement Age (FRA) is the age at which you receive 100% of your calculated Social Security benefit. FRA depends on your birth year: those born 1943–1954 have an FRA of 66. FRA then increases by 2 months per birth year from 1955 (FRA 66 and 2 months) through 1959 (FRA 66 and 10 months). Those born in 1960 or later have an FRA of 67. Claiming before FRA permanently reduces your benefit; claiming after FRA permanently increases it by 8% per year until age 70. Unlike the full retirement age for Social Security, Medicare eligibility remains at age 65 regardless of birth year.',
  },
  {
    q: 'Can I claim Social Security and Medicare at the same time?',
    a: 'Yes — Social Security and Medicare operate on different schedules that can overlap. Medicare eligibility begins at 65 for most people, while Social Security benefits can begin as early as 62 or as late as 70 (or beyond). Many people collect Social Security starting at 62–66 while waiting until 65 for Medicare. If you delay Social Security past 65, you will need to actively enroll in Medicare during your Initial Enrollment Period — you won\'t be enrolled automatically unless you are already receiving Social Security. Your Medicare Part B premium is typically deducted directly from your Social Security check once you are enrolled in both.',
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
  name: 'Social Security Calculator 2026',
  url: 'https://medicarecalculators.com/social-security',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
}

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Calculate When to Claim Social Security',
  step: [
    { '@type': 'HowToStep', name: 'Enter your birth year and FRA benefit', text: 'Enter your birth year and estimated monthly benefit at Full Retirement Age from your SSA.gov statement (my.ssa.gov).' },
    { '@type': 'HowToStep', name: 'Add spouse and work information', text: 'Optionally add spouse birth year and benefit for spousal analysis. Indicate if you are still working to see earnings test impact.' },
    { '@type': 'HowToStep', name: 'Review your options', text: 'Compare benefit amounts at 62, FRA, and 70 with break-even analysis and 10-year projection table to determine your optimal claiming age.' },
  ],
}

const trustSignals = ['🏥 2026 Updated', '🔒 Private', '⚡ Instant', '✓ Free']

export default function SocialSecurityPage() {
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
              Social Security Calculator 2026
            </h1>
            <p className="text-lg sm:text-xl text-white/80 mb-6 max-w-2xl mx-auto">
              Calculate your Social Security benefits at age 62, full retirement age, and 70. Break-even analysis and spousal benefit estimates to help you decide when to claim.
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

          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">How Social Security Benefits Are Calculated in 2026</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Social Security retirement benefits are based on your highest 35 years of earnings, indexed for wage growth. The Social Security Administration calculates your Primary Insurance Amount (PIA) — the benefit you receive at your Full Retirement Age. Your actual benefit is then adjusted based on when you claim relative to your FRA.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Claiming before FRA reduces your benefit permanently. The reduction is 5/9 of 1% per month for the first 36 months before FRA, and 5/12 of 1% for additional months. Claiming after FRA increases your benefit by 8% per year (2/3% per month) up to age 70. At 70, delayed retirement credits stop — there is no benefit to waiting beyond 70. In 2026, the 2.5% COLA (Cost of Living Adjustment) has been applied to all benefits.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Important Medicare-Social Security connection: once you claim Social Security, your Medicare Part B premium is automatically deducted from your check. If you delay Social Security past 65, you must enroll in Medicare separately and pay premiums directly. Some beneficiaries in high IRMAA brackets choose to delay Social Security to preserve more control over their Medicare premium situation — consult both a Social Security advisor and Medicare advisor to coordinate these decisions.
            </p>
          </div>

          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Worked Example: When to Claim Social Security</h2>
            <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/40 rounded-2xl p-6">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                James was born in 1959 (FRA: 66 years and 10 months). His SSA statement shows an estimated benefit of $2,800/month at FRA. He is in good health and his father lived to 88. He is considering claiming at 62, FRA, or 70.
              </p>
              <div className="space-y-1 text-sm text-gray-700 dark:text-gray-300 mb-4 font-mono bg-white/60 dark:bg-black/20 rounded-xl px-4 py-3">
                <div>Claim at 62: ~$1,960/month (30% reduction)</div>
                <div>Claim at FRA (66 + 10 mo): $2,800/month</div>
                <div>Claim at 70: ~$3,472/month (24% increase)</div>
                <div className="pt-2">Break-even (62 vs FRA): ~age 80</div>
                <div>Break-even (FRA vs 70): ~age 83</div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                If James lives to 88 (like his father), delaying to 70 produces approximately $62,000 MORE in total lifetime benefits compared to claiming at 62. Given his good health and family longevity, delaying to 70 is likely the optimal strategy — unless he has an urgent need for income before then. If his spouse has a lower benefit, his decision also affects her potential survivor benefit.
              </p>
            </div>
          </div>

          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Key Factors in the Claiming Decision</h2>
            <ul className="space-y-5">
              <li>
                <p className="font-semibold text-gray-900 dark:text-white mb-1">Health and Life Expectancy</p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">The break-even analysis shows that delaying claiming only pays off if you live long enough. For the 62 vs. 67 FRA decision, you typically need to live past 80 for delaying to be beneficial. For 67 vs. 70, past age 83. Consider your health status, family history, and lifestyle factors honestly. Those in poor health with limited life expectancy often benefit from claiming early to maximize total benefits. Those in excellent health with long-lived family histories benefit most from delaying to 70.</p>
              </li>
              <li>
                <p className="font-semibold text-gray-900 dark:text-white mb-1">Spousal Coordination</p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">For married couples, coordinating Social Security claiming between spouses is crucial for maximizing lifetime household income. The spouse with the higher earning record should generally delay as long as possible — their higher benefit becomes the survivor benefit that the surviving spouse may collect for decades. The lower earner might claim earlier to provide household income while the higher earner delays. This coordination can significantly increase total lifetime household Social Security income.</p>
              </li>
              <li>
                <p className="font-semibold text-gray-900 dark:text-white mb-1">Financial Need and Other Income Sources</p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">Mathematical analysis favors delaying Social Security, but practical financial needs matter. If you need income to pay for Medicare premiums, living expenses, or debt while waiting to claim, the cost of dipping into savings to bridge to 70 may outweigh the benefit of higher future checks. The right decision balances lifetime optimization with current cash flow needs. Having substantial retirement savings, a pension, or other income sources makes it easier to delay Social Security strategically.</p>
              </li>
            </ul>
          </div>

          <div className="mb-6">
            <AffiliateCTA headline="Coordinate your Medicare plan with your Social Security timing" />
          </div>

          <div className="pb-10">
            <FAQ questions={faqs} />
          </div>

          <div className="rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 px-6 py-5 mb-10">
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Disclaimer</p>
            <p className="text-sm text-slate-700 dark:text-slate-400 leading-relaxed">
              Social Security benefit estimates are based on the benefit amount you enter and standard SSA formulas for 2026. Actual benefits depend on your complete earnings history. Visit my.ssa.gov for your personalized Social Security statement. Not affiliated with the Social Security Administration or Medicare.
            </p>
          </div>

          <div className="pb-6"><AdBanner slot="3333333333" /></div>
        </div>
      </section>

      <Footer />
    </>
  )
}
