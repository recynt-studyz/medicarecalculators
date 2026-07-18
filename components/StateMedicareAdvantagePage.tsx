import type { StateData } from '@/lib/medicareData'
import ToolHeader from './ToolHeader'
import AdBanner from './AdBanner'
import AffiliateCTA from './AffiliateCTA'
import FAQ from './FAQ'
import type { FaqItem } from './FAQ'
import Footer from './Footer'
import AdvantageVsOriginalCalculatorWrapper from './AdvantageVsOriginalCalculatorWrapper'

const trustSignals = ['🏥 2026 Updated', '🔒 Private', '⚡ Instant', '✓ Free']

export default function StateMedicareAdvantagePage({ state: s }: { state: StateData }) {
  const faqs: FaqItem[] = [
    {
      q: `How many Medicare Advantage plans are available in ${s.name} in 2026?`,
      a: `In 2026, there are approximately ${s.maPlans} Medicare Advantage plans available in ${s.name}, though the exact number varies by county. The average Medicare Advantage premium in ${s.name} is ${s.avgMAPremium === 0 ? '$0 — many plans are available at no additional premium' : `$${s.avgMAPremium}/month`}. ${s.name} seniors can compare all available plans during the Annual Enrollment Period (October 15 – December 7) at medicare.gov or by calling 1-800-MEDICARE. Contact ${s.shipName} at ${s.shipPhone} for free plan comparison assistance.`,
    },
    {
      q: `What is the Medicare Advantage out-of-pocket maximum in ${s.name}?`,
      a: `In 2026, Medicare Advantage plans in ${s.name} are required to have an annual out-of-pocket maximum of no more than $9,350 for in-network services ($14,000 for combined in-network and out-of-network). Once you reach this limit, the plan pays 100% for covered services for the rest of the year. This is a major advantage over Original Medicare, which has no out-of-pocket cap for Part B services unless you have a Medigap supplement. Actual OOP maximums vary by plan — many ${s.name} plans offer lower caps.`,
    },
    {
      q: `Do Medicare Advantage plans in ${s.name} cover dental and vision?`,
      a: `Most Medicare Advantage plans in ${s.name} include extra benefits that Original Medicare does not cover, including dental care (cleanings, exams, sometimes major dental work), vision care (eye exams and glasses/contacts allowance), hearing benefits, and sometimes fitness memberships, transportation, and over-the-counter allowances. The extent of these extra benefits varies significantly by plan. Plans with richer extra benefits may have higher premiums or different network restrictions. Use our comparison tool above or contact ${s.shipName} at ${s.shipPhone} to find ${s.name} plans with the extra benefits you need.`,
    },
    {
      q: `Can I switch from Medicare Advantage back to Original Medicare in ${s.name}?`,
      a: `Yes, you can switch from Medicare Advantage back to Original Medicare during the Annual Enrollment Period (October 15 – December 7) or during the Medicare Advantage Open Enrollment Period (January 1 – March 31). However, if you want to add a Medigap supplement policy when switching back to Original Medicare, be aware that insurers in ${s.name} can use medical underwriting${s.medigapCommunityRated ? ' — EXCEPT that ' + s.name + ' requires guaranteed issue rights regardless of health status, making it easier to switch' : ' outside your initial open enrollment period, potentially denying coverage or charging higher premiums based on health conditions'}. Plan your transition carefully.`,
    },
    {
      q: `What is prior authorization in Medicare Advantage, and how does it affect ${s.name} seniors?`,
      a: `Prior authorization means your Medicare Advantage plan must approve certain services (hospitalizations, surgeries, specialty referrals, durable medical equipment) before you receive them. This is required by many ${s.name} Medicare Advantage plans and can cause delays in care. In 2024, CMS implemented new rules requiring MA plans to respond to prior authorization requests within 72 hours for urgent cases and 7 calendar days for standard requests. If denied, you have appeal rights. If prior authorization requirements concern you, ${s.medigapCommunityRated ? s.name + ' Medigap coverage offers no prior authorization requirements' : 'consider whether Original Medicare with Medigap, which has no prior authorization requirements, may better suit your healthcare needs'}.`,
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
    name: `${s.name} Medicare Advantage Calculator 2026`,
    url: `https://medicarecalculators.com/${s.slug}-medicare-advantage`,
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Any',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  }

  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: `How to Compare Medicare Advantage vs Original Medicare in ${s.name}`,
    step: [
      { '@type': 'HowToStep', name: 'Enter your health and preferences', text: `Enter your age, health status, expected healthcare usage, and doctor preferences. ${s.name} is pre-selected.` },
      { '@type': 'HowToStep', name: 'Review the cost comparison', text: `See side-by-side monthly costs for Original Medicare with Medigap vs Medicare Advantage in ${s.name}.` },
      { '@type': 'HowToStep', name: 'Get a personalized recommendation', text: `Receive a recommendation based on your inputs and connect with a licensed Medicare advisor to compare specific ${s.name} plans.` },
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
              {s.name} Medicare Advantage 2026
            </h1>
            <p className="text-lg sm:text-xl text-white/80 mb-6 max-w-2xl mx-auto">
              Compare Medicare Advantage vs Original Medicare in {s.name}.
              ~{s.maPlans} plans available. Average premium ${s.avgMAPremium}/month.
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
              <AdvantageVsOriginalCalculatorWrapper defaultState={s.abbr} />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white dark:from-[#0a1929] to-transparent pointer-events-none" />
      </section>

      <section className="bg-white dark:bg-[#0a1929] pt-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="pb-4"><AdBanner slot="2222222222" /></div>

          <div className="rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 px-6 py-5 mb-10">
            <h2 className="text-base font-bold text-slate-900 dark:text-slate-200 mb-2">{s.name} Medicare Advantage Overview</h2>
            <p className="text-sm text-slate-700 dark:text-slate-400 leading-relaxed">
              {s.name} has approximately {s.maPlans} Medicare Advantage plans available in 2026 with an average premium of ${s.avgMAPremium}/month.
              MA plans in {s.name} must cover all Original Medicare services plus typically include extra benefits like dental, vision, and hearing.
              The 2026 out-of-pocket maximum for in-network services is $9,350. Free plan comparison help is available through {s.shipName} at {s.shipPhone}.
            </p>
          </div>

          <div className="mb-4 text-center">
            <a href="/advantage-vs-original" className="text-sm text-[#0f4c75] dark:text-blue-400 hover:underline">
              ← Back to Medicare Advantage vs Original Calculator
            </a>
          </div>

          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Medicare Advantage in {s.name}: What You Need to Know</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Medicare Advantage (Part C) plans in {s.name} are offered by private insurance companies approved by Medicare.
              They bundle Part A (hospital), Part B (medical), and usually Part D (drugs) into a single plan.
              With approximately {s.maPlans} plans available, {s.name} seniors have{s.maPlans > 50 ? ' excellent' : ' meaningful'} choices for Medicare Advantage coverage.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              The average Medicare Advantage premium in {s.name} is ${s.avgMAPremium}/month — {s.avgMAPremium < 17 ? 'below' : s.avgMAPremium > 17 ? 'above' : 'at'} the national average of $17/month.
              {s.avgMAPremium === 0 ? ' Many plans in your area offer $0 additional premium — you still pay your Part B premium ($185/month in 2026).' : ''}
              All MA plans have an annual out-of-pocket maximum (capped at $9,350 in-network for 2026), unlike Original Medicare which has no cap.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              The main trade-off with Medicare Advantage in {s.name} is network restrictions and prior authorization requirements.
              Unlike Original Medicare, which lets you see any doctor or hospital nationwide that accepts Medicare,
              MA plans use networks — HMOs require referrals and restrict you to network providers, while PPOs offer more flexibility.
              If you travel frequently or have specialists you want to keep, carefully check each {s.name} plan&apos;s network before enrolling.
            </p>
          </div>

          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Worked Example: {s.name} Medicare Advantage vs Original</h2>
            <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/40 rounded-2xl p-6">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Robert is 67 and lives in {s.name}. He&apos;s in good health, sees his primary care doctor 4 times per year,
                and takes 2 generic prescriptions. He&apos;s flexible about changing doctors.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-blue-50 dark:bg-blue-950/30 rounded-xl p-3">
                  <p className="text-xs font-bold text-blue-800 dark:text-blue-300 mb-2">Original Medicare</p>
                  <div className="text-xs text-gray-700 dark:text-gray-300 space-y-1 font-mono">
                    <div>Part B: $185/mo</div>
                    <div>Plan G: ~$175/mo</div>
                    <div>Part D: ~$47/mo</div>
                    <div className="font-bold border-t pt-1">Total: ~$407/mo</div>
                  </div>
                </div>
                <div className="bg-teal-50 dark:bg-teal-950/30 rounded-xl p-3">
                  <p className="text-xs font-bold text-teal-800 dark:text-teal-300 mb-2">Medicare Advantage ({s.name})</p>
                  <div className="text-xs text-gray-700 dark:text-gray-300 space-y-1 font-mono">
                    <div>Part B: $185/mo</div>
                    <div>MA plan: ~${s.avgMAPremium}/mo</div>
                    <div>Part D: incl.</div>
                    <div className="font-bold border-t pt-1">Total: ~${185 + s.avgMAPremium}/mo</div>
                  </div>
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                For Robert, Medicare Advantage saves approximately ${Math.round(407 - 185 - s.avgMAPremium)}/month in premiums.
                However, he&apos;d have copays for each doctor visit (typically $0–$30) and face network restrictions.
                If he has a major health event, the $9,350 OOP maximum protects him. For a healthy senior flexible with providers,
                Medicare Advantage may be the right choice in {s.name}. Contact {s.shipName} at {s.shipPhone} for free guidance.
              </p>
            </div>
          </div>

          <div className="mb-6">
            <AffiliateCTA headline={`Compare ${s.name} Medicare Advantage Plans — Free`} />
          </div>

          <div className="pb-10">
            <FAQ questions={faqs} />
          </div>

          <div className="rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 px-6 py-5 mb-10">
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Medicare Disclaimer</p>
            <p className="text-sm text-slate-700 dark:text-slate-400 leading-relaxed">
              These calculators provide estimates based on 2026 Medicare data for educational purposes only. Contact Medicare at 1-800-MEDICARE or medicare.gov for official plan comparison. Not affiliated with Medicare or the US government.
            </p>
          </div>

          <div className="pb-6"><AdBanner slot="3333333333" /></div>
        </div>
      </section>

      <Footer />
    </>
  )
}
