import {
  ADMIN_STATS,
  ADMIN_MEMBERS,
  ADMIN_CONTENT_ITEMS,
  MODERATION_QUEUE,
  ADMIN_CATEGORIES,
  AI_MODELS,
} from "../data/mockAdmin";
import {
  AdminStat,
  AdminMember,
  AdminContentItem,
  ModerationItem,
  CategoryItem,
  AIModelMetric,
} from "../types";

export const adminService = {
  getStats(): AdminStat[] {
    return ADMIN_STATS;
  },

  getMembers(): AdminMember[] {
    return ADMIN_MEMBERS;
  },

  getContentItems(): AdminContentItem[] {
    return ADMIN_CONTENT_ITEMS;
  },

  getModerationQueue(): ModerationItem[] {
    return MODERATION_QUEUE;
  },

  getCategories(): CategoryItem[] {
    return ADMIN_CATEGORIES;
  },

  getAiModels(): AIModelMetric[] {
    return AI_MODELS;
  },
};
