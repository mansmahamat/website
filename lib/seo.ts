import { createOgImage } from "@/lib/createOgImage"
import type { DefaultSeoProps } from "next-seo"

const title = `Mansour`
const description = `As a frontend developer with 4 years of experience, I bring a blend of passion and expertise to every project. Living in Sweden 🇸🇪 but originating from France 🇫🇷, I'm not just a developer—I'm an indie hacker who loves building innovative products in my spare time. With a focus on React, Next.js, TypeScript, and Tailwind CSS 👨‍🎨, I craft captivating designs and seamless functionality. 

`
const domain = `mansour-mahamat.dev`
const twitter = `@mansmahamat`
const meta = `Frontend Developer at Kambi and indie hackers`

export const seo: DefaultSeoProps = {
  title: title + " | " + meta,
  description,
  openGraph: {
    title,
    type: "website",
    url: `https://${domain}`,
    site_name: title,
    images: [
      {
        url: createOgImage({ title, meta }),
        width: 1600,
        height: 836,
        alt: title,
      },
    ],
  },
  twitter: {
    handle: twitter,
    cardType: "summary_large_image",
  },
}
