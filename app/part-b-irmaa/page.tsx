import type { Metadata } from 'next'
import ToolHeader from '@/components/ToolHeader'
import PartBIRMAACalculatorWrapper from '@/components/PartBIRMAACalculatorWrapper'
import AdBanner from '@/components/AdBanner'
import FAQ from '@/components/FAQ'
import type { FaqItem } from '@/components/FAQ'
import Footer from '@/components/Footer'
import AffiliateCTA from '@/components/AffiliateCTA'

export const metadata: Metadata = {
  title: 'Medicare Part B IRMAA Calculator 2026 — Income-Related Premium Surcharge',
  description:
    'Calculate your 2026 Medicare Part B IRMAA surcharge. Free calculator with all income brackets and how life-changing events reduce your premium surcharge.',
  alternates: { canonical: 'https://medicarecalculators.com/part-b-irmaa' },
  robots: { index: true, follow: true },
}

const faqs: FaqItem[] = [
  {
    q: 'What is the Medicare IRMAA surcharge?',
    a: 'IRMAA stands for Income-Related Monthly Adjustment Amount. It is an additional premium surcharge added to your standard Medicare Part B (and Part D) premium if your income exceeds certain thresholds. In 2026, beneficiaries with incomes above $106,000 (single) or $212,000 (married filing jointly) pay IRMAA surcharges on their Part B premium, ranging from $74/month to $450/month extra. IRMAA is designed to have higher-income Medicare beneficiaries pay a larger share of Part B program costs. Approximately 8% of all Medicare beneficiaries pay IRMAA surcharges.',
  },
  {
    q: 'How is my Part B IRMAA calculated?',
    a: 'Medicare uses your Modified Adjusted Gross Income (MAGI) from your federal tax return 2 years prior to calculate IRMAA. For 2026 IRMAA, Medicare uses your 2024 MAGI. MAGI includes your adjusted gross income plus any tax-exempt interest income (such as from municipal bonds). If your 2024 MAGI exceeds the threshold for your filing status, Social Security notifies you of your IRMAA determination, and your Part B premium automatically increases. You do not need to do anything — the higher premium is deducted from your Social Security check or billed directly if you do not receive Social Security.',
  },
  {
    q: 'Can I appeal my IRMAA determination?',
    a: 'Yes — if you experienced a qualifying life changing event that reduced your income since the year used to calculate your IRMAA, you can appeal using SSA Form SSA-44 (Medicare Income-Related Monthly Adjustment Amount — Life-Changing Event). Qualifying events include marriage, divorce/annulment, death of a spouse, work reduction, work stoppage, loss of pension, and certain employer settlement payments. If approved, Social Security will use a more recent year\'s income to recalculate your IRMAA. File your appeal as soon as possible after the life changing event. Contact Social Security at 1-800-772-1213 or visit ssa.gov.',
  },
  {
    q: 'What income is used for IRMAA calculation?',
    a: 'IRMAA is based on your Modified Adjusted Gross Income (MAGI) from 2 years prior. For 2026 IRMAA, this means your 2024 MAGI from your tax return. MAGI for IRMAA purposes is your adjusted gross income (Line 11 of Form 1040) plus any tax-exempt interest income (Line 2a). Common income sources that affect MAGI include wages and salaries, self-employment income, pension and IRA distributions, capital gains and dividends, interest income, and Roth IRA conversions. Note that Social Security benefits are included only to the extent they are taxable. Roth IRA withdrawals, on the other hand, do NOT count as MAGI and do not affect IRMAA.',
  },
  {
    q: 'What is a life-changing event for IRMAA purposes?',
    a: 'The Social Security Administration recognizes specific qualifying life-changing events that can allow you to appeal your IRMAA determination based on more current income: (1) Marriage; (2) Divorce or annulment; (3) Death of your spouse; (4) Work reduction — you or your spouse stopped working or reduced work hours; (5) Work stoppage — you or your spouse stopped working; (6) Loss of pension — your or your spouse\'s employer went bankrupt or you lost pension benefits; (7) Employer settlement payment from your employer. These events must have resulted in a significant income reduction. File SSA Form SSA-44 with documentation of the event and your expected current income.',
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
  name: 'Medicare Part B IRMAA Calculator 2026',
  url: 'https://medicarecalculators.com/part-b-irmaa',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
}

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Calculate Your Medicare Part B IRMAA',
  step: [
    { '@type': 'HowToStep', name: 'Enter your 2024 MAGI', text: 'Enter your 2024 Modified Adjusted Gross Income from your tax return. For 2026 IRMAA, Medicare uses your 2024 income.' },
    { '@type': 'HowToStep', name: 'Select your filing status', text: 'Choose Single, Married Filing Jointly, or Married Filing Separately. MFJ doubles the income thresholds for each IRMAA bracket.' },
    { '@type': 'HowToStep', name: 'Review your bracket and premium', text: 'See which IRMAA bracket you fall in, your total Part B premium, and whether you qualify to appeal based on a life-changing event.' },
  ],
}

const trustSignals = ['🏥 2026 Updated', '🔒 Private', '⚡ Instant', '✓ Free']

