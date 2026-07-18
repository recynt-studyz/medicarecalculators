import { ImageResponse } from 'next/og'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: 'linear-gradient(135deg, #0a1929 0%, #0f4c75 60%, #1565a0 100%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui, sans-serif',
          padding: 60,
        }}
      >
        {/* Medical cross icon */}
        <div style={{ position: 'relative', width: 72, height: 72, marginBottom: 32, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ position: 'absolute', width: 20, height: 72, background: 'white', borderRadius: 6 }} />
          <div style={{ position: 'absolute', width: 72, height: 20, background: 'white', borderRadius: 6 }} />
        </div>

        <div style={{ fontSize: 48, fontWeight: 700, color: 'white', textAlign: 'center', lineHeight: 1.2, marginBottom: 20 }}>
          MedicareCalculators.com
        </div>

        <div style={{ fontSize: 24, color: 'rgba(255,255,255,0.8)', textAlign: 'center', marginBottom: 40 }}>
          Free 2026 Medicare Cost Calculators
        </div>

        {/* Pills */}
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
          {['IRMAA', 'Part D', 'Medigap', 'Social Security', 'RMD', 'Retirement Income'].map(label => (
            <div
              key={label}
              style={{
                background: 'rgba(255,255,255,0.15)',
                border: '1px solid rgba(255,255,255,0.3)',
                borderRadius: 100,
                padding: '8px 20px',
                color: 'white',
                fontSize: 18,
              }}
            >
              {label}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  )
}
