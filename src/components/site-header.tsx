import { Book, BookOpen, Coins, Star, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useSidebar } from "@/components/ui/sidebar"
import { ModeToggle } from "./mode-toggle"

export function SiteHeader() {
  const { toggleSidebar, open, } = useSidebar()

  return (
    <header className="bg-background top-0 z-50 flex w-full items-center border-b">
      <div className="flex h-(--header-height) w-full items-center gap-2 pr-4 pl-1 justify-between">
        <Button
          variant="ghost"
          onClick={toggleSidebar}
          className="cursor-pointer"
        >
          <h2 className="font-bold text-lg">LEARNER</h2>
          {open ? <BookOpen/> : <Book/>}
        </Button>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1"><Star className="text-yellow-500" /> 2000</span>
          <span className="flex items-center gap-1"><Coins className="text-yellow-500" /> 500</span>
          <User className="text-gray-700" />
          <ModeToggle/>
        </div>
      </div>
    </header>
  )
}
