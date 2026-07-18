import type { Metadata } from 'next'
import ToolHeader from '@/components/ToolHeader'
import AdvantageVsOriginalCalculatorWrapper from '@/components/AdvantageVsOriginalCalculatorWrapper'
import AdBanner from '@/components/AdBanner'
import FAQ from '@/components/FAQ'
import type { FaqItem } from '@/components/FAQ'
import Footer from '@/components/Footer'
import AffiliateCTA from '@/components/AffiliateCTA'

export const metadata: Metadata = {
  title: 'Medicare Advantage vs Original Medicare Calculator 2026 — Which Is Better?',
  description:
    'Compare Medicare Advantage vs Original Medicare for 2026. Free calculator with total cost comparison, coverage differences, and a personalized recommendation.',
  alternates: { canonical: 'https://medicarecalculators.com/advantage-vs-original' },
  robots: { index: true, follow: true },
}

const faqs: FaqItem[] = [
  {
    q: 'What is the difference between Medicare Advantage and Original Medicare?',
    a: 'Original Medicare (Parts A and B) is administered directly by the federal government. It lets you see any doctor or hospital that accepts Medicare nationwide — there are no networks. You typically add a Part D drug plan and a Medigap supplement for comprehensive coverage. Medicare Advantage (Part C) is private insurance that bundles Parts A, B, and usually D into one plan. MA plans typically have lower monthly premiums but use provider networks, often require referrals and prior authorization, and have annual out-of-pocket maximums. Original Medicare offers more flexibility; Medicare Advantage offers lower premiums and extra benefits.',
  },
  {
    q: 'Can I switch between Medicare Advantage and Original Medicare?',
    a: 'Yes. The Annual Enrollment Period (October 15 – December 7) allows you to switch between Original Medicare and Medicare Advantage, or change Medicare Advantage plans. Coverage changes take effect January 1. There is also a Medicare Advantage Open Enrollment Period (January 1 – March 31) that allows you to switch from an MA plan to Original Medicare or to a different MA plan. If you switch from MA back to Original Medicare, buying a Medigap supplement can be difficult — in most states, insurers can use medical underwriting outside your initial enrollment period, potentially denying coverage based on health conditions.',
  },
  {
    q: 'Does Medicare Advantage cover dental and vision?',
    a: 'Most Medicare Advantage plans include extra benefits that Original Medicare does not cover. Commonly included extras: preventive dental care (cleanings and exams), vision care (eye exams and glasses/contacts allowance), hearing benefits (hearing exams and aid allowances), fitness memberships (like SilverSneakers), and over-the-counter product allowances. The extent of these benefits varies significantly by plan and insurer. Some plans include comprehensive dental while others cover only preventive care. Compare specific plan benefits at medicare.gov during enrollment periods or contact a licensed Medicare advisor for plan-specific information.',
  },
  {
    q: 'What is a Medicare Advantage network?',
    a: 'A Medicare Advantage network is the group of doctors, hospitals, and other healthcare providers that have contracted with the insurance company. HMO (Health Maintenance Organization) plans require you to use network providers for all care except emergencies, and usually require a primary care physician referral to see specialists. PPO (Preferred Provider Organization) plans let you see out-of-network providers but at higher cost sharing. PFFS (Private Fee for Service) plans let you see any Medicare-participating provider who accepts the plan\'s terms. If you have existing specialist relationships or a preferred hospital, verify network inclusion before joining an MA plan.',
  },
  {
    q: 'Which Medicare plan is best for me?',
    a: 'The best Medicare plan depends on your individual health needs, finances, and preferences. Original Medicare with Medigap (Plan G) is typically better if: you have complex medical needs requiring specialists, you travel frequently and need nationwide coverage, you want predictable costs with no prior authorization, or you want the freedom to see any Medicare-accepting doctor. Medicare Advantage may be better if: you are in good health, you are comfortable with a provider network, you want lower monthly premiums, or you want extra benefits like dental, vision, and hearing. Use our calculator above to compare costs for your specific situation, then consult a licensed Medicare advisor to compare specific plans available in your area.',
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
  name: 'Medicare Advantage vs Original Medicare Calculator 2026',
  url: 'https://medicarecalculators.com/advantage-vs-original',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
}

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Compare Medicare Advantage vs Original Medicare',
  step: [
    { '@type': 'HowToStep', name: 'Enter your situation', text: 'Enter your age, state, health status, and expected healthcare usage.' },
    { '@type': 'HowToStep', name: 'Set your preferences', text: 'Indicate doctor preferences, travel frequency, and prescription drug needs.' },
    { '@type': 'HowToStep', name: 'View your comparison', text: 'See side-by-side monthly costs and key differences, with a personalized recommendation based on your inputs.' },
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

export default function AdvantageVsOriginalPage() {
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
              Medicare Advantage vs Original Medicare 2026
            </h1>
            <p className="text-lg sm:text-xl text-white/80 mb-6 max-w-2xl mx-auto">
              Compare costs and benefits of Medicare Advantage against Original Medicare with Medigap. Get a personalized recommendation based on your health needs and preferences.
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
              <AdvantageVsOriginalCalculatorWrapper />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white dark:from-[#0a1929] to-transparent pointer-events-none" />
      </section>

      <section className="bg-white dark:bg-[#0a1929] pt-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="pb-4"><AdBanner slot="2222222222" /></div>

          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Medicare Advantage vs Original Medicare: The Core Difference</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              This is the most important Medicare decision most seniors will make. Original Medicare (Parts A and B) gives you a government-issued insurance card accepted by nearly every doctor and hospital in the country. Medicare Advantage plans are private insurance alternatives approved by Medicare — they must cover everything Original Medicare covers, but they do so through their own network and rules.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              The financial comparison in 2026: Original Medicare with Plan G Medigap and Part D averages around $406/month in total premiums. Medicare Advantage averages $17/month (plus your $185 Part B premium, which you pay regardless of which option you choose). That&apos;s a potential premium savings of $200+/month with MA — but the trade-off includes network restrictions, prior authorization requirements for many services, and potentially higher out-of-pocket costs if you need significant care.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Important 2026 update: All Medicare Advantage plans are now required to have an annual out-of-pocket maximum of no more than $9,350 for in-network services (up to $14,000 combined in-network and out-of-network). This provides significant protection against catastrophic costs — but Original Medicare with Medigap provides comparable protection through Medigap coverage that pays the 20% coinsurance, with no annual cap needed.
            </p>
          </div>

          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Worked Example: Comparing Options at Age 65</h2>
            <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/40 rounded-2xl p-6">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Helen is 65, in good health, sees her primary care doctor about 6 times per year, takes 2 generic prescriptions, and has a specialist she&apos;d like to continue seeing. Her income is $80,000/year (no IRMAA).
              </p>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-blue-50 dark:bg-blue-950/30 rounded-xl p-4">
                  <p className="text-xs font-bold text-blue-800 dark:text-blue-300 mb-2">Original Medicare + Plan G</p>
                  <div className="text-xs text-gray-700 dark:text-gray-300 space-y-1 font-mono">
                    <div>Part B: $185.00/mo</div>
                    <div>Plan G: ~$175.00/mo</div>
                    <div>Part D: $46.50/mo</div>
                    <div className="font-bold border-t pt-1">Premium: $406.50/mo</div>
                    <div className="pt-1 text-gray-500">Doctor visits: $0 copay</div>
                    <div>See ANY Medicare doctor</div>
                    <div>No network restrictions</div>
                  </div>
                </div>
                <div className="bg-teal-50 dark:bg-teal-950/30 rounded-xl p-4">
                  <p className="text-xs font-bold text-teal-800 dark:text-teal-300 mb-2">Medicare Advantage (avg)</p>
                  <div className="text-xs text-gray-700 dark:text-gray-300 space-y-1 font-mono">
                    <div>Part B: $185.00/mo</div>
                    <div>MA plan: $17.00/mo</div>
                    <div>Part D: incl.</div>
                    <div className="font-bold border-t pt-1">Premium: $202.00/mo</div>
                    <div className="pt-1 text-gray-500">Doctor visits: $0–$30 copay</div>
                    <div>Must use network</div>
                    <div>Prior auth may apply</div>
                  </div>
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Helen saves $204.50/month ($2,454/year) with MA premiums. However, she must verify her specialist is in the MA plan&apos;s network. If she has a major hospitalization, she&apos;ll have copays under MA. For a healthy 65-year-old flexible about providers, MA can make financial sense. But with a valued specialist, Helen should carefully check network before enrolling. A licensed Medicare advisor can compare specific plans available in her area.
              </p>
            </div>
          </div>

          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Key Factors in the Medicare Advantage vs Original Decision</h2>
            <ul className="space-y-5">
              <li>
                <p className="font-semibold text-gray-900 dark:text-white mb-1">Doctor and Hospital Networks</p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">Original Medicare is accepted by virtually every doctor and hospital in the US (approximately 93% of physicians accept Medicare). Medicare Advantage plans use networks — HMOs restrict you to network providers, while PPOs allow out-of-network visits at higher cost. If you have established relationships with specific specialists or prefer a particular hospital system, verify they are in-network before choosing an MA plan. Networks can also change year to year — a doctor in-network this year may drop out next year.</p>
              </li>
              <li>
                <p className="font-semibold text-gray-900 dark:text-white mb-1">Prior Authorization Requirements</p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">Medicare Advantage plans can require prior authorization — advance approval from the insurance company — for many services, including surgeries, hospitalizations, specialist referrals, and durable medical equipment. Original Medicare with Medigap has no prior authorization requirements. Under new 2024 CMS rules, MA plans must respond to prior authorization requests within 72 hours (urgent) or 7 days (standard). Denial of necessary care is a significant concern — you can appeal, but the process takes time during a health crisis.</p>
              </li>
              <li>
                <p className="font-semibold text-gray-900 dark:text-white mb-1">Total Cost of Care vs. Premium Savings</p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">Lower MA premiums can be offset by higher cost sharing when you actually need care. With MA, you typically pay copays for every doctor visit ($0–$30), specialist visit ($30–$50), and hospital day (copay per day vs. deductible under Original Medicare). If you have a major health event — hospitalization, surgery, or chronic illness management — your total out-of-pocket costs under MA may rival or exceed what you would pay under Original Medicare with Plan G, which covers 20% coinsurance and the Part A deductible.</p>
              </li>
            </ul>
          </div>

          <div className="mb-6">
            <AffiliateCTA headline="Compare Medicare Advantage plans available in your area — free" />
          </div>

          <div className="pb-10">
            <FAQ questions={faqs} />
          </div>

          <div className="rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 px-6 py-5 mb-10">
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Medicare Disclaimer</p>
            <p className="text-sm text-slate-700 dark:text-slate-400 leading-relaxed">
              These calculators provide estimates based on 2026 Medicare data for educational purposes only. Contact Medicare at 1-800-MEDICARE or medicare.gov for official plan comparison. Consult a licensed Medicare advisor for personalized plan guidance. Not affiliated with Medicare or the US government.
            </p>
          </div>

          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Medicare Advantage by State</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Medicare Advantage plan availability, premiums, and extra benefits vary significantly by state. Select your state for local Medicare Advantage plan counts and average premiums.
            </p>
            <div className="flex flex-wrap gap-2">
              {STATE_LIST.map(({ slug, name }) => (
                <a key={slug} href={`/${slug}-medicare-advantage`}
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
