import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  const pathname = usePathname()

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <aside className="w-full md:w-64 bg-orange-100 p-4">
        <h1 className="text-xl font-bold mb-4 text-orange-800">OB Technical Test</h1>
        <nav className="space-y-2">
          <Link
            href="/"
            className={cn(
              "block p-2 rounded-lg",
              pathname === "/" ? "bg-orange-500 text-white" : "text-orange-800 hover:bg-orange-200"
            )}
          >
            Create Interests
          </Link>
          <Link
            href="/get-interests"
            className={cn(
              "block p-2 rounded-lg",
              pathname === "/get-interests" ? "bg-orange-500 text-white" : "text-orange-800 hover:bg-orange-200"
            )}
          >
            Get Interests
          </Link>
        </nav>
      </aside>
      
      <main className="flex-1 p-4 bg-white">{children}</main>
    </div>
  )
}

