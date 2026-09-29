import { notFound } from "next/navigation";
import { videoService, VideoRecipe } from "@/features/videos";
import { recipeService } from "@/features/recipes/services/recipeService";
import { VideoDetailClient } from "./VideoDetailClient";

export default async function VideoDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // Search in recipeService (which includes any admin-added recipes) or fallback to videoService
  const adminRecipe = recipeService.getRecipeById(id);
  const videoRecipe = videoService.getVideoById(id);


  const matched = adminRecipe
    ? {
        id: adminRecipe.id,
        title: adminRecipe.title,
        duration: adminRecipe.duration || `${adminRecipe.prepTime + adminRecipe.cookTime} min`,
        author: adminRecipe.author || "VeggieHub Chef",
        authorHandle: adminRecipe.authorHandle || "@veggiehub",
        authorInitials: adminRecipe.authorInitials || "VH",
        verified: adminRecipe.verified ?? true,
        views: adminRecipe.views || "1.2k",
        rating: adminRecipe.rating || 4.9,
        reviewsCount: adminRecipe.reviewsCount || "48",
        kcal: adminRecipe.calories,
        time: `${adminRecipe.prepTime + adminRecipe.cookTime} min`,
        difficulty: adminRecipe.difficulty || "Easy",
        cuisine: adminRecipe.cuisine || "Vietnamese",
        category: adminRecipe.category,
        image: adminRecipe.image,
        description: adminRecipe.description,
        ingredients: adminRecipe.ingredients.map((ing) => ({
          name: ing.name,
          amount: `${ing.quantity} ${ing.unit}`,
        })),
        steps: adminRecipe.instructions,
        aiSummary: {
          durationNote: "Step-by-step verified preparation",
          keyIngredients: adminRecipe.ingredients.slice(0, 4).map((i) => i.name),
          speechTranscript: adminRecipe.description,
        },
        comments: [],
      }
    : videoRecipe;

  if (!matched) {
    notFound();
  }

  return <VideoDetailClient video={matched as unknown as VideoRecipe} />;
}
