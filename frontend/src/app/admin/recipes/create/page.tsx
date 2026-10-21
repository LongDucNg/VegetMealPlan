import { Metadata } from "next";
import { CreateRecipeClient } from "@/app/recipes/create/CreateRecipeClient";

export const metadata: Metadata = {
  title: "Đăng công thức mới — Quản trị VeggieHub",
  description: "Thêm công thức chuẩn vào hệ thống VeggieHub dành cho Quản trị viên.",
};

export default function AdminCreateRecipePage() {
  return <CreateRecipeClient isAdminMode={true} />;
}
