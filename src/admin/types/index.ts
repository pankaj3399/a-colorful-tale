/* ──────────────────────────────────────────────────────────────────────────
 * Admin app shared types & constants
 * ────────────────────────────────────────────────────────────────────────── */

const API_ROOT = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:4000';

/** Base URL for all admin requests, e.g. http://localhost:4000/api */
export const ADMIN_API_BASE_URL = `${API_ROOT}/api`;

/** localStorage key holding the admin JWT. */
export const ADMIN_TOKEN_STORAGE_KEY = 'admin_jwt_token';

/* ── Auth ── */

export interface AdminUser {
  id: string;
  username: string;
  email?: string;
  role?: string;
  createdAt?: string;
}

export interface AdminLoginResponse {
  token: string;
  admin: AdminUser;
}

export interface AdminMeResponse {
  admin: AdminUser;
}

/* ── Analytics: overview ── */

export interface OverviewMetrics {
  totalUsers: number;
  totalProfessionals: number;
  totalFans: number;
  emailsCollected: number;
  phonesCollected: number;
}

export interface OverviewResponse {
  overview: OverviewMetrics;
}

/* ── Analytics: list ── */

export type ProfileType = 'professional' | 'fan' | '';
export type ConversationStatus = 'ACTIVE' | 'WAITING' | 'COMPLETED' | '';

/** Normalized row shape the table consumes. */
export interface AnalyticsRow {
  id: string;
  userId: string | null;
  name: string | null;
  email: string | null;
  phone: string | null;
  profileType: string | null;
  classificationSource: string | null;
  status: string | null;
  tags: string[];
  createdAt: string;
  updatedAt?: string;
}

/** Raw row as returned by the API (Mongo `_id`, nested `capturedData`). */
export interface RawAnalyticsRow {
  _id?: string;
  id?: string;
  userId?: string | null;
  name?: string | null;
  capturedData?: {
    email?: string | null;
    phone?: string | null;
  } | null;
  email?: string | null;
  phone?: string | null;
  profileType?: string | null;
  classificationSource?: string | null;
  status?: string | null;
  tags?: string[] | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface RawAnalyticsListResponse {
  rows: RawAnalyticsRow[];
  pagination: Pagination;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface AnalyticsListResponse {
  rows: AnalyticsRow[];
  pagination: Pagination;
}

export interface AnalyticsFilters {
  page: number;
  limit: number;
  search: string;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  profileType: string;
  classificationSource: string;
  status: string;
  startDate: string;
  endDate: string;
}

/* ── Analytics: tags & funnel ── */

export interface TagCount {
  tag: string;
  count: number;
}

export interface TagsResponse {
  tags: TagCount[];
}

export interface FunnelStage {
  stage: string;
  count: number;
}

export interface FunnelResponse {
  funnel: FunnelStage[];
}

/* ── Dashboard aggregate ── */

export interface AdminDashboardData {
  overview: OverviewMetrics;
  analytics: AnalyticsListResponse;
  tags: TagCount[];
  funnel: FunnelStage[];
}

/* ── Instagram DM automation ── */

export interface InstagramOverviewMetrics {
  totalConversations: number;
  activeConversations: number;
  completedConversations: number;
  emailsCaptured: number;
  phonesCaptured: number;
}

export interface InstagramMessage {
  id: string;
  direction: 'inbound' | 'outbound';
  text: string;
  createdAt: string;
}

export interface InstagramConversation {
  id: string;
  igUsername: string | null;
  igUserId: string | null;
  status: string | null;
  email: string | null;
  phone: string | null;
  messages?: InstagramMessage[];
  messageCount?: number;
  lastMessageAt?: string | null;
  createdAt: string;
  updatedAt?: string;
}

export interface InstagramConversationListResponse {
  rows: InstagramConversation[];
  pagination: Pagination;
}

export interface InstagramFilters {
  page: number;
  limit: number;
  search: string;
  status: string;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  startDate: string;
  endDate: string;
}

/* ── Meta (Facebook/Instagram) settings ── */

export interface MetaSettings {
  connected: boolean;
  pageId: string | null;
  verifyToken: string | null;
  /** Access token is never returned in full; backend masks it. */
  accessTokenPreview?: string | null;
  updatedAt?: string | null;
}
