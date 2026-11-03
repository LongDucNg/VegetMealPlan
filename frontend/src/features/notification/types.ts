export type NotificationType =
  | "SUBSCRIPTION_SUCCESS"
  | "SUBSCRIPTION_EXPIRING"
  | "SUBSCRIPTION_EXPIRED"
  | "SUBSCRIPTION_CANCELLED"
  | "CONTENT_COMMENT"
  | "CONTENT_VOTE"
  | "RECIPE_SUBMITTED"
  | "RECIPE_APPROVED"
  | "RECIPE_REJECTED"
  | "FORUM_POST_SUBMITTED"
  | "FORUM_POST_APPROVED"
  | "FORUM_POST_REJECTED"
  | "SYSTEM_WELCOME"
  | "SYSTEM_ANNOUNCEMENT"
  | string;

export interface AppNotification {
  notification_id: number;
  user_id: number;
  type: NotificationType;
  title: string;
  message: string;
  ref_type?: string;
  ref_id?: number;
  is_read: boolean;
  created_at: string;
}
