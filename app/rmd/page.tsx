import type { Metadata } from 'next'
import ToolHeader from '@/components/ToolHeader'
import RMDCalculatorWrapper from '@/components/RMDCalculatorWrapper'
import AdBanner from '@/components/AdBanner'
import FAQ from '@/components/FAQ'
import type { FaqItem } from '@/components/FAQ'
import Footer from '@/components/Footer'
import AffiliateCTA from '@/components/AffiliateCTA'

export const metadata: Metadata = {
  title: 'RMD Calculator 2026 — Required Minimum Distribution from IRA and 401k',
  description:
    'Calculate your 2026 Required Minimum Distribution from Traditional IRA, 401k, and 403b accounts. Free RMD calculator with IRS life expectancy tables and future projections.',
  alternates: { canonical: 'https://medicarecalculators.com/rmd' },
  robots: { index: true, follow: true },
}

const faqs: FaqItem[] = [
  {
    q: 'When do I have to start taking RMDs?',
    a: 'Under the SECURE Act 2.0 (signed into law in 2022), Required Minimum Distributions must begin at age 73 if you turned 72 after December 31, 2022. If you turned 72 before 2023, your RMD age remains 72. SECURE Act 2.0 will further raise the RMD age to 75 in 2033. Your first RMD must be taken by April 1 of the year following the year you reach your RMD age. However, delaying your first RMD until April 1 means you\'ll have two RMDs in that second year (first year + second year), which may push you into a higher tax bracket. After the first year, all subsequent RMDs must be taken by December 31 each year.',
  },
  {
    q: 'How is my RMD calculated?',
    a: 'Your RMD is calculated by dividing your account balance (as of December 31 of the prior year) by your life expectancy factor from the IRS Uniform Lifetime Table. For example, if your account balance is $500,000 and you are age 73, the life expectancy factor is 26.5, so your RMD is $500,000 ÷ 26.5 = $18,868. You must calculate RMDs separately for each account, though you can take the total amount from one or more Traditional IRA accounts. For 401k accounts, the RMD must generally be taken from each 401k plan separately. The life expectancy factor decreases each year as you age, resulting in progressively larger RMD percentages.',
  },
  {
    q: 'What happens if I miss my RMD?',
    a: 'Failing to take your full RMD results in a steep IRS penalty: a 25% excise tax on the amount that should have been withdrawn but wasn\'t. For example, if your RMD is $20,000 and you only withdraw $10,000, the penalty is $2,500 (25% of $10,000). SECURE Act 2.0 reduced this penalty from 50% to 25%, and further reduces it to 10% if you correct the error within the Correction Window (2 years after the missed RMD). If you miss an RMD, file IRS Form 5329 with your tax return and request a penalty waiver — the IRS often grants waivers for first-time mistakes with a legitimate reason.',
  },
  {
    q: 'Do Roth IRAs require RMDs?',
    a: 'No — Roth IRAs do NOT require RMDs during your lifetime. This is one of the key advantages of Roth IRAs for retirees who do not need the money for living expenses. However, Roth 401k accounts (traditional 401k with Roth contributions) did historically require RMDs, though SECURE Act 2.0 eliminated RMDs for Roth 401k accounts starting in 2024. Inherited Roth IRAs from a non-spouse are subject to distribution rules. If you have substantial Traditional IRA or 401k assets and want to reduce future RMD obligations, consider Roth conversions in years before your RMD age — converting to Roth reduces your future Traditional IRA balance subject to RMDs.',
  },
  {
    q: 'Can I take more than my RMD?',
    a: 'Yes — you can always take more than your required minimum distribution. The RMD is simply the minimum you must withdraw. Taking more than the RMD can be beneficial for tax planning (filling up lower tax brackets in lower-income years), Roth conversion strategies (converting excess withdrawals to a Roth IRA), or simply meeting living expenses. There is no penalty for withdrawing more than your RMD — you just pay ordinary income tax on the full amount withdrawn. However, note that excess withdrawals cannot be "carried forward" to reduce future RMDs — each year\'s RMD is calculated fresh based on that year\'s December 31 balance.',
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
  name: 'RMD Calculator 2026',
  url: 'https://medicarecalculators.com/rmd',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
}

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Calculate Your Required Minimum Distribution',
  step: [
    { '@type': 'HowToStep', name: 'Enter your age and account balance', text: 'Enter your current age and the December 31 prior-year balance of your Traditional IRA, 401k, or 403b account.' },
    { '@type': 'HowToStep', name: 'Select your account type', text: 'Select Traditional IRA, 401k, 403b, Inherited IRA, or Roth IRA. Roth IRAs have no RMD requirement.' },
    { '@type': 'HowToStep', name: 'View your RMD and projections', text: 'See your 2026 RMD amount, estimated tax impact, and future RMD projections through age 85 based on assumed portfolio growth.' },
  ],
}

const trustSignals = ['🏥 2026 Updated', '🔒 Private', '⚡ Instant', '✓ Free']

