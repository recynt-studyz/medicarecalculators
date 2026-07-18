import type { Metadata } from 'next'
import ToolHeader from '@/components/ToolHeader'
import PartDCalculatorWrapper from '@/components/PartDCalculatorWrapper'
import AdBanner from '@/components/AdBanner'
import FAQ from '@/components/FAQ'
import type { FaqItem } from '@/components/FAQ'
import Footer from '@/components/Footer'
import AffiliateCTA from '@/components/AffiliateCTA'

export const metadata: Metadata = {
  title: 'Medicare Part D Calculator 2026 — Prescription Drug Cost Estimator',
  description:
    'Estimate your 2026 Medicare Part D prescription drug costs. Free calculator with Extra Help eligibility check and the new $2,000 out-of-pocket cap explained.',
  alternates: { canonical: 'https://medicarecalculators.com/part-d' },
  robots: { index: true, follow: true },
}

const faqs: FaqItem[] = [
  {
    q: 'What does Medicare Part D cover?',
    a: 'Medicare Part D covers prescription drugs. Part D plans are offered by private insurance companies approved by Medicare and cover both brand-name and generic prescription drugs. Each plan has its own formulary — a list of covered drugs organized into tiers, with different cost sharing at each tier. Tier 1 (preferred generics) typically has the lowest copays ($0–$10/month), while Tier 5 (specialty drugs for conditions like cancer and rheumatoid arthritis) can cost hundreds per month. Part D plans also cover some vaccines, insulin, and drugs used in cancer treatment. Coverage for specific drugs varies by plan.',
  },
  {
    q: 'What is the Medicare Part D deductible for 2026?',
    a: 'The maximum Medicare Part D deductible in 2026 is $590/year. Many plans charge the full maximum deductible, though some plans have lower or $0 deductibles (usually with higher monthly premiums). The deductible applies to most drugs before your plan starts sharing costs, though some plans waive the deductible for lower-tier generics. After meeting your deductible, you pay your plan\'s cost sharing (copays or coinsurance) for each prescription. The 2026 deductible represents a small increase from prior years as Part D deductible limits adjust annually with program cost changes.',
  },
  {
    q: 'What is Extra Help for Medicare Part D?',
    a: 'Extra Help (also called Low Income Subsidy or LIS) is a federal program that helps people with limited income and resources pay for Part D costs. In 2026, you may qualify if your annual income is at or below $23,340 (individual) or $31,860 (couple), with limited assets. With full Extra Help, your monthly premium may be $0–$10, your deductible may be eliminated, and your drug copays may be reduced to $1–$10 for generics and $3–$30 for brand-name drugs. Apply through Social Security at 1-800-772-1213 or ssa.gov. Many eligible beneficiaries don\'t know they qualify — an estimated 2 million Medicare beneficiaries who qualify for Extra Help are not enrolled.',
  },
  {
    q: 'What is the Medicare Part D out-of-pocket cap for 2026?',
    a: 'This is a major new benefit starting in 2024 and fully implemented in 2026. Once you spend $2,000 in out-of-pocket costs on covered Part D drugs in a calendar year, you pay $0 for covered drugs for the rest of the year — no matter how many prescriptions you need. This "catastrophic coverage" threshold replaces the old system where Part D had no true out-of-pocket cap. The $2,000 limit counts your deductible, copays, and coinsurance — not your monthly premium. For Medicare beneficiaries with expensive specialty drugs or brand-name medications, this cap provides significant financial protection.',
  },
  {
    q: 'When can I change my Medicare Part D plan?',
    a: 'You can change your Part D plan during the Annual Enrollment Period (October 15 – December 7), with changes taking effect January 1. You can also change plans during a Special Enrollment Period if you qualify — such as if you move out of your plan\'s service area, lose creditable drug coverage, qualify for Extra Help, or first become eligible for Medicare. There is also a Medicare Advantage Open Enrollment Period (January 1 – March 31) that allows switching between MA plans or from MA to Original Medicare (with a new Part D plan). It\'s worth reviewing your Part D coverage each year during open enrollment, as formularies, premiums, and tier assignments change annually.',
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
  name: 'Medicare Part D Calculator 2026',
  url: 'https://medicarecalculators.com/part-d',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
}

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Estimate Your Medicare Part D Drug Costs',
  step: [
    { '@type': 'HowToStep', name: 'Enter your income for Extra Help eligibility', text: 'Enter your annual income to check if you qualify for Extra Help (Low Income Subsidy), which can reduce Part D costs to near zero.' },
    { '@type': 'HowToStep', name: 'Enter your prescriptions', text: 'Add each prescription by drug tier (1–5) and number of fills per month to estimate annual drug copays.' },
    { '@type': 'HowToStep', name: 'View your total estimated Part D costs', text: 'See your estimated annual Part D costs including premium, deductible, and drug copays — capped at the 2026 $2,000 out-of-pocket limit.' },
  ],
}

const trustSignals = ['🏥 2026 Updated', '🔒 Private', '⚡ Instant', '✓ Free']

