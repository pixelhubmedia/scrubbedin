export const APP_CONFIG = {
  name: "Scrubbed In",
  tagline: "The Professional Network for Healthcare",
  description:
    "Scrubbed In is the UK professional networking platform built for healthcare staff. Connect with colleagues, track rotations, and grow your career.",
  url: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
  supportEmail: "hello@scrubbedin.co.uk",
  country: "UK",
} as const;

export const ROUTES = {
  home: "/",
  waitlist: "/waitlist",
  login: "/login",
  signup: "/signup",
  feed: "/feed",
  profile: "/profile",
  hospitals: "/hospitals",
  messages: "/messages",
  admin: "/admin",
} as const;
