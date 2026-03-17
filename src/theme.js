// THEME.JS — Townhomes on Malaga (Dwell 365)
// Single source of truth for all content, styling, and data.
// Every section component reads from this object. Do not hardcode content in components.

const theme = {
  // ─── Client & Agency ───
  client: {
    name: 'Dwell 365',
    slug: 'malaga-townhomes',
    industry: 'Luxury real estate development',
    tagline: 'A Marketing Proposal',
  },
  agency: {
    name: 'Kameha Media Group',
    nameShort: 'KAMEHA',
    nameAccent: 'MEDIA',
    contact: 'Alex Calienes',
    email: 'alex@kamehamedia.com',
    logoUrl: '/images/kameha-logo-white.png',
    date: 'March 2026',
  },

  // ─── Images ───
  images: {
    hero: '/images/hero-rendering.jpg',
    opportunity: '/images/rendering-exterior.jpg',
    divider1: '/images/rendering-living.jpg',
    divider2: '/images/rendering-terrace.jpg',
  },

  propertyAddress: '626 & 628 Malaga Avenue, Coral Gables',

  // ─── Colors ───
  // Luxury real estate: black base, warm gold accent, taupe accents
  colors: {
    bgDark: '#0a0a0a',
    bgLight: '#faf8f5',
    bgSurface: '#141414',
    accent: '#1a1a18',
    accentPop: '#c9a96e',
    textPrimary: '#ffffff',
    textDark: '#1a1a18',
    textSecondary: '#a8a8a0',
    textMuted: '#8a8a82',
    border: '#2a2a28',
  },

  // ─── Typography ───
  // Luxury: Playfair Display serif headings, DM Sans clean body
  fonts: {
    heading: "'Playfair Display', Georgia, serif",
    body: "'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif",
    mono: "'JetBrains Mono', 'SF Mono', monospace",
  },

  // ─── Animation ───
  easing: [0.23, 1, 0.32, 1],

  // ─── Navigation ───
  nav: {
    links: [
      { label: 'SCOPE', target: 'scope' },
      { label: 'TIMELINE', target: 'timeline' },
      { label: 'INVESTMENT', target: 'investment' },
      { label: 'CONTACT', target: 'nextSteps' },
    ],
  },

  // ─── Hero ───
  hero: {
    eyebrow: 'DWELL 365 × KAMEHA MEDIA GROUP',
    headline: 'Townhomes on Malaga',
    subtitle: 'A marketing program designed to sell two landmark residences at the level they were built.',
    footer: 'Prepared by Kameha Media Group. March 2026',
    appreciation: 'Thank you for the opportunity to present this proposal.',
    propertyDetail: '~$13.5M Total Sellout',
  },

  // ─── Opportunity ───
  opportunity: {
    id: 'opportunity',
    label: 'THE OPPORTUNITY',
    headline: 'The Property Deserves the Presentation',
    paragraphs: [
      'At a combined sellout north of $13 million, 626 and 628 Malaga Avenue reflect the standard Dwell 365 is known for. The architecture, the finishes, the location. None of that translates automatically into a buyer\'s first impression online, in print, or on-site. This proposal outlines a phased marketing program that closes the gap between how well these townhomes are built and how they are presented to the market.',
    ],
  },

  // ─── Approach ───
  approach: {
    id: 'approach',
    label: 'OUR APPROACH',
    headline: 'Phased, Not Rushed',
    cards: [
      {
        label: 'Phase 1: Brand and Print',
        detail: 'Establish the visual identity and produce all physical marketing materials before the property is complete.',
        expanded: 'We begin with brand identity to ensure a cohesive visual language across every touchpoint. From there, we design and produce a luxury marketing magazine, materials and specifications booklet, floor plan booklet, and branded presentation packaging. All print materials are prepared from architectural renderings and specs so they are ready the moment construction completes.',
      },
      {
        label: 'Phase 2: Photography and Video',
        detail: 'Professional photography and cinematic video production once the property is staged and furnished.',
        expanded: 'Once the space is finished and staged, we deploy a full production team for interior, exterior, aerial, and detail photography (55-75 images total), a cinematic marketing video with FPV drone coverage, targeted digital ad cuts, and an updated brochure insert with real photography to replace the rendering-based version from Phase 1.',
      },
    ],
  },

  // ─── Website Upgrade (Add-On Section) ───
  websiteUpgrade: {
    id: 'websiteUpgrade',
    label: 'YOUR DIGITAL PRESENCE',
    headline: 'The Site Does Not Match the Build',
    currentIssues: {
      intro: 'We audited d3vest.com and malagatownhomes.com. For a $6.15 million per-unit property in the Coral Gables Biltmore section, the current web presence has issues that are costing you credibility before a buyer ever walks through the door.',
      items: [
        { headline: 'Default Wix placeholder title', detail: 'Google search results show "My Site." Every buyer sees that before they click.' },
        { headline: 'Zero organic search visibility', detail: 'Client-side rendering blocks Google indexing. The only indexed page is the booking page. malagatownhomes.com redirects to a landing page with no indexable content.' },
        { headline: 'No specifications or materials', detail: 'Bronze-finished impact windows, European double vanities, natural stone countertops. The finishes that justify the price point are not presented anywhere.' },
        { headline: 'No lead capture', detail: 'No inquiry form, no automated follow-up. Buyers have no clear path to schedule a showing or request information.' },
        { headline: 'No neighborhood context', detail: 'Walking distance to Miracle Mile, Merrick Park, the Biltmore, and the Coral Gables business district. None of that positioning exists on the site.' },
        { headline: 'No interactive floor plans', detail: '4,647 sq ft across three levels with elevator access and 1,000+ sq ft of outdoor space. Buyers cannot understand the layout before visiting.' },
        { headline: 'Competition is ahead', detail: 'The Village at Coral Gables has virtual tours, interactive floor plans, a brand film, and professional photography. Their units start at $2.2M. Yours are three times the price with a fraction of the digital presence.' },
      ],
    },
    proposal: {
      intro: 'A purpose-built malagatownhomes.com that presents the property at the level it was constructed. One page, no template, designed to convert qualified interest into a scheduled showing. Built during Phase 1 using renderings and architectural specs, then updated with professional photography after Phase 2.',
      items: [
        'Custom-built responsive site (not Wix, not a template) with proper SEO, meta tags, and Open Graph data so the property appears correctly in Google and link previews',
        'Full-screen photography gallery with interior, exterior, aerial, and detail shots organized by room and level',
        'Interactive floor plans: tap any room across all three levels to see dimensions, finishes, and fixtures',
        'Specifications and materials section organized by trade, matching the print booklet',
        'Inquiry form with automated lead notifications to your team and CRM integration',
        'Professional copywriting (up to 2,000 words) written to sell the lifestyle, not describe the square footage',
        'Responsive design tested on desktop, tablet, and mobile Safari',
        'Connected to the same brand identity established in Phase 1',
      ],
    },
    price: 6500,
  },

  // ─── iPad Deck (Add-On Section) ───
  ipadDeck: {
    id: 'ipadDeck',
    label: 'THE SHOWING EXPERIENCE',
    headline: 'The Tool That Closes the Room',
    intro: 'You described the showing you want to give. Soft music from the invisible speakers. The scent in the air system. Drinks lined up. Every surface spotless. The buyer walks in and the experience starts before they ask a single question.',
    paragraphs: [
      'That experience is physical. What happens when the buyer asks about the insulation? The fire-rated drywall? The sprinkler system? The flooring system on the rooftop terrace? You know every answer. But pulling up photos on your phone or flipping through a binder breaks the moment. The information needs to be one tap away.',
      'The Interactive iPad Deck is a web-based presentation built specifically for this property, designed to run on an iPad during in-person showings. It is not a slideshow. It is not a PDF. It is a data-rich, specification-driven tool where every material, every fixture, every construction detail is organized and accessible in a single touch. The value is not in showing the house. The buyer is standing in the house. The value is in showing them everything they cannot see: the closed-cell spray foam behind the walls, the fire-rated drywall, the structural engineering, the mechanical systems.',
    ],
    buildNote: 'The deck is built during Phase 1, in parallel with brand and print collateral. It does not require photography. All specifications, materials data, floor plans, and the brand narrative are loaded from architectural documents and construction specs. The deck is ready the moment the property can be shown. If professional photography is added later, images can be swapped in without rebuilding.',
    dualUse: 'The deck works two ways. The agent holds the iPad and uses it as a reference during the walkthrough, pulling up specs and details as the conversation moves from room to room. Or the buyer holds it themselves, exploring at their own pace while the property speaks for itself. Either way, every detail is one tap away. No searching, no scrolling through folders, no breaking the experience to find an answer.',
    disclaimer: 'Visual representation for concept purposes. Final design will be tailored to approved brand identity and photography.',
    features: [
      {
        title: 'Room-by-Room Navigation',
        description: 'One tap into any space. Living room, kitchen, master suite, rooftop terrace. Each room surfaces the exact materials, fixtures, and finishes installed in that space. No searching, no menus. The buyer taps the room they are standing in and sees everything about it instantly.',
      },
      {
        title: 'Specification Panels',
        description: 'Every construction detail organized by trade. Structural, plumbing, electrical, mechanical. When a buyer asks about the 5/8-inch fire-rated drywall or the closed-cell spray foam insulation, the answer is one tap away. The same depth as the printed specifications booklet, but faster to navigate.',
      },
      {
        title: 'Floor Plan Explorer',
        description: 'Interactive per-level floor plans. Tap any room to see dimensions, square footage, and a direct link to that room\'s specification panel. The buyer builds a mental map of the property while standing inside it. No PDFs. No zooming and scrolling.',
      },
      {
        title: 'Brand Narrative',
        description: 'The Dwell 365 story woven throughout. Not as a sales pitch, but as context. Who built this. Why it was built this way. What separates it from the property down the street. The narrative reinforces everything the buyer is seeing and feeling.',
      },
      {
        title: 'Photography Integration',
        description: 'When Phase 2 photography is complete, detail shots load directly into each room view. Close-ups of the recessed hardware, the white oak stairs, the steam generator. Optional but powerful. The deck works without photography. It works even better with it.',
      },
    ],
    closingStatement: 'When MG Developer sells a property down the street, the buyer gets a folder. When Dwell 365 sells a property on Malaga, the buyer gets an experience that starts at the gate and does not end until they leave. This is the tool that makes that possible.',
    price: 13000,
  },

  // ─── Scope (Phased Deliverables) ───
  scope: {
    id: 'scope',
    label: 'SCOPE OF WORK',
    headline: 'The Essential Deliverables',
    phases: [
      {
        number: '01',
        title: 'Brand and Print Collateral',
        subtitle: 'Weeks 1-6 (before construction completes)',
        intro: 'Establish the visual identity and produce every physical marketing asset before the property is finished, so Dwell 365 is ready to go to market the day the doors open.',
        groups: [
          {
            heading: 'Brand Identity',
            items: [
              'Malaga Townhomes project identity: logo mark, color palette, and typography system',
              'Developer attribution lockup ("Built by Dwell 365") for consistent branding across all materials',
            ],
          },
          {
            heading: 'Print Collateral',
            items: [
              'Luxury marketing magazine (10-12 pages): embossed cover, premium paper stock, project narrative, key features, finishes, and neighborhood positioning',
              'Materials and specifications booklet organized by trade (structural, plumbing, electrical, mechanical) with manufacturer and model for every fixture and finish',
              'Floor plan booklet: per-level architectural layouts, room dimensions, and square footage breakdowns',
            ],
          },
          {
            heading: 'Presentation Package',
            items: [
              'Branded presentation folder with embossed development company logo and pocket inserts',
              'Branded presentation bag with project identity, sized to hold the folder and complete print package',
            ],
          },
          {
            heading: 'Production',
            items: [
              'Professional copywriting for all print collateral (up to 2,000 words)',
              'Print production management: vendor coordination, paper and finish selection, proof approval, and delivery',
            ],
          },
        ],
      },
      {
        number: '02',
        title: 'Photography and Video Production',
        subtitle: 'Weeks 7-12 (after staging and furnishing)',
        intro: 'Professional imagery and cinematic video that capture the quality of the finished, fully furnished space and give every listing platform, agent, and prospective buyer the strongest possible first impression.',
        groups: [
          {
            heading: 'Photography',
            items: [
              'Interior photography: every room across all three levels, staged and fully furnished (30-40 images)',
              'Exterior photography: front elevation, street presence, driveway, gated entry, and landscaping (8-12 images)',
              'Aerial and drone photography: property overview, neighborhood context, proximity to Biltmore and Coral Gables landmarks (6-10 images)',
              'Detail photography: finishes, hardware, fixtures, appliances, and material close-ups (10-15 images)',
            ],
          },
          {
            heading: 'Video',
            items: [
              'Cinematic marketing video (60-90 seconds): music-driven, showcasing lifestyle, construction quality, and the Coral Gables location',
              'FPV drone interior fly-through sequence integrated into the marketing video',
              'Targeted digital ad cuts: 15-second and 30-second versions for Facebook and Instagram campaigns',
            ],
          },
          {
            heading: 'Deliverables',
            items: [
              'Updated brochure insert with real photography to replace the rendering-based version from Phase 1',
              'Listing-ready image package optimized for MLS, Zillow, and Realtor.com',
            ],
          },
        ],
      },
    ],
    exclusions: [
      'All materials are for Unit 1 (628 Malaga Avenue) only. Production for Unit 2 (626) is a separate engagement.',
      'Staging or furniture rental',
      'Additional shooting days beyond the scope defined above',
      'Social media management or content posting',
      'Paid advertising spend, MLS listing support, or media buying',
    ],
  },

  // ─── Timeline ───
  timeline: {
    id: 'timeline',
    label: 'THE TIMELINE',
    headline: 'How It Comes Together',
    steps: [
      {
        number: '01',
        title: 'Brand and Print Collateral',
        description: 'Brand identity, logo, magazine design, booklets, packaging, and print production. All work uses architectural renderings and specs provided by Thais Tebet and the construction team.',
        timeframe: 'Weeks 1-6',
        core: true,
      },
      {
        number: '02',
        title: 'Photography and Video',
        description: 'Triggered once the property is staged and furnished. Full photography coverage (55-75 images), cinematic video with FPV drone, digital ad cuts, and updated brochure insert with real imagery.',
        timeframe: 'Weeks 7-12',
        core: true,
      },
      {
        number: '+',
        title: 'Property Website',
        description: 'Built in parallel with Phase 1 using renderings and architectural specs. Live before construction completes. Photography swapped in after Phase 2.',
        timeframe: 'Weeks 2-6',
        core: false,
      },
      {
        number: '+',
        title: 'Interactive iPad Deck',
        description: 'Built in Phase 1 so it is ready the moment the property can be shown. All specifications, materials data, floor plans, and brand narrative loaded from day one. Photography added after Phase 2 if desired.',
        timeframe: 'Weeks 3-6',
        core: false,
      },
    ],
  },

  // ─── Investment (Three Options) ───
  investment: {
    id: 'investment',
    label: 'INVESTMENT',
    headline: 'Choose Your Market Position',
    packages: [
      {
        title: 'Total Market Position',
        price: 47300,
        tag: 'The complete package. Brand, print, production, a rebuilt property website, and the interactive iPad deck for in-person showings.',
        recommended: true,
        items: [
          'Phase 1: Brand identity, logo, magazine (10-12 pages), specs booklet, floor plans, folder, bag',
          'Phase 2: Photography (55-75 images), cinematic video with FPV, digital ad cuts, brochure insert',
          'Property website on malagatownhomes.com with gallery, floor plans, inquiry form',
          'Interactive iPad Deck for in-person showings',
          'Full copywriting across all deliverables',
          'Print production management',
        ],
        phaseBreakdown: [
          { label: 'Phase 1: Brand and Print', price: 16100 },
          { label: 'Phase 2: Photography and Video', price: 11700 },
          { label: 'Property Website', price: 6500 },
          { label: 'Interactive iPad Deck', price: 13000 },
        ],
      },
      {
        title: 'Full Production',
        price: 34300,
        tag: 'Brand, print, photography, video, and a rebuilt property website to bring everything online.',
        recommended: false,
        items: [
          'Phase 1: Brand identity, logo, magazine (10-12 pages), specs booklet, floor plans, folder, bag',
          'Phase 2: Photography (55-75 images), cinematic video with FPV, digital ad cuts, brochure insert',
          'Property website on malagatownhomes.com with gallery, floor plans, inquiry form',
          'Full copywriting across all deliverables',
          'Print production management',
        ],
        phaseBreakdown: [
          { label: 'Phase 1: Brand and Print', price: 16100 },
          { label: 'Phase 2: Photography and Video', price: 11700 },
          { label: 'Property Website', price: 6500 },
        ],
      },
      {
        title: 'Production Essentials',
        price: 21500,
        tag: 'Core brand, print, and production assets to bring the property to market.',
        recommended: false,
        items: [
          'Phase 1: Brand identity, brochure (6-8 pages), specs booklet, floor plan booklet, folder',
          'Phase 2: Photography (30-40 images), cinematic video with FPV, brochure insert',
          'Print production management',
        ],
        phaseBreakdown: [
          { label: 'Phase 1: Brand and Print (essential)', price: 9800 },
          { label: 'Phase 2: Photography and Video', price: 11700 },
        ],
      },
    ],
    addOns: [],
    paymentTerms: [
      'Per phase: 50% deposit before work begins',
      '25% at midpoint milestone',
      '25% on final delivery',
      'Print production invoiced separately at cost + 15%',
      'No work begins on any phase until that phase deposit is received',
    ],
    printNote: 'Print production is invoiced separately at cost + 15%. Estimated $5,000-$12,000 depending on quantities and finishes.',
  },

  // ─── Market Context ───
  marketContext: {
    id: 'context',
    label: 'MARKET CONTEXT',
    headline: 'What the Market Says You Should Spend',
    paragraphs: [
      'NAHB survey data shows the average home builder spends 0.7-1.0% of final sales price on marketing (2019-2024 NAHB Cost of Constructing a Home surveys). For luxury product in the Coral Gables market, industry practitioners across $5B+ in development experience recommend 1-1.5% of total estimated sellout.',
      'At $13.5M total sellout, 1% equals $135,000. Our recommended option at $47,300 represents just 0.35% of sellout.',
    ],
    benchmark: {
      sellout: 13500000,
      industryPercent: 1,
      industryBudget: 135000,
      recommendedPrice: 47300,
      recommendedPercent: 0.35,
    },
    sources: [
      'NAHB Cost of Constructing a Home 2024',
      'NAHB Cost of Constructing a Home 2022',
      'Butterfly Voyage ($5B+ new development experience)',
      'Milesbrand (home builder marketing agency)',
      'Transforming Cities (real estate marketing firm)',
    ],
  },

  // ─── Proof ───
  proof: {
    id: 'proof',
    label: 'WHY KAMEHA',
    headline: 'Built for This',
    paragraphs: [
      'Kameha Media Group is a Miami-based production and content agency. We produce cinematic brand films, professional photography, FPV drone videography, and digital experiences for clients who understand that presentation is not separate from the product.',
      'Our real estate work includes luxury townhome developments, high-end residential projects, and commercial properties where the marketing program needs to match the quality of the build. We bring the same standard to automotive dealerships, law firms, and healthcare practices. Full-stack production from concept to delivery, no outsourcing of core creative.',
    ],
    stats: [
      { value: 50, suffix: '+', label: 'Projects delivered' },
      { value: 8, suffix: '', label: 'Industries served' },
      { value: 4, suffix: 'K', label: 'Resolution standard' },
      { value: 107, suffix: '', label: 'FAA Part 107 certified' },
    ],
    clients: [
      'Luxury residential developers',
      'Premium automotive dealerships',
      'National law firms',
      'Healthcare practices',
    ],
  },

  // ─── Next Steps ───
  nextSteps: {
    id: 'nextSteps',
    label: 'NEXT STEPS',
    headline: 'Let Us Build This Together',
    cta: 'Accept Proposal',
    ctaSecondary: 'Request Changes',
    ctaLink: 'mailto:alex@kamehamedia.com?subject=Malaga%20Townhomes%20-%20Proposal%20Accepted',
    ctaSecondaryLink: 'mailto:alex@kamehamedia.com?subject=Malaga%20Townhomes%20-%20Revision%20Request',
    formspreeEndpoint: 'https://formspree.io/f/xaqdalby',
    paragraphs: [
      'The construction timeline sets the pace. Phase 1 needs to begin now so that print materials are ready the moment the property reaches visual completion. Every week of delay compresses the marketing window between finished construction and market launch.',
      'Select an option. We will send a formal agreement, coordinate asset access with Thais and the construction team, and begin Phase 1 immediately.',
    ],
    appreciation: 'These townhomes are built to a standard that most properties in Coral Gables never reach. We are ready to make sure the market sees them that way.',
    validityNote: 'Proposal pricing reflects current production costs and team availability. We recommend moving forward within 30 days to hold the proposed timeline.',
  },

  // ─── Terms ───
  terms: {
    title: 'Project Terms',
    items: [
      'Per phase: 50% deposit before work begins, 25% at midpoint milestone, 25% on final delivery. No work begins on any phase until that phase deposit is received.',
      'Print production is invoiced separately at cost + 15%. Estimated $5,000-$12,000 depending on quantities and finishes. Proof/sample sent to all parties before print runs.',
      'Phase 2 (Photography and Video) is triggered once the property reaches visual completion. Kameha and client will coordinate timing. Construction delays do not affect pricing for 120 days from proposal acceptance.',
      'Revisions: one consolidated set of feedback within 48 hours of each deliverable constitutes one round. Round limits per deliverable are defined in the formal agreement.',
      'Changes to approved scope, direction, or timeline require a written change order, quoted and approved before work begins.',
      'Client owns all final deliverables upon full payment. Kameha Media Group retains the right to use delivered work in portfolio and promotional materials unless otherwise agreed in writing.',
      'Proposal pricing is valid for 120 days from the date of delivery.',
    ],
  },

  // ─── Format Specs ───
  formatSpecs: [
    { format: 'Video', spec: '4K (3840x2160), 16:9, 60-90 sec, H.264/MP4' },
    { format: 'Photography', spec: 'High-res JPEG (min 4000px long edge), sRGB' },
    { format: 'Print', spec: 'Print-ready PDF, CMYK, 300 DPI, bleed included' },
    { format: 'Website', spec: 'Responsive (desktop/tablet/mobile), client domain' },
    { format: 'iPad Deck', spec: 'Web-based, optimized for iPad Safari/Chrome' },
  ],
}

// Apply theme colors as CSS custom properties
export function applyTheme() {
  const root = document.documentElement
  const c = theme.colors
  root.style.setProperty('--color-bg', c.bgDark)
  root.style.setProperty('--color-bg-light', c.bgLight)
  root.style.setProperty('--color-surface', c.bgSurface)
  root.style.setProperty('--color-accent', c.accent)
  root.style.setProperty('--color-accent-pop', c.accentPop)
  root.style.setProperty('--color-text', c.textPrimary)
  root.style.setProperty('--color-text-dark', c.textDark)
  root.style.setProperty('--color-text-secondary', c.textSecondary)
  root.style.setProperty('--color-text-muted', c.textMuted)
  root.style.setProperty('--color-border', c.border)

  const f = theme.fonts
  root.style.setProperty('--font-heading', f.heading)
  root.style.setProperty('--font-body', f.body)
  root.style.setProperty('--font-mono', f.mono)
}

export default theme
