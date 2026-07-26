import type { Project } from '@/types/project';

export const PROJECTS: Project[] = [
  {
    id: 'trano',
    name: 'Trano',
    tagline: 'Live Train Tracking for Indian Railways',
    blurb:
      "Tracks every train on the Indian Railways network in real time: live positions, timetables, station boards, coach layouts and punctuality history. A Go backend to pull the national feed, indexes positions on Uber's H3 grid, and streams Protobuf to a React map built on MapLibre and deck.gl.",
    stack: ['Go', 'PostgreSQL', 'Protobuf', 'Uber H3', 'React', 'TanStack Start', 'MapLibre', 'deck.gl'],
    links: {
      live: 'https://trano.rpunia.com',
    },
  },
  {
    id: 'extractous',
    name: 'Extractous Go',
    tagline: 'Document Extraction Library',
    blurb:
      'A multi-format document extraction library for Go that binds a Rust core over CGO. It streams large files instead of loading them whole, parses formats through Apache Tika, and reads scanned documents with Tesseract OCR.',
    stack: ['Go', 'Rust', 'CGO', 'Apache Tika', 'Tesseract', 'GitHub Actions'],
    links: {
      code: 'https://github.com/rpunia29/extractous-go',
    },
  },
  {
    id: 'api-gateway',
    name: 'API Gateway',
    tagline: 'Microservice Router',
    blurb:
      'A config-driven API gateway in Go with radix-tree routing, hot config reload, and reverse proxying. Stateless, with round-robin and least-connections load balancing, driven by a Cobra CLI.',
    stack: ['Go', 'Cobra', 'Radix Tree', 'net/http', 'Reverse Proxy'],
    links: {
      code: 'https://github.com/rpunia29/api-gateway',
    },
  },
  // {
  //   id: 'iitkgp-erp-login',
  //   name: 'IITKGP ERP Login',
  //   tagline: 'ERP Automation Package',
  //   blurb:
  //     'A Node.js package that seamlessly handles IIT Kharagpur ERP login workflows. Exposes CLI and programmatic APIs to automate OTP, security questions, and session management. Published on npm.',
  //   stack: ['Node.js', 'TypeScript', 'CLI', 'npm'],
  //   links: {
  //     live: 'https://www.npmjs.com/package/iitkgp-erp-login',
  //     code: 'https://github.com/rpunia29/IITKGP-ERP-LOGIN',
  //   },
  // },
  {
    id: 'applic',
    name: 'Applic',
    tagline: 'Job Application Tracker',
    blurb:
      'A job-application tracker built on Next.js. Tracks status, schedules interviews, and stores documents through UploadThing, backed by Prisma and Postgres with NextAuth and optimistic UI updates.',
    stack: ['Next.js', 'TypeScript', 'PostgreSQL', 'Prisma', 'NextAuth', 'UploadThing', 'Tailwind'],
    links: {
      live: 'https://applic.vercel.app',
      code: 'https://github.com/rpunia29/applic',
    },
  },
  {
    id: 'devmetrics',
    name: 'Devmetrics',
    tagline: 'VS Code Extension',
    blurb:
      'A VS Code extension that measures your coding from Git diffs and stores it locally in LokiJS, so nothing leaves your machine. Shows per-project timelines and which files you spend the most time in.',
    stack: ['TypeScript', 'VS Code API', 'LokiJS', 'simple-git', 'esbuild'],
    links: {
      code: 'https://github.com/rpunia29/devmetrics',
    },
  },
  {
    id: 'form-builder',
    name: 'Form Builder',
    tagline: 'Visual Form Designer',
    blurb:
      'A drag-and-drop form builder (dnd-kit) that exports React Hook Form components with Zod validation, plus a live, Shiki-highlighted code preview you can copy straight into a project.',
    stack: ['React', 'TypeScript', 'dnd-kit', 'React Hook Form', 'Zod', 'Shiki'],
    links: {
      live: 'https://form-builder-bj3.pages.dev',
      code: 'https://github.com/rpunia29/form-builder',
    },
  },
  {
    id: 'shad-ui',
    name: 'Shad-UI Builder',
    tagline: 'Visual Component Builder',
    blurb:
      'A visual builder for shadcn/ui components, built on Craft.js with a live iframe preview. Compose blocks, edit their props, and export clean JSX.',
    stack: ['Next.js', 'TypeScript', 'Craft.js', 'Tailwind', 'shadcn/ui'],
    links: {
      live: 'https://shad-ui.vercel.app/editor',
      code: 'https://github.com/rpunia29/Shad-UI',
    },
  },
];
