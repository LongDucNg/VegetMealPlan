import { Metadata } from "next";
import { RecipeDetailClient } from "./RecipeDetailClient";
import { mapBackendToFrontendRecipe } from "@/features/recipes/utils/recipeMapper";

interface RecipeDetailPageProps {
  params: Promise<{ id: string }>;
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api/v1";

export async function generateMetadata({
  params,
}: RecipeDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const numId = parseInt(id.replace(/\D/g, ""), 10);
  let title = `Chi tiết công thức #${id} — VeggieHub`;

  if (!isNaN(numId)) {
    try {
      const res = await fetch(`${API_BASE}/recipes/${numId}`, { cache: "no-store" });
      if (res.ok) {
        const json = await res.json();
        const item = json.data || json;
        if (item?.title) title = `${item.title} — VeggieHub`;
      }
    } catch {
      // ignore metadata fetch error
    }
  }

  return {
    title,
    description: "Xem chi tiết nguyên liệu, dinh dưỡng, chi phí và hướng dẫn nấu món chay.",
  };
}

export default async function RecipeDetailPage({ params }: RecipeDetailPageProps) {
  const { id } = await params;
  const numId = parseInt(id.replace(/\D/g, ""), 10);
  let initialRecipe = null;
  let initialCost = null;
  let initialReplacements = [];

  if (!isNaN(numId)) {
    try {
      const [recipeRes, costRes, repRes] = await Promise.allSettled([
        fetch(`${API_BASE}/recipes/${numId}`, { cache: "no-store" }),
        fetch(`${API_BASE}/recipes/${numId}/cost`, { cache: "no-store" }),
        fetch(`${API_BASE}/recipes/${numId}/replacements`, { cache: "no-store" }),
      ]);

      if (recipeRes.status === "fulfilled" && recipeRes.value.ok) {
        const json = await recipeRes.value.json();
        const raw = json.data || json;
        if (raw?.title) initialRecipe = mapBackendToFrontendRecipe(raw);
      }

      if (costRes.status === "fulfilled" && costRes.value.ok) {
        const json = await costRes.value.json();
        initialCost = json.data || json;
      }

      if (repRes.status === "fulfilled" && repRes.value.ok) {
        const json = await repRes.value.json();
        initialReplacements = json.data?.replacements || json.replacements || [];
      }
    } catch {
      // ignore server fetch errors, client will retry
    }
  }

  return (
    <RecipeDetailClient
      recipeId={id}
      initialRecipe={initialRecipe}
      initialCost={initialCost}
      initialReplacements={initialReplacements}
    />
  );
}