export default function PartBIRMAAPage() {
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
              Medicare Part B IRMAA Calculator 2026
            </h1>
            <p className="text-lg sm:text-xl text-white/80 mb-6 max-w-2xl mx-auto">
              Calculate your income-related Medicare Part B premium surcharge for 2026. See all IRMAA brackets, your bracket, and appeal options if your income has changed.
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
              <PartBIRMAACalculatorWrapper />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white dark:from-[#0a1929] to-transparent pointer-events-none" />
      </section>

      <section className="bg-white dark:bg-[#0a1929] pt-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="pb-4"><AdBanner slot="2222222222" /></div>

          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">How Medicare IRMAA Is Calculated in 2026</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              IRMAA (Income-Related Monthly Adjustment Amount) is an additional premium added to your Medicare Part B and Part D costs if your income exceeds certain thresholds. Medicare uses a 2-year lookback — your 2026 IRMAA is based on your 2024 Modified Adjusted Gross Income (MAGI) as reported to the IRS. Social Security receives this data from the IRS and sends you an IRMAA determination letter if your income triggers the surcharge.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              In 2026, the standard Part B premium is $185/month. IRMAA surcharges create five additional tiers based on income. For single filers, IRMAA begins when your 2024 MAGI exceeds $106,000 — adding $74/month for a total of $259/month. The highest IRMAA bracket ($500,000+ for singles) adds $450/month for a total Part B premium of $635/month. Married filing jointly beneficiaries have double the income thresholds. Married filing separately filers use the same thresholds as single filers (a significant financial planning consideration).
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Key planning insight: IRMAA uses cliff brackets, not marginal rates. One dollar over the threshold can cost you an extra $74/month ($888/year) in Medicare premiums. This creates important income management opportunities for pre-retirees and retirees — Roth conversions, capital gains timing, and retirement account withdrawal strategies can all be planned around IRMAA thresholds. Importantly, Roth IRA withdrawals do NOT count toward MAGI for IRMAA purposes.
            </p>
          </div>

          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Worked Example: Robert&apos;s IRMAA Situation</h2>
            <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/40 rounded-2xl p-6">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Robert retired in 2024 from his job as a school principal. In 2024, he earned $128,000 from his salary (his last year of full employment). He turns 65 in 2026 and enrolls in Medicare.
              </p>
              <div className="space-y-1 text-sm text-gray-700 dark:text-gray-300 mb-4 font-mono bg-white/60 dark:bg-black/20 rounded-xl px-4 py-3">
                <div>2024 MAGI: $128,000 (single filer)</div>
                <div>IRMAA bracket: $106,001–$133,000</div>
                <div>Standard Part B: $185.00/month</div>
                <div>IRMAA surcharge: +$74.00/month</div>
                <div className="font-bold pt-1">Robert's 2026 Part B premium: $259.00/month</div>
                <div className="pt-2 text-gray-500">BUT his 2025 income will be ~$55,000 (retirement income only)</div>
                <div>Robert can file SSA-44 (work reduction/stoppage) to appeal</div>
                <div>If approved: reduced back to $185.00/month</div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Robert should file SSA Form SSA-44 immediately when he enrolls in Medicare, documenting his work stoppage and providing his expected 2025 income. If approved, his Part B premium drops to $185/month, saving $74/month ($888/year). This is exactly what the life-changing event appeal process is designed for.
              </p>
            </div>
          </div>

          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Key Factors in Your IRMAA Calculation</h2>
            <ul className="space-y-5">
              <li>
                <p className="font-semibold text-gray-900 dark:text-white mb-1">The 2-Year Lookback Rule</p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">Medicare always uses income from 2 years ago. Your 2026 IRMAA is based on 2024 income. If you recently retired and your income has dropped significantly, you are likely being charged IRMAA based on your higher pre-retirement income. This is exactly when to appeal using SSA Form SSA-44 with your work stoppage or reduction documentation. The appeal can save thousands annually.</p>
              </li>
              <li>
                <p className="font-semibold text-gray-900 dark:text-white mb-1">Cliff Brackets (Not Marginal)</p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">IRMAA uses cliff thresholds — one dollar over the limit puts your entire premium into the higher bracket. If your income is near a threshold, consider income-reduction strategies: delaying year-end capital gains to January, bunching deductions, maximizing pre-tax retirement contributions, or timing IRA withdrawals carefully. A $1,000 income reduction at the right time can save $888 or more in annual Medicare premiums.</p>
              </li>
              <li>
                <p className="font-semibold text-gray-900 dark:text-white mb-1">Roth Conversions and IRMAA</p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">Roth IRA conversions increase your MAGI in the year of conversion, potentially triggering or increasing IRMAA surcharges 2 years later. However, Roth IRA withdrawals (after conversion) are tax-free and do NOT count toward MAGI. This makes Roth conversion timing particularly important for retirees approaching Medicare age — converting in years before Medicare enrollment or in lower-income years after enrollment can avoid IRMAA while still building tax-free assets.</p>
              </li>
            </ul>
          </div>

          <div className="mb-6">
            <AffiliateCTA headline="Need help managing your Medicare costs and IRMAA?" />
          </div>

          <div className="pb-10">
            <FAQ questions={faqs} />
          </div>

          <div className="rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 px-6 py-5 mb-10">
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Medicare Disclaimer</p>
            <p className="text-sm text-slate-700 dark:text-slate-400 leading-relaxed">
              These calculators provide estimates based on 2026 Medicare data for educational purposes only. Contact Medicare at 1-800-MEDICARE or medicare.gov for official information. Consult a licensed Medicare advisor for personalized IRMAA planning. Not affiliated with Medicare or the US government.
            </p>
          </div>

          <div className="pb-6"><AdBanner slot="3333333333" /></div>
        </div>
      </section>

      <Footer />
    </>
  )
}
