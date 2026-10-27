import { notFound } from "next/navigation";
import { forumService } from "@/features/community";
import { ForumPostDetailClient } from "./ForumPostDetailClient";

export default async function ForumPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = forumService.getPostById(id);

  if (!post) {
    notFound();
  }

  return <ForumPostDetailClient post={post} />;
}
