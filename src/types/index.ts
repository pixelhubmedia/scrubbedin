// Core domain types — stubs to be expanded per milestone

export type UserRole = "staff" | "admin" | "moderator";

export type PrivacyLevel = "public" | "connections" | "private";

export interface User {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
  createdAt: string;
}

export interface Profile {
  id: string;
  userId: string;
  displayName: string;
  jobTitle?: string;
  specialty?: string;
  hospitalId?: string;
  departmentId?: string;
  bio?: string;
  privacy: PrivacyLevel;
  isFoundingReferrer: boolean;
  createdAt: string;
}

export interface Hospital {
  id: string;
  name: string;
  city: string;
  country: string;
  verified: boolean;
  createdAt: string;
}

export interface Department {
  id: string;
  hospitalId: string;
  name: string;
  specialty?: string;
}

export interface Post {
  id: string;
  authorId: string;
  content: string;
  imageUrls?: string[];
  hospitalId?: string;
  departmentId?: string;
  containsPatientWarning: boolean;
  createdAt: string;
}

export interface Connection {
  id: string;
  requesterId: string;
  receiverId: string;
  status: "pending" | "accepted" | "blocked";
  createdAt: string;
}

export interface Endorsement {
  id: string;
  endorserId: string;
  recipientId: string;
  category: string;
  note?: string;
  approved: boolean;
  createdAt: string;
}
