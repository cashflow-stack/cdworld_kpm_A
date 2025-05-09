/**
 * v0 by Vercel.
 * @see https://v0.dev/t/Efn2X3mIZKT
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-app
 */

import { SVGProps } from "react"
import { Link } from "react-router"
import { JSX } from "react/jsx-runtime"

export default function ErrorPage() {
    return (
        <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-md text-center">
                <TriangleAlertIcon className="mx-auto h-12 w-12 text-primary" />
                <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Oops, page not found!</h1>
                <p className="mt-4 text-muted-foreground">The page you're looking for doesn't exist or has been moved.</p>
                <div className="mt-6">
                    <Link
                        to={"/"}
                        className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    >
                        Go to Homepage
                    </Link>
                </div>
            </div>
        </div>
    )
}

function TriangleAlertIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" />
            <path d="M12 9v4" />
            <path d="M12 17h.01" />
        </svg>
    )
}
