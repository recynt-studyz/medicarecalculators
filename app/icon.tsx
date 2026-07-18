import { ImageResponse } from 'next/og'

export const size = { width: 48, height: 48 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: 10,
          background: 'linear-gradient(135deg, #0f4c75 0%, #1565a0 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Medical cross */}
        <div style={{ position: 'relative', width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ position: 'absolute', width: 8, height: 24, background: 'white', borderRadius: 2 }} />
          <div style={{ position: 'absolute', width: 24, height: 8, background: 'white', borderRadius: 2 }} />
        </div>
      </div>
    ),
    { ...size }
  )
}
