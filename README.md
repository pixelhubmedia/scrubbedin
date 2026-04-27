# Scrubbed In

**The UK Professional Network for Healthcare Staff**

Scrubbed In is a professional networking platform built exclusively for healthcare workers in the UK. Inspired by LinkedIn but designed around the realities of hospital life — rotations, departments, specialties, endorsements, and professional connections.

It is an independent platform, not affiliated with or branded by the NHS.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Database / Auth | Supabase (configured in Milestone 3) |
| Deployment | Vercel |
| Design pattern | Mobile-first, responsive |
| UI style | Blue/white, LinkedIn-inspired, healthcare-focused |

---

## Running Locally

### Prerequisites
- Node.js 20+
- npm

### Setup

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Environment Variables

Copy and rename to `.env.local`, then fill in your Supabase credentials when ready:

```bash
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## Project Structure

```
scrubbedin/
├── public/
│   └── milestones.html        # Visual milestone tracker
├── src/
│   ├── app/                   # Next.js App Router pages
│   │   ├── layout.tsx         # Root layout + metadata
│   │   ├── globals.css        # Global styles + brand tokens
│   │   ├── page.tsx           # / — Landing page
│   │   ├── waitlist/          # /waitlist
│   │   ├── login/             # /login
│   │   ├── signup/            # /signup
│   │   ├── feed/              # /feed
│   │   ├── profile/           # /profile
│   │   ├── hospitals/         # /hospitals
│   │   ├── messages/          # /messages
│   │   └── admin/             # /admin
│   ├── components/
│   │   └── ui/                # Reusable UI components
│   │       ├── Button.tsx
│   │       ├── Card.tsx
│   │       └── PlaceholderPage.tsx
│   ├── config/
│   │   └── app.ts             # App config + route constants
│   ├── lib/
│   │   └── supabase/
│   │       ├── client.ts      # Browser Supabase client stub
│   │       └── server.ts      # Server Supabase client stub
│   └── types/
│       └── index.ts           # Core domain types
└── README.md
```

---

## Milestone Tracker

The visual project milestone tracker is available at:

```
/public/milestones.html
```

Open it directly in your browser from the file system, or visit [http://localhost:3000/milestones.html](http://localhost:3000/milestones.html) when the dev server is running.

It shows all 9 project milestones, individual task progress, current build notes, next actions, and key risks.

---

## Current Status

**Milestone 1: Project Foundation — In Progress**

- Next.js project scaffolded with App Router, TypeScript, Tailwind
- All placeholder pages created
- UI component library started
- Supabase client stubs in place
- Config and types scaffolded
- Milestone tracker created

**Up next:** Milestone 2 — Public Website + Early Profile Waitlist

---

## Patient Data Policy

Patient-identifiable data must never be posted publicly on this platform. The feed will implement:
- Warning prompts before posting
- Automated patient-data scanning
- Content blocking for identified violations

This is a non-negotiable safety requirement enforced before any public launch.

---

## Deployment

The app is Vercel-ready. Connect your GitHub repository to Vercel and set the required environment variables in the Vercel dashboard.
