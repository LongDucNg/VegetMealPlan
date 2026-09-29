import { UserRole } from "@/features/auth/types";

export interface AdminStat {
  label: string;
  value: string;
  change: string;
  positive: boolean;
}

export interface AdminMember {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  initials: string;
  videoCount: number;
  postCount: number;
  joinedDate: string;
  status: "Active" | "Suspended" | "Pending";
}

export interface AdminContentItem {
  id: string;
  title: string;
  type: "Blog" | "Video" | "Comment";
  author: string;
  date: string;
  reports: number;
  status: "Published" | "Under Review" | "Removed";
}

export interface ModerationItem {
  id: string;
  contentId: string;
  contentType: "Post" | "Video" | "Comment";
  author: string;
  snippet: string;
  flagReasons: ("Misinformation" | "Spam" | "Dangerous claim" | "Offensive" | "Inappropriate")[];
  aiConfidence: number;
  reportedAt: string;
  status: "Pending" | "Approved" | "Removed" | "Escalated";
}

export interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  type: "Food Type" | "Recipe Category";
  recipeCount: number;
  status: "Active" | "Archived";
}

export interface AIModelMetric {
  id: string;
  name: string;
  version: string;
  accuracy: number;
  latencyMs: number;
  dailyQueries: number;
  status: "Optimal" | "Degraded" | "Maintenance";
  overrideMode: boolean;
}

export interface AILog {
  id: string;
  model: string;
  event: string;
  level: "info" | "warn" | "error" | string;
  time: string;
}

