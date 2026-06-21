import type { MetadataRoute } from 'next'

// Explicitly welcome both traditional search crawlers and the AI-answer crawlers
// (ChatGPT, Claude, Perplexity, Gemini). For a marketing site we *want* to be
// quoted by AI assistants, so we allow them rather than the common default of blocking.
const AI_CRAWLERS = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-Web',
  'anthropic-ai',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'Applebot-Extended',
  'CCBot',
]

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/' },
      ...AI_CRAWLERS.map((ua) => ({ userAgent: ua, allow: '/' })),
    ],
    sitemap: 'https://trovar.co.nz/sitemap.xml',
    host: 'https://trovar.co.nz',
  }
}
