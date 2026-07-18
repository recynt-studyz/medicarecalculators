import type { Metadata } from 'next'
import ToolHeader from '@/components/ToolHeader'
import RetirementIncomeCalculatorWrapper from '@/components/RetirementIncomeCalculatorWrapper'
import AdBanner from '@/components/AdBanner'
import FAQ from '@/components/FAQ'
import type { FaqItem } from '@/components/FAQ'
import Footer from '@/components/Footer'
import AffiliateCTA from '@/components/AffiliateCTA'

export const metadata: Metadata = {
  title: 'Retirement Income Calculator 2026 — Will Your Money Last?',
  description:
    'Calculate how long your retirement savings will last in 2026. Free retirement income calculator with Social Security, Medicare cost integration, and portfolio longevity projections.',
  alternates: { canonical: 'https://medicarecalculators.com/retirement-income' },
  robots: { index: true, follow: true },
}

const faqs: FaqItem[] = [
  {
    q: 'How much money do I need to retire?',
    a: 'A common rule of thumb is to save 10–12 times your final salary before retiring. For example, if you earn $80,000/year, a target of $800,000–$960,000 is a starting point. However, the right number depends on your expected expenses, Social Security income, pension income, healthcare costs, and desired lifestyle. The 4% rule (withdrawing 4% of your portfolio in year one, then adjusting for inflation) has historically sustained portfolios for 30 years in most market scenarios. With longer life expectancies and lower bond yields, some advisors now suggest a 3–3.5% initial withdrawal rate for those retiring in their early 60s. Healthcare — especially Medicare costs and potential long-term care — is often the largest unplanned expense in retirement and deserves specific planning separate from your general living expenses.',
  },
  {
    q: 'What is the 4% rule for retirement withdrawals?',
    a: 'The 4% rule is a guideline suggesting that retirees can withdraw 4% of their portfolio in the first year of retirement, then adjust that dollar amount for inflation each subsequent year, and expect their money to last at least 30 years. It originated from the Trinity Study (1998), which analyzed historical stock and bond returns. For a $1,000,000 portfolio, the 4% rule suggests a $40,000 first-year withdrawal. The rule assumes a balanced portfolio (roughly 60% stocks/40% bonds). Important caveats: it was developed using historical returns that may not repeat; sequence-of-returns risk (poor markets early in retirement) can devastate portfolios even if long-term averages are good; and it does not account for your specific expenses, Social Security income, or healthcare costs. Use the 4% rule as a starting framework, not a guarantee.',
  },
  {
    q: 'How do I factor Medicare costs into retirement planning?',
    a: 'Medicare costs are one of the most underestimated expenses in retirement and should be explicitly planned for. In 2026, the standard Medicare Part B premium is $185/month ($2,220/year). Add a Part D drug plan (~$46.50/month) and a Medigap supplement (Plan G averages $175/month at age 65, rising to $250+ at 75), and total Medicare-related premiums can run $400–$500/month for an individual. Couples pay double. Higher-income retirees also face IRMAA surcharges that can add $74–$450/month per person to Part B. Long-term care — not covered by Medicare — can cost $54,000–$108,000/year for nursing home care. A dedicated healthcare reserve of $300,000–$500,000 per couple, or long-term care insurance, is commonly recommended by financial planners for comprehensive retirement security.',
  },
  {
    q: 'When should I start taking Social Security to maximize retirement income?',
    a: 'The mathematically optimal Social Security claiming age depends primarily on your life expectancy and financial situation. Claiming at 62 permanently reduces your benefit by up to 30% but provides income 5 years earlier. Waiting until Full Retirement Age (66–67) gives you 100% of your earned benefit. Delaying to 70 adds 8% per year beyond FRA, increasing your benefit by 24–32%. For those in good health expecting to live past 80–83, delaying to 70 typically produces the highest lifetime total. For married couples, coordinating is crucial — the higher earner should generally delay as long as possible because their benefit becomes the survivor benefit the spouse may rely on for decades. If you need income and have limited savings to bridge the gap, claiming earlier may be necessary even if mathematically suboptimal. Always model Social Security timing together with RMD planning and IRMAA thresholds.',
  },
  {
    q: 'What is sequence-of-returns risk and how do I protect against it?',
    a: 'Sequence-of-returns risk is the danger that poor investment returns early in retirement can devastate your portfolio even if long-term average returns are fine. If your portfolio drops 30% in your first two years of retirement while you are also making withdrawals, you sell more shares at depressed prices, permanently reducing your capital. A 7% average annual return sounds fine, but if you get -20%, -15%, +25%, +30% in your first four years, the early losses combined with withdrawals cause far more damage than the same returns in reverse order. Strategies to mitigate sequence risk include: keeping 1–2 years of expenses in cash or short-term bonds as a buffer; bucket strategy (short, medium, long-term investment buckets); flexible withdrawal strategies (reducing spending during down markets); and delaying Social Security to maximize guaranteed lifetime income, which reduces portfolio dependence in early retirement.',
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
  name: 'Retirement Income Calculator 2026',
  url: 'https://medicarecalculators.com/retirement-income',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
}

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Calculate Retirement Income Longevity',
  step: [
    { '@type': 'HowToStep', name: 'Enter your savings and income', text: 'Enter your current retirement savings, expected Social Security benefit, and any pension income.' },
    { '@type': 'HowToStep', name: 'Set your expenses and life expectancy', text: 'Enter your expected monthly expenses in retirement and target life expectancy to see how long your portfolio will last.' },
    { '@type': 'HowToStep', name: 'Review projections under 3 scenarios', text: 'See portfolio longevity under conservative (5%), moderate (7%), and optimistic (9%) return scenarios, with Medicare costs integrated.' },
  ],
}

