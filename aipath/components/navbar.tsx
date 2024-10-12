import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Navbar() {
  return (
    <header className="container mx-auto flex h-20 w-full items-center justify-between px-4 md:px-6 lg:px-8">
      {/* Logo Section */}
      <Link href="/" className="flex items-center space-x-2" prefetch={false}>
        <span className="text-lg font-bold">Dashboard</span>
      </Link>

      {/* Navigation Links */}
      <nav className="flex gap-4">
        <Link
          href="/discover"
          className="group inline-flex h-9 items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:outline-none dark:hover:bg-gray-800 dark:hover:text-gray-50"
          prefetch={false}
        >
          Dashboard
        </Link>
        <Link
          href="/build"
          className="group inline-flex h-9 items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:outline-none dark:hover:bg-gray-800 dark:hover:text-gray-50"
          prefetch={false}
        >
          My Workflows
        </Link>
        <Link
          href="/buildworfklow"
          className="group inline-flex h-9 items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:outline-none dark:hover:bg-gray-800 dark:hover:text-gray-50"
          prefetch={false}
        >
          FAQ
        </Link>
      </nav>

      {/* Sign In / Sign Up Buttons */}
      <div className="flex gap-2">
        <Button variant="outline" className="px-4 py-2 text-xs">
          Sign in
        </Button>
        <Button className="px-4 py-2 text-xs">Sign Up</Button>
      </div>
    </header>
  )
}
