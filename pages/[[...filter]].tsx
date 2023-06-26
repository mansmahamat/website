import {
  allTagSlugs,
  formatPostPreview,
  formatVideoPreview,
} from "@/lib/contentlayer"
import { seo } from "@/lib/seo"
import { CurrentFilters } from "@/lib/types"
import { BlogPostPreview } from "@/ui/BlogPostPreview"
import { ContentLink } from "@/ui/ContentLink"
import { Layout } from "@/ui/Layout"
import { Navigation } from "@/ui/Navigation"
import { ProfileImage } from "@/ui/ProfileImage"
import { VideoPostPreview } from "@/ui/VideoPostPreview"
import YoutubeIcon from "@/ui/YoutubeIcon"
import cx from "clsx"
import { allPosts, allProjects, allVideos, Tag } from "contentlayer/generated"
import type { GetStaticProps, InferGetStaticPropsType } from "next"
import { NextSeo } from "next-seo"
import { useRouter } from "next/router"
import React from "react"
import { useIntersection } from "react-use"

export const getStaticPaths = () => {
  const paths = [
    // /
    { params: { filter: [] } },
    // /videos
    { params: { filter: ["videos"] } },
    { params: { filter: ["projects"] } },
    // /blog
    { params: { filter: ["blog"] } },
    // /tag/:tag
    ...allTagSlugs.map((tag) => ({ params: { filter: ["tag", tag] } })),
    // /videos/tag/:tag
    ...allTagSlugs.map((tag) => ({
      params: { filter: ["videos", "tag", tag] },
    })),

    // /blog/tag/:tag
    ...allTagSlugs.map((tag) => ({ params: { filter: ["blog", "tag", tag] } })),
    ...allTagSlugs.map((tag) => ({
      params: { filter: ["projects", "tag", tag] },
    })),
  ]

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<{
  currentFilters: CurrentFilters
  posts: (
    | ReturnType<typeof formatVideoPreview>
    | ReturnType<typeof formatPostPreview>
  )[]
}> = async ({ params }) => {
  let posts = [
    ...allVideos.map(formatVideoPreview),
    ...allPosts.filter((p) => p.status === "published").map(formatPostPreview),
    ...allProjects
      .filter((p) => p.status === "published")
      //@ts-ignore
      .map(formatPostPreview),
  ].sort(
    //@ts-ignore
    (a, b) => Number(new Date(b.publishedAt)) - Number(new Date(a.publishedAt)),
  )

  let currentFilters: CurrentFilters = null

  if (params?.filter && Array.isArray(params.filter)) {
    currentFilters = {}

    let tag: Tag["slug"] | undefined

    if (params.filter[0] === "projects") {
      currentFilters.type = "projects"

      if (params.filter[1] === "tag" && params.filter[2]) {
        tag = params.filter[2] as Tag["slug"]
      }
    } else if (params.filter[0] === "blog") {
      posts = posts.filter((p) => p.type === "Post")

      currentFilters.type = "blog"
      if (params.filter[1] === "tag" && params.filter[2]) {
        tag = params.filter[2] as Tag["slug"]
      }
    } else if (params.filter[0] === "tag" && params.filter[1]) {
      tag = params.filter[1] as Tag["slug"]
    }

    if (tag) {
      currentFilters.tag = tag
      posts = posts.filter((p) => p.tags.find((x) => x.slug === tag))
    }
  }

  return { props: { posts, currentFilters } }
}

export default function Home({
  posts,
  currentFilters,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const intersectionRef = React.useRef(null)
  const intersection = useIntersection(intersectionRef, {
    root: null,
    rootMargin: "-100px",
  })

  let showNav = false
  if (currentFilters || (intersection && !intersection.isIntersecting)) {
    showNav = true
  }

  const router = useRouter()

  return (
    <>
      {currentFilters ? <NextSeo noindex={true} /> : null}
      <Layout showNav={showNav} currentFilters={currentFilters}>
        <div className="-mt-12 sm:mt-0">
          <div ref={intersectionRef}>
            {!currentFilters ? (
              <div
                className={cx("transition duration-300", {
                  "opacity-0": showNav,
                  "opacity-100": !showNav,
                })}
              >
                <div className="flex items-center space-x-6">
                  <ProfileImage size="large" />

                  <div>
                    <h1 className="text-3xl font-medium text-rose-100/80 sm:text-4xl">
                      Mansour
                    </h1>
                    <h2 className="align-middle text-lg leading-6 text-rose-100/50">
                      <span className="hidden sm:inline">
                        Frontend Developer
                      </span>
                      <span
                        className="inline sm:hidden"
                        title="Developer Experience"
                      >
                        DX
                      </span>{" "}
                      at{" "}
                      <span className="font-medium text-rose-100/70">
                        <span className="mr-px align-middle"></span>
                        Kambi Sweden
                      </span>
                    </h2>
                  </div>
                </div>

                <p className="mt-7 text-xl text-rose-100/90 sm:mt-9">
                  {seo.description}
                </p>

                <div className="mt-8 sm:mt-12">
                  <Navigation />
                </div>
              </div>
            ) : null}
          </div>

          <div
            className={cx(
              "space-y-10",
              currentFilters ? "mt-8" : "mt-20 sm:mt-32",
            )}
          >
            {currentFilters ? (
              <>
                <div className="flex space-x-2">
                  {currentFilters.tag ? (
                    <div className="rounded-full border border-rose-100/5 py-0.5 px-2 text-rose-100/90">
                      {currentFilters.tag}
                    </div>
                  ) : null}
                </div>

                {currentFilters.type === "projects" ? (
                  <div className="flex flex-col">
                    <div ref={intersectionRef}>
                      {posts.map((post) => {
                        //@ts-ignore
                        if (post.type === "Projects") {
                          //@ts-ignore
                          return <BlogPostPreview key={post.slug} {...post} />
                        }
                      })}
                    </div>
                  </div>
                ) : null}
              </>
            ) : null}
            {currentFilters?.type === "blog" && (
              <>
                {posts.map((post) => {
                  // if (post.type === "Video") {
                  //   return <VideoPostPreview key={post.slug} {...post} />
                  // }

                  if (post.type === "Post") {
                    return <BlogPostPreview key={post.slug} {...post} />
                  }
                })}
              </>
            )}
            {router.asPath === "/" && (
              <>
                {posts.map((post) => {
                  // if (post.type === "Video") {
                  //   return <VideoPostPreview key={post.slug} {...post} />
                  // }

                  if (post.type === "Post") {
                    return <BlogPostPreview key={post.slug} {...post} />
                  }
                })}
              </>
            )}
          </div>
        </div>
      </Layout>
    </>
  )
}
