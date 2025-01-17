import { FOCUS_VISIBLE_OUTLINE } from "@/lib/constants"
import { CurrentFilters } from "@/lib/types"
import TwitterIcon from "@/ui/TwitterIcon"
import YoutubeIcon from "@/ui/YoutubeIcon"
import AnnotationIcon from "@heroicons/react/solid/AnnotationIcon"
import VideoCameraIcon from "@heroicons/react/solid/VideoCameraIcon"
import cx from "clsx"
import Link from "next/link"
import React from "react"

export const Navigation = ({
  currentFilters,
}: {
  currentFilters?: CurrentFilters
}) => {
  return (
    <div className="flex items-center space-x-7 text-base font-semibold leading-none text-rose-100/90">
      <Link href="/blog" className={cx("group", FOCUS_VISIBLE_OUTLINE)}>
        <div className="sm:flex sm:items-center sm:space-x-2">
          <div className="mb-1.5 flex justify-center sm:mb-0 sm:block">
            <div
              className={cx(
                "rounded-lg bg-gradient-to-tl from-green-500/80 to-emerald-400/80 p-1 shadow-lg transition-all duration-300 ease-out group-hover:scale-[1.2] group-hover:rounded-[10px] group-hover:shadow-purple-500/40 group-active:translate-y-1",
                {
                  "ring-[2px] ring-purple-500/30 ring-offset-1 ring-offset-black/5":
                    currentFilters?.type === "blog",
                },
              )}
            >
              <AnnotationIcon className="w-[18px] transform text-rose-100 transition delay-100 duration-500 ease-out group-hover:scale-110" />
            </div>
          </div>
          <div>Posts</div>
        </div>
      </Link>

      <Link href="/projects" className={cx("group", FOCUS_VISIBLE_OUTLINE)}>
        <div className="sm:flex sm:items-center sm:space-x-2">
          <div className="mb-1.5 flex justify-center sm:mb-0 sm:block">
            <div
              className={cx(
                "rounded-lg bg-gradient-to-tl from-purple-500/80 to-rose-400/80 p-1 shadow-lg transition-all duration-300 ease-out group-hover:scale-[1.2] group-hover:rounded-[10px] group-hover:shadow-purple-500/40 group-active:translate-y-1",
                {
                  "ring-[2px] ring-purple-500/30 ring-offset-1 ring-offset-black/5":
                    currentFilters?.type === "projects",
                },
              )}
            >
              <VideoCameraIcon className="w-[18px] transform text-rose-100 transition delay-100 duration-500 ease-out group-hover:scale-110" />
            </div>
          </div>
          <div>Projects</div>
        </div>
      </Link>

      <a
        className={cx("group", FOCUS_VISIBLE_OUTLINE)}
        href="https://twitter.com/mansmahamat"
      >
        <div className="sm:flex sm:items-center sm:space-x-2">
          <div className="mb-1.5 flex justify-center sm:mb-0 sm:block">
            <div className="rounded-lg bg-gradient-to-tl from-green-500/80 to-emerald-400/80 p-1 shadow-lg transition-all duration-300 ease-out group-hover:scale-[1.2] group-hover:rounded-[10px] group-hover:shadow-purple-500/40 group-active:translate-y-1">
              <TwitterIcon className="w-[18px] transform text-rose-100 transition delay-100 duration-500 ease-out group-hover:scale-110" />
            </div>
          </div>
          <div>Twitter</div>
        </div>
      </a>

      <a
        className={cx("group", FOCUS_VISIBLE_OUTLINE)}
        href="https://www.youtube.com/@manslifeinsweden"
      >
        <div className="sm:flex sm:items-center sm:space-x-2">
          <div className="mb-1.5 flex justify-center sm:mb-0 sm:block">
            <div className="rounded-lg bg-gradient-to-tl from-green-500/80 to-emerald-400/80 p-1 shadow-lg transition-all duration-300 ease-out group-hover:scale-[1.2] group-hover:rounded-[10px] group-hover:shadow-purple-500/40 group-active:translate-y-1">
              <YoutubeIcon className="w-[18px] transform text-rose-100 transition delay-100 duration-500 ease-out group-hover:scale-110" />
            </div>
          </div>
          <div>YouTube</div>
        </div>
      </a>
    </div>
  )
}
