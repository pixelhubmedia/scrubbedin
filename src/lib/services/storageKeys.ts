// Central registry of all localStorage keys used by the mock layer.
// TODO (Supabase): delete this file entirely — all data moves to Supabase tables.

export const STORAGE_KEYS = {
  /** Current session — { userId, email, createdAt } */
  SESSION: "scrubbedin_session",
  /** Array of User objects */
  USERS: "scrubbedin_users",
  /** Array of Profile objects */
  PROFILES: "scrubbedin_profiles",
  /** Seeded flag — prevents re-seeding mock data on every reload */
  SEEDED: "scrubbedin_seeded",
} as const;
