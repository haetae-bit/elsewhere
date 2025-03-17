import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import Fuse from "fuse.js";
import { keys } from "@/utils/types";

export const GET: APIRoute = async () => {
  const archives = await getCollection("archive");
  const data = archives.map(({ data }, id) => ({
    id: id,
    title: data.title,
    url: data.url,
    author: data.author,
    category: data.category,
    subcategory: data.subcategory,
    tool: data.stats.tool,
    format: data.stats.format,
    archived: data.stats.link ?? false,
    level: data.level,
    compat: data.compat ?? "N/A",
  }));

  const index = Fuse.createIndex(keys, data);

  return new Response(
    JSON.stringify({ index: index.toJSON(), data }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
};