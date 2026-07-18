import type { Metadata } from 'next'
import ToolHeader from '@/components/ToolHeader'
import MedigapCalculatorWrapper from '@/components/MedigapCalculatorWrapper'
import AdBanner from '@/components/AdBanner'
import FAQ from '@/components/FAQ'
import type { FaqItem } from '@/components/FAQ'
import Footer from '@/components/Footer'
import AffiliateCTA from '@/components/AffiliateCTA'

export const metadata: Metadata = {
  title: 'Medigap Calculator 2026 — Medicare Supplement Plan Comparison',
  description:
    'Compare 2026 Medigap Medicare supplement plans including Plan G, Plan N, and Plan A. Free calculator with estimated premiums by age and state.',
  alternates: { canonical: 'https://medicarecalculators.com/medigap' },
  robots: { index: true, follow: true },
}

const faqs: FaqItem[] = [
  {
    q: 'What is Medigap or Medicare Supplement insurance?',
    a: 'Medigap (also called Medicare Supplement insurance) is private health insurance that fills the "gaps" in Original Medicare coverage — the deductibles, copayments, and coinsurance that Medicare Parts A and B don\'t fully cover. Medigap plans are sold by private insurance companies but are standardized by the federal government — Plan G from any insurer provides identical coverage, though premiums vary. Medigap does NOT work with Medicare Advantage plans; it is only for people with Original Medicare. Common coverage gaps Medigap fills include the Part A hospital deductible ($1,676 per benefit period in 2026), Part B coinsurance (20% after deductible), and extended hospital stays beyond 60 days.',
  },
  {
    q: 'What is the difference between Plan G and Plan N?',
    a: 'Plan G and Plan N are the two most popular Medigap plans for new Medicare beneficiaries. Plan G is the most comprehensive option available to those new to Medicare — it covers everything except the $257 annual Part B deductible. After paying that deductible, you pay $0 for all Medicare-approved services. Plan N provides the same basic coverage but adds copays of up to $20 for office visits and $50 for ER visits (waived if you are admitted). Plan N does not cover Part B excess charges. Plan N premiums are typically $30–$60/month less than Plan G at age 65. Choose Plan G if you want maximum coverage and predictable costs; choose Plan N if you are healthy and want lower premiums while accepting modest copays.',
  },
  {
    q: 'When is the best time to buy a Medigap plan?',
    a: 'The best time to buy Medigap is during your 6-month Medigap Open Enrollment Period, which starts the first month you are 65 or older and enrolled in Medicare Part B. During this window, insurance companies cannot deny your Medigap application or charge you more based on pre-existing health conditions — this is called guaranteed issue. After this window closes, companies in most states can use medical underwriting, potentially denying coverage or charging higher premiums if you have health conditions. If you are approaching 65, research Medigap plans now so you are ready to enroll as soon as your Part B coverage begins.',
  },
  {
    q: 'Can I be denied Medigap coverage?',
    a: 'During your initial 6-month Medigap Open Enrollment Period, insurers CANNOT deny your application or charge more due to health conditions. Outside this window, in most states, insurers CAN use medical underwriting and deny coverage or charge higher premiums based on health status. There are exceptions: several states (Connecticut, Massachusetts, Maine, Minnesota, New York, Vermont, Washington) require community rating and offer stronger guaranteed issue rights regardless of health status. Additionally, certain federal rights guarantee acceptance when you lose coverage due to specific situations — such as losing Medicare Advantage coverage, losing employer coverage, or moving out of a plan\'s service area.',
  },
  {
    q: 'Is Medicare Supplement the same as Medigap?',
    a: 'Yes — Medigap and Medicare Supplement insurance refer to the same type of product. Both terms are used interchangeably for private insurance policies that supplement Original Medicare by covering deductibles, coinsurance, and other cost-sharing. The name "Medigap" emphasizes that the insurance fills the "gaps" in Medicare coverage. Insurance companies, agents, and Medicare all use both terms. Medigap policies have standardized plan letters (A, B, D, G, K, L, M, N) — the same letter plan provides identical coverage regardless of which insurance company sells it, though premiums vary significantly between companies.',
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
  name: 'Medigap Calculator 2026',
  url: 'https://medicarecalculators.com/medigap',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
}

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Compare Medigap Plans',
  step: [
    { '@type': 'HowToStep', name: 'Enter your personal information', text: 'Enter your age, state, gender, and tobacco use to get estimated premiums.' },
    { '@type': 'HowToStep', name: 'Select your plan preference', text: 'Choose "Help me choose" for a recommendation or select Plan G, N, or A to see specific coverage and estimated costs.' },
    { '@type': 'HowToStep', name: 'Review and get quotes', text: 'See plan comparison, coverage details, and estimated premiums, then compare actual quotes from multiple insurers.' },
  ],
}

const trustSignals = ['🏥 2026 Updated', '🔒 Private', '⚡ Instant', '✓ Free']

