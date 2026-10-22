import { DietOption } from "../types";

export const DIET_OPTIONS: DietOption[] = [
  { id: "vegan", label: "Thuần chay (Vegan)", description: "Không dùng sản phẩm từ động vật, kể cả trứng và sữa" },
  { id: "lacto", label: "Chay có sữa (Lacto)", description: "Dùng sữa, không dùng trứng" },
  { id: "ovo", label: "Chay có trứng (Ovo)", description: "Dùng trứng, không dùng sữa" },
  { id: "ovo_lacto", label: "Chay có trứng và sữa (Ovo-lacto)", description: "Dùng cả trứng và sữa" },
];
