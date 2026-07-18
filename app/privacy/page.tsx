import type { Metadata } from 'next'
import ToolHeader from '@/components/ToolHeader'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Privacy Policy — MedicareCalculators.com',
  description:
    'Privacy policy for MedicareCalculators.com. Learn how we protect your data and why all calculations are performed locally in your browser.',
  alternates: { canonical: 'https://medicarecalculators.com/privacy' },
  robots: { index: true, follow: true },
}

export default function PrivacyPage() {
  return (
    <>
      <section className="relative bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/herobgmc.webp')" }}>
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 pb-10">
          <ToolHeader />
          <div className="text-center text-white px-4 py-8">
            <h1 className="text-3xl sm:text-4xl font-bold mb-3 leading-tight">
              Privacy Policy
            </h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Last updated: January 1, 2026
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white dark:from-[#0a1929] to-transparent pointer-events-none" />
      </section>

      <section className="bg-white dark:bg-[#0a1929] pt-6 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 prose prose-gray dark:prose-invert max-w-none">

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Overview</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              MedicareCalculators.com is committed to protecting your privacy. This policy explains what information we collect, how we use it, and your choices. The short version: all calculator inputs you enter stay on your device. We never see your financial information.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Information We Do Not Collect</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              All calculations on MedicareCalculators.com are performed entirely in your browser using JavaScript. Your income, age, account balances, Social Security amounts, and all other financial inputs are never transmitted to our servers. We have no database of user financial information.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Calculator inputs are saved in your browser&apos;s localStorage for your convenience so your data persists between sessions. This data exists only on your device and is cleared when you clear your browser storage. We cannot access your localStorage data.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Information We Do Collect</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-2">
              Like most websites, we collect standard server logs and analytics data:
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-1 mb-4">
              <li>Pages visited and time spent on each page</li>
              <li>Browser type, operating system, and device type</li>
              <li>Referring website (how you arrived at our site)</li>
              <li>Geographic location (country/region, not precise location)</li>
              <li>IP address (anonymized in Google Analytics)</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              This data is collected via Google Analytics 4 (GA4) and is used solely to understand how visitors use our site so we can improve it. We have enabled IP anonymization in GA4. We do not sell or share this data with third parties other than Google under their standard analytics terms.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Advertising and Cookies</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              We use Google AdSense to display advertisements. Google may use cookies to serve ads based on your prior visits to this or other websites. You can opt out of personalized advertising by visiting Google&apos;s Ad Settings or by visiting aboutads.info.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              We may also display affiliate links to insurance comparison services. Clicking these links may result in a cookie being placed by the affiliate partner. We are not responsible for the privacy practices of third-party affiliate sites. Review their privacy policies before providing any personal information.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Affiliate Disclosure</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              MedicareCalculators.com participates in affiliate marketing programs. When you click certain links on our site (labeled &quot;Compare Plans Free&quot; or similar) and enroll in a product or service, we may receive a commission from the insurance company or marketplace at no additional cost to you. This compensation does not influence our calculator results, editorial content, or recommendations. We do not favor any specific insurer or plan in our educational content.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Children&apos;s Privacy</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              MedicareCalculators.com is intended for adults making Medicare and retirement planning decisions. We do not knowingly collect personal information from children under 13. If you believe a child has provided us with personal information, please contact us and we will delete it.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Data Security</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Our site uses HTTPS to encrypt all data transmitted between your browser and our servers. Because we do not collect or store your financial calculator inputs, there is no database of sensitive personal information to protect. Standard security headers are implemented including X-Frame-Options and Content-Type-Options to protect against common web attacks.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Your Choices</h2>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
              <li><strong>Clear calculator data:</strong> Clear your browser&apos;s localStorage to remove all saved calculator inputs.</li>
              <li><strong>Opt out of analytics:</strong> Install the Google Analytics opt-out browser add-on at tools.google.com/dlpage/gaoptout.</li>
              <li><strong>Opt out of personalized ads:</strong> Visit google.com/settings/ads or aboutads.info.</li>
              <li><strong>Do Not Track:</strong> We respect browser Do Not Track signals where technically feasible.</li>
            </ul>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Changes to This Policy</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              We may update this privacy policy from time to time. We will post the updated date at the top of this page. Continued use of the site after changes constitutes acceptance of the updated policy. If we make material changes affecting how we handle personal data, we will provide more prominent notice.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Contact</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              For privacy questions or to request deletion of any data we may hold, use the contact link in our footer. We will respond to privacy requests within 30 days.
            </p>
          </div>

          <div className="rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 px-6 py-5">
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Note</p>
            <p className="text-sm text-slate-700 dark:text-slate-400 leading-relaxed">
              MedicareCalculators.com is not affiliated with Medicare, CMS, the SSA, or any government agency. Not a licensed insurance broker or financial advisor.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
