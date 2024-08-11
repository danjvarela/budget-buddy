import Link from "next/link"
import { SiNextdotjs, SiRubyonrails } from "@icons-pack/react-simple-icons"
import { KeyRound } from "lucide-react"
import { API_DOCS_URL } from "@/lib/constants"
import { getCurrentSessionServerSide } from "@/lib/session"
import { Button } from "@/components/ui/button"
import Header from "@/components/header"
import { NavLinkProps } from "@/components/header/nav-link"
import graphOnLaptop from "./assets/graph-on-laptop.jpg"
import laptopComputer from "./assets/laptop-computer.jpg"
import FeatureCard from "./feature-card"
import HeroImage from "./hero-image"

const navLinks: NavLinkProps[] = [
  { children: "Features", href: "#features", id: "features" },
  {
    children: "API Documentation",
    href: API_DOCS_URL,
    id: "api-documentation",
  },
  {
    children: "Dashboard",
    href: "/dashboard",
    requireAuth: true,
    id: "dashboard",
  },
]

export default async function Home() {
  const session = await getCurrentSessionServerSide()

  return (
    <>
      <Header navLinks={navLinks} />
      <main className="bg-secondary py-20">
        <div className="container flex max-w-screen-xl flex-row items-center justify-center gap-8 md:gap-4">
          <div className="w-full  md:basis-1/2">
            <h2 className="text-3xl font-black leading-none tracking-tight md:text-4xl lg:text-5xl">
              Track your day-to-day financial transactions
            </h2>
            <p className="mt-4 text-base leading-tight tracking-tight sm:max-w-full md:text-lg">
              Budget Buddy is a demo app built using Next.js, Typescript, and a
              Ruby on Rails backend.
            </p>

            <div className="mt-4 hidden gap-4 md:flex">
              {!!session ? (
                <Link href="/dashboard">
                  <Button size="lg">Get started</Button>
                </Link>
              ) : (
                <Link href="/login">
                  <Button size="lg">Get started</Button>
                </Link>
              )}
              <Link href="https://github.com/danjvarela/budget-buddy">
                <Button size="lg" variant="outline">
                  View source code
                </Button>
              </Link>
            </div>

            <div className="mt-4 flex gap-4 md:hidden">
              <Link href="/login">
                <Button size="sm">Get started</Button>
              </Link>
              <Link href="https://github.com/danjvarela/budget-buddy">
                <Button size="sm" variant="outline">
                  View source code
                </Button>
              </Link>
            </div>
          </div>

          <div className="relative hidden flex-1 md:block lg:hidden">
            <div className="relative aspect-[1.618] w-full overflow-hidden rounded-lg shadow-lg">
              <HeroImage
                src={graphOnLaptop}
                alt="black and silver laptop computer"
                username="Markus Winkler"
                userHref="https://unsplash.com/@markuswinkler"
                unsplashLink="https://unsplash.com/photos/black-and-silver-laptop-computer-IrRbSND5EUc"
              />
            </div>
          </div>

          <div className="relative hidden h-[350px] basis-1/2 lg:block">
            <div className="absolute left-1/2 top-1/2 aspect-[1.618] w-[75%] -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white/75 shadow-xl backdrop-blur" />

            <div className="absolute left-0 top-0 aspect-[1.618] w-[60%] overflow-hidden rounded-lg bg-background shadow-xl">
              <HeroImage
                src={graphOnLaptop}
                alt="black and silver laptop computer"
                username="Markus Winkler"
                userHref="https://unsplash.com/@markuswinkler"
                unsplashLink="https://unsplash.com/photos/black-and-silver-laptop-computer-IrRbSND5EUc"
              />
            </div>

            <div className="absolute bottom-0 right-0 aspect-[1.618] w-[60%] overflow-hidden rounded-lg bg-background shadow-xl">
              <HeroImage
                src={laptopComputer}
                alt="black and silver laptop computer"
                username="Carlos Muza"
                userHref="https://unsplash.com/@kmuza"
                unsplashLink="https://unsplash.com/photos/laptop-computer-on-glass-top-table-hpjSkU2UYSU"
              />
            </div>
          </div>
        </div>
      </main>
      <section className="py-20" id="features">
        <div className="container max-w-screen-lg">
          <h2 className="text-center text-3xl font-black leading-none tracking-tight md:text-4xl lg:text-5xl">
            Features
          </h2>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <FeatureCard
              title="Ruby on Rails"
              icon={<SiRubyonrails color="default" size={56} />}
              description="The backend is an API made using Ruby on Rails."
            />
            <FeatureCard
              title="Next.js 14"
              icon={<SiNextdotjs color="default" size={40} />}
              description="Server actions, App directory, Caching and Revalidation."
            />
            <FeatureCard
              title="Authentication"
              icon={<KeyRound className="h-12 w-12" />}
              description="JWT-based authentication implemented in the backend."
            />
          </div>

          <p className="prose mt-8 text-center tracking-tight">
            The backend API documentation can be viewed{" "}
            <Link href={API_DOCS_URL}>here</Link> and is generated using{" "}
            <Link href="https://github.com/rswag/rswag">Rswag</Link>.
          </p>
        </div>
      </section>
      <footer className="bg-muted py-20">
        <div className="prose container max-w-screen-lg text-center leading-tight tracking-tight">
          Made by <Link href="https://github.com/danjvarela">danvarela</Link>.
          Backend API is hosted on <Link href="https://fly.io/">fly.io</Link>.
          This site is hosted on <Link href="https://vercel.com">Vercel</Link>.{" "}
          <Link href="https://github.com/danjvarela/budget-buddy">
            Frontend
          </Link>{" "}
          and{" "}
          <Link href="https://github.com/danjvarela/budget-buddy-backend">
            Backend
          </Link>{" "}
          source codes are both available on Github.
        </div>
      </footer>
    </>
  )
}
