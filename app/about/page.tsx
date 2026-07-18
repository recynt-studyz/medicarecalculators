import type { Metadata } from 'next'
import ToolHeader from '@/components/ToolHeader'
import Footer from '@/components/Footer'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About MedicareCalculators.com — Free Medicare Planning Tools',
  description:
    'MedicareCalculators.com provides free, unbiased Medicare cost calculators for 2026 to help seniors and caregivers understand Medicare costs, IRMAA, Medigap, Part D, and retirement income.',
  alternates: { canonical: 'https://medicarecalculators.com/about' },
  robots: { index: true, follow: true },
}

const tools = [
  { href: '/', label: 'Medicare Cost Calculator' },
  { href: '/part-b-irmaa', label: 'Part B IRMAA Calculator' },
  { href: '/advantage-vs-original', label: 'Medicare Advantage vs Original' },
  { href: '/part-d', label: 'Part D Drug Cost Calculator' },
  { href: '/medigap', label: 'Medigap Plan Comparison' },
  { href: '/social-security', label: 'Social Security Calculator' },
  { href: '/rmd', label: 'RMD Calculator' },
  { href: '/retirement-income', label: 'Retirement Income Calculator' },
]

export default function AboutPage() {
  return (
    <>
      <section className="relative bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/herobgmc.webp')" }}>
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 pb-10">
          <ToolHeader />
          <div className="text-center text-white px-4 py-8">
            <h1 className="text-3xl sm:text-4xl font-bold mb-3 leading-tight">
              About MedicareCalculators.com
            </h1>
            <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto">
              Free, unbiased Medicare planning tools for seniors, caregivers, and financial advisors.
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white dark:from-[#0a1929] to-transparent pointer-events-none" />
      </section>

      <section className="bg-white dark:bg-[#0a1929] pt-6 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">

          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Our Mission</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              MedicareCalculators.com is operated by Recynt Studyz LLC and provides free, easy-to-use calculators to help Americans understand their Medicare options and retirement income. We believe that access to clear, accurate, and up-to-date Medicare information should be available to everyone — not just those who can afford a financial advisor.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              All calculators on this site use current 2026 Medicare data including IRMAA brackets, Part D deductibles, Medigap premiums, and Social Security formulas. All calculations are performed locally in your browser — we never send your financial information to any server.
            </p>
          </div>

          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Our Tools</h2>
            <ul className="space-y-2">
              {tools.map(t => (
                <li key={t.href}>
                  <Link href={t.href} className="text-[#0f4c75] dark:text-blue-400 hover:underline font-medium">
                    {t.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">How We Fund This Site</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              MedicareCalculators.com is free to use. We generate revenue through Google AdSense display advertising and affiliate partnerships with licensed insurance marketplaces. When you click &quot;Compare Plans Free&quot; on our site and enroll in a Medicare plan through our partner, we may receive a commission from the insurance company at no cost to you.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Our affiliate relationships do not influence our calculator results or editorial content. We never recommend specific plans, brokers, or insurers — we provide tools and educational information only. For personalized plan recommendations, we encourage you to speak with a licensed Medicare advisor.
            </p>
          </div>

          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Accuracy and Updates</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              We update our calculators annually with new CMS data as Medicare costs change each year. The 2026 figures reflected in our tools include: the $185/month Part B premium, the IRMAA bracket thresholds, the $590 Part D deductible, the $1,676 Part A hospital deductible, the $257 Part B annual deductible, and updated Medigap premium estimates by age and state.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              While we strive for accuracy, Medicare rules change frequently. Always verify important decisions with official sources: medicare.gov, ssa.gov, or a licensed insurance agent. Our tools are for estimation and education only, not as a substitute for professional advice.
            </p>
          </div>

          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Contact</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Questions, corrections, or feedback? We welcome it. Please use the contact link in the footer, or reach out to our editorial team directly. We are committed to maintaining accurate, helpful Medicare tools for the benefit of all users.
            </p>
          </div>

          <div className="rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 px-6 py-5">
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Disclaimer</p>
            <p className="text-sm text-slate-700 dark:text-slate-400 leading-relaxed">
              MedicareCalculators.com is not affiliated with Medicare, the Centers for Medicare & Medicaid Services (CMS), the Social Security Administration, or any government agency. All content is for educational purposes only and does not constitute financial, legal, or medical advice.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
