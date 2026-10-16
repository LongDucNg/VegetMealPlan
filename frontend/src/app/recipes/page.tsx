import { Metadata } from "next";
import { RecipesClient } from "./RecipesClient";

export const metadata: Metadata = {
  title: "Thư viện món chay — VeggieHub",
  description: "Khám phá hàng trăm công thức món chay thanh đạm, dinh dưỡng với giá thành minh bạch.",
};

export default function RecipesPage() {
  return <RecipesClient />;
}