export default function RMDPage() {
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
              RMD Calculator 2026 — Required Minimum Distributions
            </h1>
            <p className="text-lg sm:text-xl text-white/80 mb-6 max-w-2xl mx-auto">
              Calculate your 2026 Required Minimum Distribution from IRA, 401k, and 403b accounts using current IRS life expectancy tables. Includes tax estimate and future projections.
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
              <RMDCalculatorWrapper />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white dark:from-[#0a1929] to-transparent pointer-events-none" />
      </section>

      <section className="bg-white dark:bg-[#0a1929] pt-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="pb-4"><AdBanner slot="2222222222" /></div>

          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">How Required Minimum Distributions Work in 2026</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              The IRS requires that you withdraw a minimum amount from your Traditional IRA, 401k, 403b, and most other pre-tax retirement accounts each year starting at age 73 (under SECURE Act 2.0 rules for those reaching 72 after 2022). This ensures that money in tax-deferred retirement accounts is eventually taxed. The RMD amount increases as a percentage of your account balance each year as your life expectancy factor decreases.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              The calculation is straightforward: RMD = Account Balance ÷ Life Expectancy Factor. The IRS Uniform Lifetime Table provides the factor for each age. At age 73, the factor is 26.5 (meaning you withdraw approximately 3.77% of your balance). At age 80, the factor drops to 20.2 (4.95%). At age 85, it is 16.0 (6.25%). Each year&apos;s RMD is calculated using the December 31 balance from the prior year.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Medicare impact: your RMD is added to your taxable income, potentially affecting your Part B IRMAA surcharge. Large RMDs can push you into a higher IRMAA bracket, adding $74–$450/month to your Medicare Part B premium. This is why proactive retirement income planning — including Roth conversions before RMD age — can significantly reduce both your tax burden and your Medicare costs. Use our IRMAA calculator to see how your RMD affects your Medicare premiums.
            </p>
          </div>

          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Worked Example: RMD Calculation at Age 73</h2>
            <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/40 rounded-2xl p-6">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Edward is 73 with a Traditional IRA balance of $650,000 as of December 31, 2025. He also has $180,000 in Social Security income and pension, putting him in the 22% tax bracket.
              </p>
              <div className="space-y-1 text-sm text-gray-700 dark:text-gray-300 mb-4 font-mono bg-white/60 dark:bg-black/20 rounded-xl px-4 py-3">
                <div>IRA balance (Dec 31, 2025): $650,000</div>
                <div>Age 73 life expectancy factor: 26.5</div>
                <div>RMD = $650,000 ÷ 26.5 = $24,528</div>
                <div className="pt-1">Monthly equivalent: $2,044/month</div>
                <div className="pt-2">Other income: $60,000/year</div>
                <div>Total with RMD: ~$84,528</div>
                <div>Estimated federal tax on RMD: ~$5,396 (22% bracket)</div>
                <div className="font-bold pt-1">Net after tax: ~$19,132 from RMD</div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Edward&apos;s $24,528 RMD is mandatory — he must take it or face a 25% excise tax penalty. His combined income of $84,528 is well below the $106,000 IRMAA threshold, so his Medicare Part B premium stays at $185/month. If his RMD had pushed income above $106,000, he would trigger an additional $74/month in IRMAA surcharges ($888/year).
              </p>
            </div>
          </div>

          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Key RMD Planning Strategies</h2>
            <ul className="space-y-5">
              <li>
                <p className="font-semibold text-gray-900 dark:text-white mb-1">Roth Conversions Before Age 73</p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">The years between retirement and age 73 are a valuable window for Roth conversions — converting Traditional IRA funds to Roth IRA. Roth IRAs have no RMD requirements, and Roth withdrawals don&apos;t count toward IRMAA. By systematically converting IRA funds to Roth during lower-income retirement years, you reduce the account balance subject to future RMDs, potentially reducing taxes and Medicare premiums for decades. Work with a tax advisor to optimize conversion amounts based on bracket management and IRMAA thresholds.</p>
              </li>
              <li>
                <p className="font-semibold text-gray-900 dark:text-white mb-1">Qualified Charitable Distributions (QCDs)</p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">If you are 70½ or older and charitably inclined, Qualified Charitable Distributions allow you to transfer up to $105,000/year directly from your IRA to a qualified charity. The QCD counts toward your RMD but is excluded from taxable income — a significant advantage over taking the RMD and then donating. This strategy works best for seniors who don&apos;t itemize deductions (since the standard deduction is typically more advantageous) and who regularly donate to qualified charities.</p>
              </li>
              <li>
                <p className="font-semibold text-gray-900 dark:text-white mb-1">RMDs and Medicare IRMAA</p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">Your RMD is included in your MAGI, which determines your Medicare IRMAA surcharge with a 2-year lookback. A large RMD this year could increase your Medicare premiums 2 years from now. For those with accounts that may generate large RMDs, proactive planning — Roth conversions, IRA distributions before RMD age, QCDs — can keep income below IRMAA thresholds and save hundreds per month in Medicare premiums. Use our Part B IRMAA calculator to see how your expected RMDs might affect your future Medicare costs.</p>
              </li>
            </ul>
          </div>

          <div className="mb-6">
            <AffiliateCTA headline="Plan your Medicare costs alongside your RMD and retirement income strategy" />
          </div>

          <div className="pb-10">
            <FAQ questions={faqs} />
          </div>

          <div className="rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 px-6 py-5 mb-10">
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Disclaimer</p>
            <p className="text-sm text-slate-700 dark:text-slate-400 leading-relaxed">
              RMD calculations use 2026 IRS Uniform Lifetime Table factors for illustrative purposes. For inherited IRAs or spouses more than 10 years younger, different tables apply. Consult a qualified financial advisor or tax professional for personalized RMD planning. Not affiliated with Medicare or the US government.
            </p>
          </div>

          <div className="pb-6"><AdBanner slot="3333333333" /></div>
        </div>
      </section>

      <Footer />
    </>
  )
}