const trustSignals = ['🏥 2026 Updated', '🔒 Private', '⚡ Instant', '✓ Free']

export default function RetirementIncomePage() {
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
              Retirement Income Calculator 2026 — Will Your Money Last?
            </h1>
            <p className="text-lg sm:text-xl text-white/80 mb-6 max-w-2xl mx-auto">
              Calculate how long your retirement savings will last based on Social Security, expenses, and Medicare costs. See portfolio projections under 3 return scenarios.
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
              <RetirementIncomeCalculatorWrapper />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white dark:from-[#0a1929] to-transparent pointer-events-none" />
      </section>

      <section className="bg-white dark:bg-[#0a1929] pt-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="pb-4"><AdBanner slot="2222222222" /></div>

          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">How Retirement Income Planning Works in 2026</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Retirement income planning answers one fundamental question: will your money last as long as you do? The answer depends on four variables working together — how much you have saved, how much you spend, what your guaranteed income sources are (Social Security, pension), and how your investments perform over time. Most retirees dramatically underestimate healthcare costs, which can consume $400–$700/month per person in Medicare premiums alone by age 75, rising significantly with IRMAA surcharges for those with higher incomes.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              The 4% rule remains the most widely cited withdrawal guideline: withdraw 4% of your portfolio in year one, then adjust for inflation annually. A $1,000,000 portfolio supports ~$40,000/year in withdrawals under this rule. However, sequence-of-returns risk — the danger of poor returns in your early retirement years — can shorten portfolio longevity significantly. Our calculator models three return scenarios (conservative 5%, moderate 7%, optimistic 9%) to show the range of outcomes you should plan for, not just the average.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Medicare integration matters: your RMDs increase taxable income and can trigger IRMAA surcharges that raise your Medicare Part B premium. Large RMDs at age 73+ can push income well above the $106,000 single IRMAA threshold, adding hundreds per month to Medicare costs. Coordinating Roth conversions before age 73, timing Social Security claiming, and managing portfolio withdrawals strategically can meaningfully reduce both income taxes and Medicare premium costs in retirement.
            </p>
          </div>

          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Worked Example: Retirement Income at Age 65</h2>
            <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/40 rounded-2xl p-6">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Barbara is 65 with $750,000 in a Traditional IRA. She will claim Social Security at 67 (FRA) for $2,400/month. Her monthly expenses are $5,500. She has Original Medicare with Plan G ($185 + $175 + $46.50 = $406.50/month in premiums).
              </p>
              <div className="space-y-1 text-sm text-gray-700 dark:text-gray-300 mb-4 font-mono bg-white/60 dark:bg-black/20 rounded-xl px-4 py-3">
                <div>Monthly expenses: $5,500</div>
                <div>Medicare premiums: $407/mo</div>
                <div>Total monthly need: $5,907</div>
                <div className="pt-1">Social Security (starting age 67): $2,400/mo</div>
                <div>Monthly gap from portfolio: $3,507/mo</div>
                <div>Annual portfolio withdrawal: ~$42,084</div>
                <div className="pt-2">Portfolio: $750,000</div>
                <div>At 7% return, portfolio lasts to: ~age 94</div>
                <div className="font-bold pt-1">At 5% return, portfolio lasts to: ~age 87</div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Barbara&apos;s situation is solid but not risk-free. At 7% average returns her portfolio likely outlasts her life expectancy. At 5% returns, she may run short around age 87. Her RMDs starting at age 73 will be mandatory — at a 26.5 factor, her $750k IRA generates ~$28,300/year in required withdrawals, potentially triggering IRMAA if her RMD plus Social Security pushes above $106,000. Proactive Roth conversions between ages 65–72 could reduce her future RMD exposure and keep Medicare costs lower.
              </p>
            </div>
          </div>

          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Key Factors in Retirement Income Planning</h2>
            <ul className="space-y-5">
              <li>
                <p className="font-semibold text-gray-900 dark:text-white mb-1">Healthcare Cost Planning</p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">Healthcare is typically the largest unplanned expense in retirement. Original Medicare with Plan G and Part D costs roughly $407/month at age 65 but often rises to $500–$600/month by age 75 as Medigap premiums increase with age. Add IRMAA surcharges and the cost can be $700–$900/month per person for higher-income retirees. Fidelity estimates a 65-year-old couple needs $315,000 specifically for healthcare costs in retirement. Budget conservatively and model your expected Medicare costs using our Part B IRMAA and Medicare Cost calculators as part of your income plan.</p>
              </li>
              <li>
                <p className="font-semibold text-gray-900 dark:text-white mb-1">Roth Conversion Strategy</p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">The years between retirement and age 73 (RMD start age) are a critical window for Roth conversions. Converting Traditional IRA funds to Roth IRA reduces your future RMD obligations, lowers taxable income in later years, eliminates IRMAA risk from mandatory distributions, and creates tax-free income for heirs. The optimal conversion amount each year depends on filling lower tax brackets without crossing into IRMAA territory. A common strategy is converting enough to &quot;top off&quot; the 22% federal bracket — the $94,051–$201,050 single bracket in 2026 — without pushing into 24%+ rates or IRMAA surcharges. A CPA or financial planner can model the optimal conversion path for your situation.</p>
              </li>
              <li>
                <p className="font-semibold text-gray-900 dark:text-white mb-1">Sustainable Withdrawal Rate</p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">The 4% rule was designed for a 30-year retirement horizon. If you retire at 60 and live to 95, a 35-year horizon may call for a 3.3–3.5% initial rate. Conversely, if you retire at 70 with significant Social Security income and modest portfolio dependence, a higher withdrawal rate may be appropriate. Consider a dynamic withdrawal strategy — spending a bit less during market downturns and more in strong years — rather than a fixed dollar withdrawal. This flexibility significantly improves portfolio survival rates. Our calculator&apos;s conservative (5%), moderate (7%), and optimistic (9%) return scenarios help you see the range of outcomes rather than betting on a single projection.</p>
              </li>
            </ul>
          </div>

          <div className="mb-6">
            <AffiliateCTA headline="Coordinate your Medicare coverage with your retirement income plan" />
          </div>

          <div className="pb-10">
            <FAQ questions={faqs} />
          </div>

          <div className="rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 px-6 py-5 mb-10">
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Disclaimer</p>
            <p className="text-sm text-slate-700 dark:text-slate-400 leading-relaxed">
              Retirement income projections are estimates based on assumed rates of return and are not guaranteed. Actual investment returns, inflation, and healthcare costs will vary. This calculator is for educational purposes only and does not constitute financial, tax, or investment advice. Consult a qualified financial advisor for personalized retirement planning. Not affiliated with Medicare or the US government.
            </p>
          </div>

          <div className="pb-6"><AdBanner slot="3333333333" /></div>
        </div>
      </section>

      <Footer />
    </>
  )
}
