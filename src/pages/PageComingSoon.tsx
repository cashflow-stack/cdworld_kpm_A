/**
 * v0 by Vercel.
 * @see https://v0.dev/t/u7Rm7N5j9OU
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Link } from "react-router";

export default function PageComingSoon() {
    return (
        <section className="w-full pt-12 md:pt-24 lg:pt-32">
            <div className="container space-y-10 xl:space-y-16">
                <div className="grid gap-4 px-10 md:grid-cols-2 md:gap-16">
                    <div>
                        <h1 className="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
                            This page will be added soon
                        </h1>
                    </div>
                    <div className="flex flex-col items-start space-y-4">
                        <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                            We're working hard to bring you the best Automated feature that will revolutionize the way you
                            manage your finances. Stay tuned for updates!
                        </p>
                        <div className="space-x-4">
                            <Link
                                to={"/"}
                                className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                            >
                                Back to Home
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}