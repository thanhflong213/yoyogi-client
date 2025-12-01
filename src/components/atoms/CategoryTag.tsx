import { Badge } from "@/components/ui/badge";

interface CategoryTagProps {
  category: string;
}

const categoryColors: Record<string, string> = {
  mathematics: "bg-blue-100 text-blue-700 hover:bg-blue-200",
  english: "bg-purple-100 text-purple-700 hover:bg-purple-200",
  science: "bg-green-100 text-green-700 hover:bg-green-200",
  history: "bg-orange-100 text-orange-700 hover:bg-orange-200",
  geography: "bg-teal-100 text-teal-700 hover:bg-teal-200",
  language: "bg-pink-100 text-pink-700 hover:bg-pink-200",
  general: "bg-gray-100 text-gray-700 hover:bg-gray-200",
};

export const CategoryTag = ({ category }: CategoryTagProps) => {
  const colorClass = categoryColors[category] || categoryColors.general;

  return <Badge className={colorClass}>{category}</Badge>;
};
