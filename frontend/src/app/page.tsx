import { AppShell } from "@/components/layout/AppShell";
import { Hero } from "@/components/discover/Hero";
import { AINutritionRecommendations } from "@/components/discover/AINutritionRecommendations";
import { TrendingVideos } from "@/components/discover/TrendingVideos";

export default function DiscoverPage() {
  return (
    <AppShell>
      <div className="flex flex-col pb-12">
        <Hero />
        <AINutritionRecommendations />
        <TrendingVideos />
      </div>
    </AppShell>
  );
}
