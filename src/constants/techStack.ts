export interface TechItem {
  name: string;
  /** Icon for light theme (also used in dark if no dark variant). */
  icon?: string;
  /** Icon variant for dark theme. */
  iconDark?: string;
  /** Monochrome icon that should be inverted in dark mode. */
  invertInDark?: boolean;
}

export interface TechCategory {
  category: string;
  items: TechItem[];
}

const svgl = (name: string) => `https://svgl.app/library/${name}.svg`;
const simpleIcon = (slug: string) => `https://cdn.simpleicons.org/${slug}`;

export const TECH_STACK: TechCategory[] = [
  {
    category: 'Languages',
    items: [
      { name: 'TypeScript', icon: svgl('typescript') },
      { name: 'Go', icon: svgl('golang') },
      { name: 'Rust', icon: svgl('rust'), invertInDark: true },
      { name: 'Python', icon: svgl('python') },
      { name: 'Kotlin', icon: svgl('kotlin') },
    ],
  },
  {
    category: 'Frontend',
    items: [
      // Frameworks
      { name: 'React', icon: svgl('react_light'), iconDark: svgl('react_dark') },
      { name: 'Next.js', icon: svgl('nextjs_icon_dark'), invertInDark: true },
      { name: 'TanStack Start' },
      { name: 'React Native', icon: svgl('react_light'), iconDark: svgl('react_dark') },
      { name: 'Expo', icon: svgl('expo'), invertInDark: true },
      // Styling & UI
      { name: 'Tailwind CSS', icon: svgl('tailwindcss') },
      { name: 'shadcn/ui', icon: svgl('shadcn-ui'), iconDark: svgl('shadcn-ui_dark') },
      { name: 'Motion', icon: svgl('motion'), iconDark: svgl('motion_dark') },
      { name: 'Zustand' },
      // Data viz & maps
      { name: 'MapLibre' },
      { name: 'deck.gl' },
      { name: 'Recharts' },
      // Libraries
      { name: 'dnd-kit' },
      { name: 'Shiki' },
    ],
  },
  {
    category: 'Backend & Data',
    items: [
      // Runtimes & frameworks
      { name: 'Node.js', icon: svgl('nodejs') },
      { name: 'Express', icon: svgl('expressjs'), iconDark: svgl('expressjs_dark') },
      { name: 'Hono', icon: svgl('hono') },
      { name: 'chi' },
      { name: 'FastAPI', icon: svgl('fastapi') },
      // Databases
      { name: 'PostgreSQL', icon: svgl('postgresql') },
      { name: 'SQLite', icon: svgl('sqlite') },
      { name: 'MongoDB', icon: svgl('mongodb-icon-light'), iconDark: svgl('mongodb-icon-dark') },
      { name: 'Cloudflare D1', icon: simpleIcon('cloudflare') },
      { name: 'Cloudflare KV', icon: simpleIcon('cloudflare') },
      { name: 'Cloudflare R2', icon: simpleIcon('cloudflare') },
      { name: 'Durable Objects', icon: simpleIcon('cloudflare') },
      // ORMs
      { name: 'Prisma', icon: svgl('prisma'), iconDark: svgl('prisma_dark') },
      { name: 'Drizzle', icon: svgl('drizzle-orm_light'), iconDark: svgl('drizzle-orm_dark') },
      { name: 'Mongoose', icon: simpleIcon('mongoose') },
      // Formats & services
      { name: 'Protobuf' }
    ],
  },
  {
    category: 'AI & Automation',
    items: [
      { name: 'LangChain', icon: simpleIcon('langchain'), iconDark: simpleIcon('langchain/white') },
      { name: 'Gemini API', icon: svgl('gemini') },
      { name: 'Hugging Face', icon: svgl('hugging_face') },
      { name: 'AI Agents' },
      { name: 'Vector Search' },
      { name: 'Web Scraping' },
      { name: 'Reverse Engineering' },
    ],
  },
  {
    category: 'DevOps & Cloud',
    items: [
      // Version control & CI
      { name: 'Git', icon: svgl('git') },
      { name: 'GitHub', icon: svgl('github_light'), iconDark: svgl('github_dark') },
      { name: 'GitHub Actions', icon: simpleIcon('githubactions') },
      // Infra
      { name: 'Docker', icon: svgl('docker') },
      { name: 'Nginx', icon: svgl('nginx') },
      // Hosting & cloud
      { name: 'AWS', icon: svgl('aws_light'), iconDark: svgl('aws_dark') },
      { name: 'Cloudflare Workers', icon: simpleIcon('cloudflareworkers') },
      { name: 'Vercel', icon: svgl('vercel'), iconDark: svgl('vercel_dark') },
    ],
  },
];
