// ─── Auth ────────────────────────────────────────────────────────────────────

export interface User {
  id: string;
  email: string;
  /** Mock-only: Supabase Auth handles passwords — remove this field when swapping */
  _mockPasswordHash: string;
  createdAt: string;
}

export interface Session {
  userId: string;
  email: string;
  createdAt: string;
}

// ─── Profile ─────────────────────────────────────────────────────────────────

export type ProfileVisibility = "public" | "connections_only" | "hidden";

export type HealthcareSector = "nhs" | "private" | "both";

export interface PrivacySettings {
  profileVisibility: ProfileVisibility;
  showCurrentHospital: boolean;
  showFutureRotations: boolean;
  /** Only applies when profileVisibility === "public" */
  searchEngineIndexing: boolean;
}

export interface Profile {
  id: string;
  userId: string;
  fullName: string;
  username: string;
  currentPosition: string;
  roleProfession: string;
  bio?: string;
  profilePhotoUrl?: string;
  currentHospital?: string;
  currentDepartment?: string;
  region?: string;
  sector?: HealthcareSector;
  privacy: PrivacySettings;
  createdAt: string;
  updatedAt: string;
}

// ─── Badges ──────────────────────────────────────────────────────────────────

export type BadgeType =
  | "founding_referrer"
  | "verified_staff"
  | "hospital_moderator"
  | "top_endorser";

export interface Badge {
  id: string;
  name: string;
  description: string;
  badgeType: BadgeType;
  icon: string;
}

export interface UserBadge {
  id: string;
  profileId: string;
  badge: Badge;
  awardedAt: string;
}

// ─── Rotations ───────────────────────────────────────────────────────────────

export interface Rotation {
  id: string;
  profileId: string;
  hospital: string;
  department: string;
  startDate: string;
  endDate?: string;
  isCurrent: boolean;
  notes?: string;
}

// ─── Hospital / Department ───────────────────────────────────────────────────

export interface Hospital {
  id: string;
  name: string;
  city: string;
  trustName?: string;
  region?: string;
  verified: boolean;
  createdAt: string;
}

export interface Department {
  id: string;
  hospitalId: string;
  name: string;
  specialty?: string;
}

// ─── Connections ─────────────────────────────────────────────────────────────

export type ConnectionStatus = "pending" | "accepted" | "blocked";

export interface Connection {
  id: string;
  requesterId: string;
  receiverId: string;
  status: ConnectionStatus;
  message?: string;
  createdAt: string;
}

// ─── Posts (Milestone 4) ─────────────────────────────────────────────────────

export interface Post {
  id: string;
  authorId: string;
  content: string;
  imageUrls?: string[];
  hospitalId?: string;
  departmentId?: string;
  patientDataWarningShown: boolean;
  likeCount: number;
  commentCount: number;
  createdAt: string;
}

// ─── Endorsements (Milestone 7) ──────────────────────────────────────────────

export interface Endorsement {
  id: string;
  endorserId: string;
  recipientId: string;
  category: string;
  note?: string;
  approved: boolean;
  createdAt: string;
}

// ─── Forms ───────────────────────────────────────────────────────────────────

export interface SignupFormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  currentPosition: string;
  roleProfession: string;
  phone?: string;
}

export interface ProfileEditFormData {
  fullName: string;
  username: string;
  currentPosition: string;
  roleProfession: string;
  bio: string;
  currentHospital: string;
  currentDepartment: string;
  region: string;
  sector: string;
  profileVisibility: ProfileVisibility;
  showCurrentHospital: boolean;
  showFutureRotations: boolean;
  searchEngineIndexing: boolean;
}
