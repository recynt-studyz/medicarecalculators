'use client'

export default function Footer() {
  function handleContact() {
    const parts = ['recyntstudyz', 'gmail', 'com']
    window.location.href = `mailto:${parts[0]}@${parts[1]}.${parts[2]}`
  }

  return (
    <footer className="border-t border-gray-100 dark:border-gray-800 py-6 mt-8">
      <p className="text-center text-xs text-gray-400 mb-3 px-4 max-w-2xl mx-auto">
        Free Medicare calculators for Part A, Part B, Medicare Advantage, Part D, Medigap, Social Security, RMD and retirement income. 2026 data for all 50 states.
      </p>
      <p className="text-center text-xs text-gray-400 mb-3 px-4 max-w-2xl mx-auto">
        These calculators provide estimates based on 2026 Medicare data for educational purposes only. Medicare costs and coverage vary by plan, location, and individual circumstances. Contact Medicare directly at 1-800-MEDICARE or medicare.gov for official information. Not affiliated with or endorsed by Medicare or the US government.
      </p>
      <div className="max-w-3xl mx-auto px-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-gray-400">
        <span className="font-mono">medicarecalculators.com</span>
        <span>·</span>
        <a href="/privacy" className="hover:text-gray-600 dark:hover:text-gray-300 transition">
          Privacy Policy
        </a>
        <span>·</span>
        <a href="/about" className="hover:text-gray-600 dark:hover:text-gray-300 transition">
          About
        </a>
        <span>·</span>
        <button
          onClick={handleContact}
          className="hover:text-gray-600 dark:hover:text-gray-300 transition cursor-pointer"
        >
          Contact
        </button>
      </div>
    </footer>
  )
}
