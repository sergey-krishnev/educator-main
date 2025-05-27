import { Book, BookOpen, Coins, Star, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useSidebar } from "@/components/ui/sidebar"
import { ModeToggle } from "../ui/mode-toggle"
import { useGetUserProgressQuery } from "@/api/userProgressApi"

export function SiteHeader() {
  const { toggleSidebar, open, } = useSidebar()
  const { data: userProgress } = useGetUserProgressQuery({})

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
          <span className="flex items-center gap-1"><Star className="text-yellow-500" /> {userProgress?.totalExperiencePoints || 0}</span>
          <span className="flex items-center gap-1"><Coins className="text-yellow-500" /> {userProgress?.totalGoldPoints || 0}</span>
          <User className="text-gray-700"/>
          <span className="text-gray-700">{userProgress?.userName || "Guest"}</span>
          <ModeToggle/>
        </div>
      </div>
    </header>
  )
}
