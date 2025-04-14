import { getCollection } from "astro:content";
import categories from "./categories";

const filteredArchive = await getCollection("archive", ({ data }) => data.subcategory);

export const subcategories = categories.map(category => ({
  [category]: [...new Set(filteredArchive
    .filter(({ data }) => data.category == category)
    .map(({ data }) => data.subcategory))]
}));

export function getSubcategories(category: string): string[] {
  return Object.values(subcategories.find(item => item[category]) as {})
    .flatMap(value => value as string);
}