const STATE_LIST = [
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

export default function MedigapPage() {
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
              Medigap Calculator 2026 — Medicare Supplement Plans
            </h1>
            <p className="text-lg sm:text-xl text-white/80 mb-6 max-w-2xl mx-auto">
              Compare Medigap Plan G, Plan N, and Plan A coverage and estimated premiums. Find the best Medicare supplement plan for your budget and health needs.
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
              <MedigapCalculatorWrapper />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white dark:from-[#0a1929] to-transparent pointer-events-none" />
      </section>

      <section className="bg-white dark:bg-[#0a1929] pt-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="pb-4"><AdBanner slot="2222222222" /></div>

          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">How Medigap Plans Work in 2026</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Original Medicare covers most medical costs, but it does not cover everything. After meeting the Part B deductible ($257/year in 2026), you still pay 20% of all Medicare-approved services — with no annual out-of-pocket maximum. A single major surgery or hospitalization can cost thousands in out-of-pocket expenses. Medigap insurance fills these gaps by covering your cost-sharing obligations, giving you more predictable healthcare costs.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Medigap plans are standardized by the federal government, meaning Plan G from Company A covers exactly the same services as Plan G from Company B — only the premium differs. This makes comparison shopping straightforward: get quotes for the same plan from multiple insurers and choose the lowest premium. Currently, the most popular plans for new Medicare beneficiaries are Plan G (most comprehensive) and Plan N (lower premium with modest copays).
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              The critical timing issue: your 6-month Medigap Open Enrollment Period starts the first month you are 65 or older AND enrolled in Part B. During this window, insurers must accept your application at the same rate as any healthy enrollee — regardless of health status. Miss this window, and companies in most states can charge more or deny coverage based on your health history. Buying Medigap at 65 during open enrollment, even before you need it, is almost always the right strategy.
            </p>
          </div>

          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Worked Example: Choosing Between Plan G and Plan N</h2>
            <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/40 rounded-2xl p-6">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Susan is 65 and enrolling in Medicare. She sees her doctor about 8 times per year and takes 2 maintenance prescriptions. She wants Medigap coverage for predictable costs. Plan G quotes: $165/month. Plan N quotes: $125/month ($40/month less).
              </p>
              <div className="space-y-1 text-sm text-gray-700 dark:text-gray-300 mb-4 font-mono bg-white/60 dark:bg-black/20 rounded-xl px-4 py-3">
                <div>Plan G annual premium: $165 × 12 = $1,980</div>
                <div>Plan N annual premium: $125 × 12 = $1,500</div>
                <div>Annual premium savings with Plan N: $480</div>
                <div className="pt-1">Plan N copays: 8 visits × $20 = $160/year</div>
                <div>Net annual savings with Plan N: $480 − $160 = $320</div>
                <div className="font-bold pt-1">Plan N saves $320/year if healthy</div>
                <div className="pt-2 text-gray-500">If Susan has a specialist-heavy year: copays could close the gap</div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                For Susan in good health, Plan N saves $320/year. However, if her health changes and she needs frequent specialist visits, Plan N&apos;s copays ($20 each) can add up. Plan G is the better choice for those who value simplicity and worst-case protection, while Plan N works well for healthier seniors comfortable with modest copays.
              </p>
            </div>
          </div>

          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Key Factors in Medigap Plan Selection</h2>
            <ul className="space-y-5">
              <li>
                <p className="font-semibold text-gray-900 dark:text-white mb-1">Open Enrollment Timing Is Critical</p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">Your Medigap open enrollment window is one-time — 6 months starting when you have both Part B and are 65+. During this window, guaranteed issue rights protect you. After it closes, most states allow medical underwriting, meaning a new diagnosis (cancer, diabetes, heart disease) can make Medigap unavailable or very expensive. Buy during open enrollment at 65 even if you are healthy — the cost of waiting can be enormous if your health changes.</p>
              </li>
              <li>
                <p className="font-semibold text-gray-900 dark:text-white mb-1">Premium Rate Increases Over Time</p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">Most Medigap plans use attained-age rating, meaning your premium increases each year as you age. A Plan G policy at $165/month at age 65 might cost $250/month by age 75 and $350/month by age 85. Community-rated states (CT, MA, ME, MN, NY, VT, WA) require the same premium regardless of age. When comparing plans, ask about historical rate increase trends — some insurers are more aggressive than others in raising premiums over time.</p>
              </li>
              <li>
                <p className="font-semibold text-gray-900 dark:text-white mb-1">Plan F vs. Plan G</p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">Plan F was the most popular Medigap plan for decades — it covers everything including the Part B deductible. However, Plan F is no longer available to people who became eligible for Medicare on or after January 1, 2020. If you are new to Medicare (turned 65 in 2020 or later), Plan G is now the most comprehensive available plan. Plan G covers everything Plan F covered except the $257 annual Part B deductible — a simple calculation: if Plan G costs more than $257 less per year than Plan F, Plan G is the better value.</p>
              </li>
            </ul>
          </div>

          <div className="mb-6">
            <AffiliateCTA headline="Get Medigap quotes from multiple insurers — free comparison" />
          </div>

          <div className="pb-10">
            <FAQ questions={faqs} />
          </div>

          <div className="rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 px-6 py-5 mb-10">
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Medicare Disclaimer</p>
            <p className="text-sm text-slate-700 dark:text-slate-400 leading-relaxed">
              These calculators provide estimates based on 2026 Medicare data for educational purposes only. Actual Medigap premiums vary by insurer, age, state, and health status. Contact Medicare at 1-800-MEDICARE or medicare.gov for official information. Consult a licensed Medicare advisor for personalized Medigap plan comparison. Not affiliated with Medicare or the US government.
            </p>
          </div>

          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Medigap Plans by State</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Medigap premiums and regulations vary by state. Seven states (CT, MA, ME, MN, NY, VT, WA) require community rating. Select your state for local Medigap plan details, estimated premiums, and SHIP counseling contact information.
            </p>
            <div className="flex flex-wrap gap-2">
              {STATE_LIST.map(({ slug, name }) => (
                <a key={slug} href={`/${slug}-medigap-plans`}
                  className="text-xs px-3 py-1.5 rounded-full border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-[#0f4c75] hover:text-white hover:border-[#0f4c75] transition-colors">
                  {name}
                </a>
              ))}
            </div>
          </div>

          <div className="pb-6"><AdBanner slot="3333333333" /></div>
        </div>
      </section>

      <Footer />
    </>
  )
}
