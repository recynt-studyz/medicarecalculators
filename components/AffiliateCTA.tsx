export default function AffiliateCTA({ headline }: { headline?: string }) {
  return (
    <div className="rounded-2xl bg-[#0f4c75] border border-[#1565a0] p-6 my-6">
      <div className="text-center">
        <div className="text-2xl mb-3">🏥</div>
        <h3 className="text-lg font-bold text-white mb-2">
          {headline ?? 'Compare Medicare Plans in Your Area'}
        </h3>
        <p className="text-sm text-blue-100 mb-4 max-w-md mx-auto leading-relaxed">
          Licensed Medicare advisors help you compare Advantage, Supplement, and Part D plans in your
          area. Free service, no obligation. Compare plans and find coverage that fits your needs and budget.
        </p>
        <a
          href="#"
          className="inline-block bg-white text-[#0f4c75] font-bold px-8 py-3 rounded-xl hover:bg-blue-50 transition text-sm"
        >
          → Compare Plans Free
        </a>
        <p className="text-xs text-blue-200 mt-3">
          We may be compensated when you connect with Medicare plan providers through this site.
          Medicare has neither reviewed nor endorsed this information.
        </p>
      </div>
    </div>
  )
}
