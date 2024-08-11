import Image, { StaticImageData } from "next/image"
import Link from "next/link"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface HeroImageProps {
  src: StaticImageData
  alt: string
  username: string
  userHref: string
  unsplashLink: string
}

export default function HeroImage({
  src,
  alt,
  username,
  userHref,
  unsplashLink,
}: HeroImageProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className="relative h-full w-full">
          <Image src={src} alt={alt} fill className="bg-cover" />
        </TooltipTrigger>
        <TooltipContent align="center" className="text-muted-foreground">
          Photo by{" "}
          <Link
            href={userHref}
            className="text-foreground hover:underline"
            target="_blank"
          >
            {username}
          </Link>{" "}
          on{" "}
          <Link
            href={unsplashLink}
            className="text-foreground hover:underline"
            target="_blank"
          >
            Unsplash
          </Link>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
