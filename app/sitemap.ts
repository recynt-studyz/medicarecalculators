import type { MetadataRoute } from 'next'

const BASE = 'https://medicarecalculators.com'

const STATE_SLUGS = [
  'alabama', 'alaska', 'arizona', 'arkansas', 'california', 'colorado', 'connecticut',
  'delaware', 'florida', 'georgia', 'hawaii', 'idaho', 'illinois', 'indiana', 'iowa',
  'kansas', 'kentucky', 'louisiana', 'maine', 'maryland', 'massachusetts', 'michigan',
  'minnesota', 'mississippi', 'missouri', 'montana', 'nebraska', 'nevada', 'new-hampshire',
  'new-jersey', 'new-mexico', 'new-york', 'north-carolina', 'north-dakota', 'ohio',
  'oklahoma', 'oregon', 'pennsylvania', 'rhode-island', 'south-carolina', 'south-dakota',
  'tennessee', 'texas', 'utah', 'vermont', 'virginia', 'washington', 'west-virginia',
  'wisconsin', 'wyoming',
]

const CORE_PAGES = [
  { url: `${BASE}/`, priority: 1.0 },
  { url: `${BASE}/part-b-irmaa`, priority: 0.9 },
  { url: `${BASE}/advantage-vs-original`, priority: 0.9 },
  { url: `${BASE}/part-d`, priority: 0.9 },
  { url: `${BASE}/medigap`, priority: 0.9 },
  { url: `${BASE}/social-security`, priority: 0.9 },
  { url: `${BASE}/rmd`, priority: 0.9 },
  { url: `${BASE}/retirement-income`, priority: 0.9 },
  { url: `${BASE}/about`, priority: 0.5 },
  { url: `${BASE}/privacy`, priority: 0.3 },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const coreEntries: MetadataRoute.Sitemap = CORE_PAGES.map(p => ({
    url: p.url,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: p.priority,
  }))

  const stateEntries: MetadataRoute.Sitemap = STATE_SLUGS.flatMap(slug => [
    {
      url: `${BASE}/${slug}-medicare-calculator`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${BASE}/${slug}-medicare-advantage`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${BASE}/${slug}-social-security-calculator`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${BASE}/${slug}-medigap-plans`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
  ])

  return [...coreEntries, ...stateEntries]
}
