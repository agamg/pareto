import Link from "next/link"
import { Button } from "./ui/button"
import { Input } from "./ui/input"

export default function Header() {
  return (
    <div className="flex justify-between items-center mb-8">
    <h1 className="text-2xl font-bold">AIPath</h1>
    <div className="flex space-x-6 items-center">
      <Link href="/discover">
        <Button variant="ghost" className="text-md font-medium">Dashboard</Button>
      </Link>
      <Link href="/build">
        <Button variant="ghost" className="text-md font-medium">My Workflows</Button>
      </Link>
      <Link href="/buildworkflows">
        <Button variant="ghost" className="text-md font-medium">Build Workflow</Button>
      </Link>
      <Button variant="ghost" className="text-md font-medium">Settings</Button>
    </div>
  </div>
  )
}
