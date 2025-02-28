import { defineCollection, z } from "astro:content";
import { file, glob } from "astro/loaders";
import categories from "./metadata/categories";
import expacs from "./metadata/expacs";
import formats from "./metadata/formats";
import skillLevels from "./metadata/skill-levels";
import tools from "./metadata/tools";

const archive = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: "./data/archive" }),
  schema: z.object({
    title: z.string(),
    url: z.string().url(),
    author: z.string().default("???"),
    category: z.enum(categories),
    subcategory: z.string(),
    stats: z.object({
      tool: z.array(z.enum(tools)).default(["N/A"]),
      format: z.array(z.enum(formats)).default(["N/A"]),
      link: z.string().url().optional(),
    }),
    level: z.array(z.enum(skillLevels)).default(["N/A"]),
    compat: z.enum(expacs).optional(),
  }),
});

export const collections = { archive };