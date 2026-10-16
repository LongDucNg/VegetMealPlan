import { Metadata } from "next";
import { CreateRecipeClient } from "./CreateRecipeClient";

export const metadata: Metadata = {
  title: "Đăng công thức món chay mới — VeggieHub",
  description: "Chia sẻ công thức món chay thanh đạm, dinh dưỡng của bạn với cộng đồng VeggieHub.",
};

export default function CreateRecipePage() {
  return <CreateRecipeClient />;
}
