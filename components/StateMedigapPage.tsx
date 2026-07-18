import type { StateData } from '@/lib/medicareData'
import ToolHeader from './ToolHeader'
import AdBanner from './AdBanner'
import AffiliateCTA from './AffiliateCTA'
import FAQ from './FAQ'
import type { FaqItem } from './FAQ'
import Footer from './Footer'
import MedigapCalculatorWrapper from './MedigapCalculatorWrapper'

const trustSignals = ['🏥 2026 Updated', '🔒 Private', '⚡ Instant', '✓ Free']

export default function StateMedigapPage({ state: s }: { state: StateData }) {
  const faqs: FaqItem[] = [
    {
      q: `What Medigap plans are available in ${s.name}?`,
      a: `In ${s.name}, the standardized Medigap plans available include Plans A, B, D, G, K, L, M, and N (plus C and F for those eligible before January 1, 2020). Plan G is the most popular for new Medicare beneficiaries, offering comprehensive coverage except for the Part B deductible ($257 in 2026). Plan N offers similar coverage with lower premiums but has copays of up to $20 for office visits and $50 for ER visits. ${s.medigapCommunityRated ? `In ${s.name}, insurers must use community rating — your premium is the same regardless of age.` : `In ${s.name}, most insurers use attained-age rating, meaning premiums increase as you age.`}`,
    },
    {
      q: `How much does Medigap cost in ${s.name}?`,
      a: `Medigap premiums in ${s.name} vary by plan, insurer, age, gender, and tobacco use. ${s.medigapCommunityRated ? `Since ${s.name} requires community rating, all enrollees pay the same premium regardless of age — a significant benefit for older seniors.` : `Premiums in ${s.name} typically start around $100–$175/month for Plan G at age 65 and increase with age.`} At age 65, Plan G premiums typically range from $100–$300/month and Plan N from $80–$200/month, varying by insurer. Get multiple quotes — premiums for the same standardized plan can vary significantly between insurers. ${s.shipName} (${s.shipPhone}) can help you compare specific quotes.`,
    },
    {
      q: `When can I buy Medigap in ${s.name}?`,
      a: `Your Medigap Open Enrollment Period is the 6 months starting the first day of the month you turn 65 AND have Part B coverage. During this window, you have guaranteed issue rights — insurers in ${s.name} cannot deny coverage or charge more due to pre-existing conditions. ${s.medigapCommunityRated ? `Additionally, ${s.name} provides stronger guaranteed issue rights than most states, offering additional enrollment opportunities throughout the year.` : `After this window closes, ${s.name} insurers can use medical underwriting in most situations, potentially denying coverage or charging higher premiums based on health status. If you miss your open enrollment window, buy as soon as possible — the longer you wait, the harder it may be to qualify.`}`,
    },
    {
      q: `Can I switch Medigap plans in ${s.name}?`,
      a: `You can attempt to switch Medigap plans at any time in ${s.name}, but outside of your initial open enrollment period or a qualifying special enrollment period, the new insurer can use medical underwriting to deny your application or charge higher premiums based on health status. ${s.medigapCommunityRated ? `In ${s.name}, community rating requirements and stronger state guaranteed issue rights provide more opportunities to switch.` : `In ${s.name}, switching is easiest if you are in good health. If your health has declined since you bought your original Medigap policy, switching may be difficult or impossible without paying significantly higher premiums.`} Contact ${s.shipName} at ${s.shipPhone} before attempting to switch plans.`,
    },
    {
      q: `Is Medigap or Medicare Advantage better in ${s.name}?`,
      a: `The choice between Medigap and Medicare Advantage depends on your individual situation. Medigap provides more predictable costs, lets you see any Medicare-accepting provider nationwide, and has no prior authorization requirements — ideal for frequent travelers, those with complex health needs, or those who want to keep specific specialists. Medicare Advantage typically has lower premiums (${s.avgMAPremium > 0 ? `averaging $${s.avgMAPremium}/month in ${s.name}` : `with many $0 premium plans in ${s.name}`}) and may include extra dental, vision, and hearing benefits, but has network restrictions and prior authorization. ${s.medigapCommunityRated ? `In ${s.name}, community-rated Medigap may be especially attractive since premiums don't increase sharply with age.` : ``} Our comparison calculator above can help you evaluate which option fits your needs.`,
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
    name: `${s.name} Medigap Plans 2026`,
    url: `https://medicarecalculators.com/${s.slug}-medigap-plans`,
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Any',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  }

  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: `How to Choose a Medigap Plan in ${s.name}`,
    step: [
      { '@type': 'HowToStep', name: 'Enter your information', text: `Enter your age, gender, tobacco use, and health status. ${s.name} is pre-selected.` },
      { '@type': 'HowToStep', name: 'Select your plan preference', text: `Choose "Help me choose" for a recommendation or select a specific plan (G, N, A) to see estimated premiums in ${s.name}.` },
      { '@type': 'HowToStep', name: 'Compare plans and get quotes', text: `Review estimated premiums and coverage details, then connect with a licensed Medicare advisor to compare actual ${s.name} insurer quotes.` },
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
              {s.name} Medigap Plans 2026
            </h1>
            <p className="text-lg sm:text-xl text-white/80 mb-6 max-w-2xl mx-auto">
              Compare Medicare Supplement plans in {s.name}.
              {s.medigapCommunityRated ? ` ${s.name} requires community-rated Medigap — same premium for all ages.` : ' Compare Plan G, Plan N, and Plan A with estimated premiums.'}
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
              <MedigapCalculatorWrapper defaultState={s.abbr} />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white dark:from-[#0a1929] to-transparent pointer-events-none" />
      </section>

      <section className="bg-white dark:bg-[#0a1929] pt-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="pb-4"><AdBanner slot="2222222222" /></div>

          <div className="rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 px-6 py-5 mb-10">
            <h2 className="text-base font-bold text-slate-900 dark:text-slate-200 mb-2">{s.name} Medigap Overview</h2>
            <p className="text-sm text-slate-700 dark:text-slate-400 leading-relaxed">
              {s.medigapCommunityRated
                ? `${s.name} is a community-rating state for Medigap — insurers must charge the same premium regardless of age, gender, or health status. This provides significant protections for ${s.name} seniors compared to most states. You have stronger guaranteed issue rights and the premium advantage of community rating throughout your lifetime.`
                : `${s.name} follows standard Medigap rules with attained-age rating — premiums typically increase as you age. Buy during your 6-month open enrollment period (when you turn 65 with Part B) for guaranteed acceptance. After that window, medical underwriting may apply.`}
              {` Free Medigap counseling is available through ${s.shipName} at ${s.shipPhone}.`}
            </p>
          </div>

          <div className="mb-4 text-center">
            <a href="/medigap" className="text-sm text-[#0f4c75] dark:text-blue-400 hover:underline">
              ← Back to Medigap Calculator
            </a>
          </div>

          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Medigap Plans in {s.name}: What You Need to Know</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Medigap (Medicare Supplement Insurance) fills the gaps in Original Medicare coverage — the 20% coinsurance, hospital deductibles, and other out-of-pocket costs that can add up quickly.
              In {s.name}, Medigap plans are standardized by the federal government — Plan G from any insurer provides the same coverage — but premiums vary significantly between insurers.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              {s.medigapCommunityRated
                ? `${s.name} is one of just seven states that requires community rating for Medigap — the same premium applies regardless of your age. This is a major benefit: a 75-year-old in ${s.name} pays the same Medigap premium as a 65-year-old (before insurer adjustments), while in most states, the same plan might cost 2–3x more at 75 than at 65. Shop multiple ${s.name} Medigap insurers to find the best rate, as community rating still allows premiums to vary between companies.`
                : `In ${s.name}, Medigap premiums typically use attained-age rating, increasing as you age. A Plan G policy purchased at 65 for $150/month may cost $250–$350/month by age 75 as the age-based rate increase is applied each year. Shopping for the lowest premium at age 65 is important, as is understanding how aggressively each insurer raises rates over time.`}
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Plan G is the most popular Medigap option for new Medicare beneficiaries — it covers virtually everything except the Part B deductible ($257/year in 2026), providing near-complete protection from unexpected Medicare costs.
              Plan N offers a lower premium with the trade-off of office visit copays (up to $20) and ER copays ($50).
              For {s.name} seniors with significant or unpredictable healthcare needs, the premium certainty of Medigap can be worth the higher monthly cost compared to Medicare Advantage.
            </p>
          </div>

          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Worked Example: Plan G vs Plan N in {s.name}</h2>
            <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/40 rounded-2xl p-6">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Susan is 65 and enrolling in Medicare in {s.name}. She sees her primary care doctor about 8 times per year and takes 2 maintenance prescriptions. She is comparing Plan G and Plan N.
                {s.medigapCommunityRated ? ` As a ${s.name} resident, she benefits from community rating — her premium will not increase with age the way it would in most states.` : ''}
              </p>
              <div className="space-y-1 text-sm text-gray-700 dark:text-gray-300 mb-4 font-mono bg-white/60 dark:bg-black/20 rounded-xl px-4 py-3">
                <div>Plan G annual premium: ~$175 × 12 = $2,100</div>
                <div>Plan N annual premium: ~$135 × 12 = $1,620</div>
                <div>Premium savings with Plan N: $480/year</div>
                <div className="pt-1">Plan N office visit copays: 8 × $20 = $160/year</div>
                <div>Net savings with Plan N: $480 − $160 = $320/year</div>
                <div className="font-bold pt-1">Plan N saves ~$320/year if Susan stays healthy</div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                For a healthy 65-year-old in {s.name}, Plan N typically saves $250–$400/year over Plan G. However, if Susan develops a condition requiring frequent specialist visits, Plan N copays can narrow or eliminate this advantage. Plan G offers complete cost predictability after the $257 Part B deductible — ideal for those who prefer simplicity or expect heavier healthcare use.
                {s.medigapCommunityRated ? ` In ${s.name}, both plans maintain community-rated premiums, making long-term cost comparison more straightforward than in attained-age rating states.` : ` Contact ${s.shipName} at ${s.shipPhone} for help comparing specific ${s.name} insurer quotes.`}
              </p>
            </div>
          </div>

          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Key Factors in Choosing a Medigap Plan in {s.name}</h2>
            <ul className="space-y-5">
              <li>
                <p className="font-semibold text-gray-900 dark:text-white mb-1">Open Enrollment Is Your Best Window</p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">Your 6-month Medigap Open Enrollment Period — starting the month you turn 65 with Part B — is your guaranteed-issue window in {s.name}. During this period insurers cannot deny coverage or charge higher premiums based on health status. {s.medigapCommunityRated ? `${s.name} provides additional guaranteed issue protections beyond the federal minimum, giving you more flexibility than most states.` : `After this window, ${s.name} insurers can use medical underwriting in most circumstances. Missing this window can permanently limit your Medigap options — apply at 65 regardless of current health.`}</p>
              </li>
              <li>
                <p className="font-semibold text-gray-900 dark:text-white mb-1">{s.medigapCommunityRated ? `Community Rating Advantage in ${s.name}` : `Premium Rate Trends in ${s.name}`}</p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{s.medigapCommunityRated ? `${s.name} is one of seven states requiring community rating for Medigap, meaning your premium is the same whether you enroll at 65 or 85 (before insurer adjustments). This dramatically levels the playing field for older ${s.name} seniors. Premiums still vary between insurers, so get multiple quotes through ${s.shipName} (${s.shipPhone}).` : `Most ${s.name} Medigap insurers use attained-age rating — premiums increase each year as you age. A Plan G policy at $150/month at age 65 may cost $250–$350/month by age 75. When comparing plans, ask about historical rate increase percentages — some ${s.name} insurers are more aggressive than others.`}</p>
              </li>
              <li>
                <p className="font-semibold text-gray-900 dark:text-white mb-1">Medigap vs Medicare Advantage in {s.name}</p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">Medigap provides nationwide coverage with any Medicare-accepting provider and no prior authorization — ideal for frequent travelers, those with existing specialist relationships, or anyone who wants predictable costs. Medicare Advantage in {s.name} averages ${s.avgMAPremium}/month with potential extra benefits like dental and vision, but uses networks and may require referrals. Our comparison calculator above can help quantify which option fits your financial and healthcare situation in {s.name}.</p>
              </li>
            </ul>
          </div>

          <div className="mb-6">
            <AffiliateCTA headline={`Get Medigap quotes in ${s.name} — free`} />
          </div>

          <div className="pb-10">
            <FAQ questions={faqs} />
          </div>

          <div className="rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 px-6 py-5 mb-10">
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Medicare Disclaimer</p>
            <p className="text-sm text-slate-700 dark:text-slate-400 leading-relaxed">
              These calculators provide estimates based on 2026 Medicare data for educational purposes only. Actual Medigap premiums vary by insurer, age, and state. Contact Medicare at 1-800-MEDICARE or medicare.gov for official information. Consult a licensed Medicare advisor for personalized Medigap plan comparison. Not affiliated with Medicare or the US government.
            </p>
          </div>

          <div className="pb-6"><AdBanner slot="3333333333" /></div>
        </div>
      </section>

      <Footer />
    </>
  )
}
