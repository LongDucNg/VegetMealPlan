import { forumService } from "@/features/community";
import { ForumPostDetailClient } from "./ForumPostDetailClient";

export const dynamic = "force-dynamic";

export default async function ForumPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  let initialPost = null;

  try {
    initialPost = await forumService.getPostDetail(id);
  } catch {
    initialPost = null;
  }

  return <ForumPostDetailClient postId={id} initialPost={initialPost} />;
}
