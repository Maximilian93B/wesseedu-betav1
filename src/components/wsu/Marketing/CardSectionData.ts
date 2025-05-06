// Define card types
export type CardData = {
  id: string
  title: string
  description?: string
  className: string
  imageUrl?: string
  buttonText?: string
  buttonHref?: string
  featured?: boolean
  stats?: { value: string; label: string }[]
  highlights?: string[]
}

// Make feature items more benefit-focused and compelling
export const FEATURE_ITEMS = [
  'Access exclusive, vetted opportunities',
  'Invest in sustainable impact ventures',
  'Portfolio backed by industry experts',
  'Direct communication with founders'
]

// Enhance card data with more compelling sales copy and additional content for secondary cards
export const CARDS: CardData[] = [
  {
    id: 'platform',
    title: 'Your Gateway to Impact Investing',
    description: 'Join our community of impact investors gaining early access to high-potential sustainable startups.',
    className: 'group md:col-start-2 md:col-end-3 md:row-start-1 md:z-10',
    buttonText: 'Join Our Investors',
    imageUrl: '/home_preview.png',
    buttonHref: '/auth/signup',
    featured: true,
    stats: [
      { value: '20', label: 'Startups' },
      { value: '92%', label: 'ESG Satisfaction' },
      { value: '$2.4M', label: 'Invested' }
    ]
  },
  {
    id: 'investment',
    title: 'WeSeedU Communities',
    description: 'Connect with ambassador-led communities where companies share sustainable innovations directly with investors and enthusiasts.',
    className: 'group md:col-start-1 md:col-end-2 md:row-start-1 md:z-0',
    imageUrl: '/community_preview.png',
    buttonText: 'Explore Communities',
    buttonHref: '#',
    stats: [
      { value: '20+', label: 'Communities' },
      { value: '35+', label: 'Ambassadors' }
    ],
    highlights: [
      'Ambassador updates',
      'Direct founder communication',
      'Sustainable innovation education'
    ]
  },
  {
    id: 'security',
    title: 'Smart Dashboard, Data-Driven Insights',
    description: 'Behind-the-scenes AI helps analyze your investments and sustainability metrics as we continue enhancing our platform.',
    className: 'group md:col-start-3 md:col-end-4 md:row-start-1 md:z-0',
    imageUrl: '/dashboard_explainer.png',
    buttonText: 'Experience Dashboard',
    buttonHref: '#',
    stats: [
      { value: 'Impact', label: 'Scoring' },
      { value: 'Data', label: 'Analytics' }
    ],
    highlights: [
      'AI-enhanced analysis tools',
      'Sustainability insights',
      'Performance tracking',
    ]
  }
] 