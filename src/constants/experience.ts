export interface ExperienceItem {
  title: string;
  company: string;
  duration?: string;
  description: string;
}

export const EXPERIENCE: ExperienceItem[] = [
  {
    title: 'Backend Developer',
    company: 'Brikby',
    description:
      "Building the land-records agent behind Brikby's AI property due-diligence platform: agentic workers that pull encumbrance certificates, market values and property-tax records from Indian government portals and turn them into clean, typed APIs. Also shipped core backend for the main brikby.com platform, all on Cloudflare Workers with Hono, D1, R2, KV and Durable Objects.",
  },
  {
    title: 'Full‑Stack Developer',
    company: 'Neosophical Labs',
    description:
      'Building Ahoum, a self-hosted virtual-office platform: a WorkAdventure world with LiveKit audio/video, Authentik SSO and Plane task management, deployed on Coolify behind Cloudflare. Also built office-scribe, a bot that turns meeting audio into Plane issues through Groq Whisper and an LLM pipeline.',
  },
  {
    title: 'Backend Developer',
    company: 'OpenSoft (GC), IIT Kharagpur',
    duration: 'Mar 2025',
    description:
      'Built a FastAPI backend on LangChain and Gemini that reads conversations, scores vulnerability, and turns them into well‑being reports for HR.',
  },
  {
    title: 'Full‑Stack Developer',
    company: 'Jobfynder',
    duration: 'Nov 2024 – Feb 2025',
    description:
      'Shipped a job board with real‑time chat and applicant tracking. Built JWT role-based auth, an SES/SQS email pipeline, and CI/CD deploys to AWS EC2.',
  },
  {
    title: 'Python Backend Developer',
    company: 'Inter IIT Tech Meet, IIT Kharagpur',
    duration: 'Dec 2024',
    description:
      'Built a Quart backend that flies physical drones over MAVSDK, with REST APIs and Socket.IO streaming live telemetry to a React dashboard.',
  },
  {
    title: 'Backend Developer (Open Source)',
    company: 'GirlScript Summer Of Code',
    duration: 'Mar 2024',
    description:
      'Worked on the Express.js service behind the GSSoC leaderboard: contributor verification, label checks, and caching to stay under GitHub API rate limits.',
  },
];
