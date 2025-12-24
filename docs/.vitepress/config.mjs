import { defineConfig } from 'vitepress'

// Check if we're in development mode
const isDev = process.env.NODE_ENV !== 'production';

export default defineConfig({
  title: 'Sylva Documentation',
  description: 'Technical documentation for Sylva - A Monad-native framework for user-seeded autonomous agents',
  base: isDev ? '/' : '/docs/',
  
  // Ensure proper head meta for mobile
  head: [
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }]
  ],
  
  themeConfig: {
    logo: '/logo.svg',
    
    // Mobile menu configuration
    outline: 'deep',
    sidebarMenuLabel: 'Menu',
    returnToTopLabel: 'Return to top',
    
    // Ensure mobile menu is always accessible
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/overview' },
      { text: 'Architecture', link: '/architecture/agent-seed-model' },
      { text: '← Back to Sylva', link: isDev ? 'http://localhost:3000' : '../' }
    ],

    // Collapsible sidebar groups for better mobile UX
    sidebar: [
      {
        text: 'Introduction',
        collapsed: false,
        items: [
          { text: 'Overview', link: '/guide/overview' },
          { text: 'Why Agents? Why Now?', link: '/guide/why-agents-why-now' },
          { text: 'Why Monad?', link: '/guide/why-monad' },
          { text: 'Core Principles', link: '/guide/core-principles' },
          { text: 'Design Constraints', link: '/guide/design-constraints' }
        ]
      },
      {
        text: 'Getting Started',
        collapsed: false,
        items: [
          { text: 'Installation & Setup', link: '/getting-started/installation' },
          { text: 'Seeding Your First Agent', link: '/getting-started/seeding-agents' },
          { text: 'Quick Start Tutorial', link: '/getting-started/quickstart' }
        ]
      },
      {
        text: 'Architecture',
        collapsed: true,
        items: [
          { text: 'Agent Seed Model', link: '/architecture/agent-seed-model' },
          { text: 'Task Primitives', link: '/architecture/task-primitives' },
          { text: 'Agent Lifecycle', link: '/architecture/agent-lifecycle' },
          { text: 'Weighting & Voting', link: '/architecture/weighting-voting' }
        ]
      },
      {
        text: 'Consensus',
        collapsed: true,
        items: [
          { text: 'Sylva Fabric', link: '/consensus/sylva-fabric' },
          { text: 'Collusion Detection', link: '/consensus/collusion-detection' },
          { text: 'State Upgrades', link: '/consensus/state-upgrades' }
        ]
      },
      {
        text: 'Economics',
        collapsed: true,
        items: [
          { text: 'Revenue Models', link: '/economics/revenue-models' },
          { text: 'Tokenomics', link: '/economics/tokenomics' },
          { text: 'Performance Incentives', link: '/economics/incentives' }
        ]
      },
      {
        text: 'Technical Specifications',
        collapsed: true,
        items: [
          { text: 'Smart Contracts', link: '/technical/smart-contracts' },
          { text: 'Monad Integration', link: '/technical/monad-integration' },
          { text: 'Security Model', link: '/technical/security-model' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/oleacomputer/sylva' }
    ],

    footer: {
      message: 'Built by Olea Computer',
      copyright: 'Copyright © 2024-present Olea Computer'
    }
  }
})