export default function PartDPage() {
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
              Medicare Part D Calculator 2026
            </h1>
            <p className="text-lg sm:text-xl text-white/80 mb-6 max-w-2xl mx-auto">
              Estimate your 2026 Medicare Part D prescription drug costs. Includes Extra Help eligibility and the new $2,000 out-of-pocket cap that protects against high drug costs.
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
              <PartDCalculatorWrapper />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white dark:from-[#0a1929] to-transparent pointer-events-none" />
      </section>

      <section className="bg-white dark:bg-[#0a1929] pt-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="pb-4"><AdBanner slot="2222222222" /></div>

          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">How Medicare Part D Works in 2026</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Medicare Part D is prescription drug coverage for Medicare beneficiaries. It is offered through private insurance companies approved by Medicare and is available as a standalone Part D plan (PDP) for Original Medicare beneficiaries, or bundled into a Medicare Advantage plan (MA-PD). In 2026, the average Part D premium is $46.50/month for standalone plans.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Part D plans organize drugs into tiers. Tier 1 (preferred generics) typically costs $4–$10/fill. Tier 2 (generics) costs $10–$20/fill. Tier 3 (preferred brand-name drugs) costs $40–$50/fill. Tier 4 (non-preferred brand drugs) costs $90–$100/fill. Tier 5 (specialty drugs) can cost $200–$500+/fill. Before these copays apply, most plans have a deductible of up to $590/year (some plans waive the deductible for lower-tier generics).
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              The landmark 2026 change: the Inflation Reduction Act capped out-of-pocket drug costs at $2,000/year for Part D enrollees. Once you spend $2,000 on covered drugs, you pay $0 for the rest of the year. This eliminates the previous &quot;donut hole&quot; coverage gap and catastrophic spending phase, providing meaningful protection for beneficiaries with high drug costs. The $2,000 cap includes your deductible and copays — but not your monthly premium.
            </p>
          </div>

          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Worked Example: Part D Drug Costs</h2>
            <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/40 rounded-2xl p-6">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Dorothy is 68 and takes 3 prescriptions: one preferred generic (Tier 1 — $7/fill), one generic (Tier 2 — $15/fill), and one brand-name drug (Tier 3 — $45/fill). Her plan has a $590 deductible and a $42/month premium.
              </p>
              <div className="space-y-1 text-sm text-gray-700 dark:text-gray-300 mb-4 font-mono bg-white/60 dark:bg-black/20 rounded-xl px-4 py-3">
                <div>Annual premium: $42 × 12 = $504</div>
                <div>Annual deductible: $590</div>
                <div>Tier 1 copays: $7 × 12 = $84/year</div>
                <div>Tier 2 copays: $15 × 12 = $180/year</div>
                <div>Tier 3 copays: $45 × 12 = $540/year</div>
                <div>Total drug copays: $804/year</div>
                <div className="font-bold pt-1">TOTAL ANNUAL PART D COST: ~$1,898</div>
                <div className="pt-2 text-gray-500">Well below the $2,000 OOP cap — no catastrophic benefit needed</div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Dorothy&apos;s total Part D spending is manageable. If she were on a specialty drug, her costs might hit the $2,000 cap, after which she pays $0 for the rest of the year. Dorothy should review her Part D plan each year during open enrollment to ensure her drugs are still covered at favorable tiers, as formularies change annually.
              </p>
            </div>
          </div>

          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Key Factors in Your Part D Costs</h2>
            <ul className="space-y-5">
              <li>
                <p className="font-semibold text-gray-900 dark:text-white mb-1">Extra Help (Low Income Subsidy)</p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">If your annual income is at or below $23,340 (individual) or $31,860 (couple), you may qualify for Extra Help — a federal program that can reduce your Part D premium to near $0, eliminate your deductible, and cap your drug copays at $1–$10. An estimated 2 million Medicare beneficiaries qualify for Extra Help but are not enrolled. Apply through Social Security at 1-800-772-1213 or ssa.gov. If approved, you can enroll in a Part D plan at any time — you don&apos;t have to wait for open enrollment.</p>
              </li>
              <li>
                <p className="font-semibold text-gray-900 dark:text-white mb-1">Annual Formulary Review</p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">Your Part D plan&apos;s formulary — the list of covered drugs and their tier assignments — changes every year. A drug covered at Tier 2 this year might move to Tier 3 next year, significantly increasing your cost sharing. Review the Annual Notice of Change (ANOC) sent by your plan each September. During the October 15 – December 7 open enrollment period, use Medicare&apos;s Plan Finder tool at medicare.gov to compare plans based on your specific drugs and preferred pharmacies.</p>
              </li>
              <li>
                <p className="font-semibold text-gray-900 dark:text-white mb-1">Preferred Pharmacy Networks</p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">Most Part D plans have preferred pharmacy networks offering lower cost sharing. Using your plan&apos;s preferred pharmacy can save $5–$20 per prescription compared to a standard network pharmacy. Mail-order pharmacies often offer additional discounts for 90-day supplies of maintenance medications. When comparing Part D plans, check whether your preferred pharmacy is in the plan&apos;s preferred network — this can significantly affect your annual drug costs.</p>
              </li>
            </ul>
          </div>

          <div className="mb-6">
            <AffiliateCTA headline="Compare Part D drug plans to find the best fit for your prescriptions" />
          </div>

          <div className="pb-10">
            <FAQ questions={faqs} />
          </div>

          <div className="rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 px-6 py-5 mb-10">
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Medicare Disclaimer</p>
            <p className="text-sm text-slate-700 dark:text-slate-400 leading-relaxed">
              These calculators provide estimates based on 2026 Medicare data for educational purposes only. Actual drug costs vary by plan and pharmacy. Contact Medicare at 1-800-MEDICARE or medicare.gov for official plan comparison. Not affiliated with Medicare or the US government.
            </p>
          </div>

          <div className="pb-6"><AdBanner slot="3333333333" /></div>
        </div>
      </section>

      <Footer />
    </>
  )
}
