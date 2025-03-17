import type categories from "@/metadata/categories";
import type expacs from "@/metadata/expacs";
import type formats from "@/metadata/formats";
import skillLevels from "@/metadata/skill-levels";
import type tools from "@/metadata/tools";

export const keys = [
  "id",
  "title",
  "url",
  "author",
  "category",
  "subcategory",
  "format",
  "tool",
  "archived",
  "level",
  "compat",
];

export type Archive = {
  id: number,
  title: string;
  url: string;
  author: string;
  category: typeof categories[number];
  subcategory: string;
  format: typeof formats[number][];
  tool: typeof tools[number][];
  archived: boolean;
  level: typeof skillLevels[number][];
  compat?: typeof expacs[number];
};