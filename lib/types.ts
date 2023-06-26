import { Tag } from "contentlayer/generated"

export type CurrentFilters = {
  type?: "videos" | "blog" | "projects"
  tag?: Tag["slug"]
} | null
