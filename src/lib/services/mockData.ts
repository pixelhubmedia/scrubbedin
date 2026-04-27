// Mock seed data used during local development.
// TODO (Supabase): replace with database seed files / Supabase Studio inserts.

import type { User, Profile, Badge } from "@/types";

export const MOCK_BADGES: Badge[] = [
  {
    id: "badge-founding-referrer",
    name: "Founding Referrer",
    description:
      "Awarded to healthcare professionals who helped grow Scrubbed In by inviting 5 colleagues during early access.",
    badgeType: "founding_referrer",
    icon: "🏅",
  },
  {
    id: "badge-verified-staff",
    name: "Verified Healthcare Staff",
    description: "Identity verified as a registered UK healthcare professional.",
    badgeType: "verified_staff",
    icon: "✅",
  },
  {
    id: "badge-hospital-moderator",
    name: "Hospital Moderator",
    description: "Appointed moderator for a hospital page on Scrubbed In.",
    badgeType: "hospital_moderator",
    icon: "🏥",
  },
];

// Demo accounts — visible on the platform when browsing mock profiles
export const MOCK_USERS: User[] = [
  {
    id: "user-demo-1",
    email: "sarah.chen@demo.scrubbedin",
    _mockPasswordHash: "demo",
    createdAt: "2026-01-15T09:00:00Z",
  },
  {
    id: "user-demo-2",
    email: "james.obrien@demo.scrubbedin",
    _mockPasswordHash: "demo",
    createdAt: "2026-01-20T11:30:00Z",
  },
  {
    id: "user-demo-3",
    email: "priya.sharma@demo.scrubbedin",
    _mockPasswordHash: "demo",
    createdAt: "2026-02-01T08:15:00Z",
  },
];

export const MOCK_PROFILES: Profile[] = [
  {
    id: "profile-demo-1",
    userId: "user-demo-1",
    fullName: "Dr Sarah Chen",
    username: "sarah-chen",
    currentPosition: "ST4",
    roleProfession: "doctor",
    bio: "Cardiology registrar based in London. Interested in interventional cardiology and structural heart disease. Love teaching FY doctors and medical students.",
    currentHospital: "Barts Heart Centre",
    currentDepartment: "Cardiology",
    region: "london",
    sector: "nhs",
    privacy: {
      profileVisibility: "public",
      showCurrentHospital: true,
      showFutureRotations: true,
      searchEngineIndexing: false,
    },
    createdAt: "2026-01-15T09:05:00Z",
    updatedAt: "2026-01-15T09:05:00Z",
  },
  {
    id: "profile-demo-2",
    userId: "user-demo-2",
    fullName: "James O'Brien",
    username: "james-obrien",
    currentPosition: "FY2",
    roleProfession: "doctor",
    bio: "FY2 rotating through general surgery at the Royal Free. Previously at UCLH. Always happy to connect with other trainees.",
    currentHospital: "Royal Free Hospital",
    currentDepartment: "General Surgery",
    region: "london",
    sector: "nhs",
    privacy: {
      profileVisibility: "public",
      showCurrentHospital: true,
      showFutureRotations: false,
      searchEngineIndexing: false,
    },
    createdAt: "2026-01-20T11:35:00Z",
    updatedAt: "2026-01-20T11:35:00Z",
  },
  {
    id: "profile-demo-3",
    userId: "user-demo-3",
    fullName: "Priya Sharma",
    username: "priya-sharma",
    currentPosition: "band-7",
    roleProfession: "nurse",
    bio: "Senior ICU nurse at UCLH. Specialist interest in sepsis management and post-ICU rehabilitation. 10 years in critical care.",
    currentHospital: "University College Hospital",
    currentDepartment: "Intensive Care Unit",
    region: "london",
    sector: "nhs",
    privacy: {
      profileVisibility: "public",
      showCurrentHospital: true,
      showFutureRotations: true,
      searchEngineIndexing: false,
    },
    createdAt: "2026-02-01T08:20:00Z",
    updatedAt: "2026-02-01T08:20:00Z",
  },
];

export const MOCK_POSTS = [
  {
    id: "post-1",
    authorId: "user-demo-1",
    authorName: "Dr Sarah Chen",
    authorPosition: "ST4 · Cardiology",
    authorHospital: "Barts Heart Centre",
    content:
      "Just wrapped up a brilliant teaching session with our FY1s on STEMI management. The enthusiasm these doctors bring is genuinely infectious. Never stop teaching — it keeps you sharp too. 🫀",
    likeCount: 47,
    commentCount: 8,
    createdAt: "2026-04-26T14:30:00Z",
  },
  {
    id: "post-2",
    authorId: "user-demo-3",
    authorName: "Priya Sharma",
    authorPosition: "Band 7 · ICU Nurse",
    authorHospital: "University College Hospital",
    content:
      "Proud to share that our unit just completed a 6-month sepsis bundle audit — compliance up to 94% from 71%. Team effort from nurses, docs, physios and pharmacists. This is what good MDT working looks like.",
    likeCount: 82,
    commentCount: 14,
    createdAt: "2026-04-25T09:15:00Z",
  },
  {
    id: "post-3",
    authorId: "user-demo-2",
    authorName: "James O'Brien",
    authorPosition: "FY2 · General Surgery",
    authorHospital: "Royal Free Hospital",
    content:
      "Tip for FY rotators: introduce yourself to the ward clerk on day one. They know everything — where the equipment is, which consultants prefer what, how to get things done. Best kept secret in any hospital.",
    likeCount: 136,
    commentCount: 23,
    createdAt: "2026-04-24T17:45:00Z",
  },
];
