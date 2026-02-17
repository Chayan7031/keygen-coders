import { IconCloud } from "@/components/ui/icon-cloud"

const slugs = [
  "typescript",
  "javascript",
  "html5",
  "css3",
  "nodedotjs",
  "express",
  "nextdotjs",
  "github",
  "visualstudiocode",
  "figma",
  "c",
  "c++",
  "python",
  "java"
]

export function IconCloudDemo() {
  const images = slugs.map(
    (slug) => `https://cdn.simpleicons.org/${slug}/22c55e`
  )

  return (
    <div className="relative flex h-full w-full max-w-[500px] items-center justify-center overflow-hidden bg-transparent pt-8">
      <IconCloud images={images} />
    </div>
  )
}
