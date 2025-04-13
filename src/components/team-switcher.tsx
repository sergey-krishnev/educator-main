import * as React from "react"
import { ChevronsUpDown, GalleryVerticalEnd, Pencil, Plus, Trash2 } from "lucide-react"

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { ResponsiveDialog } from "./responsive-dialog"
import AddProfessionForm from "./add-profession-form"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import EditProfessionForm from "./edit-profession-form"
import { DialogFooter } from "./ui/dialog"
import { Button } from "./ui/button"
import { useRemoveProfessionByIdMutation } from "@/api/professionApi"

export type Position = {
  skills: unknown
  id: number,
  name: string,
  location: string,
  icon: string
}

type TPositionSwitcherProps = {
  teams: Position[],
  activePosition: Position | null,
  setActivePosition: (position: Position) => void,
}

export function TeamSwitcher({
  teams,
  activePosition,
  setActivePosition,
}: TPositionSwitcherProps) {
  const { isMobile } = useSidebar()

  const teamsWithIcons = teams.map(team => ({ ...team, logo: GalleryVerticalEnd, }))

  const currentActivePosition = activePosition ?? teamsWithIcons?.[0]

  const [isAddOpen, setIsAddOpen] = React.useState(false);
  const [isEditOpen, setEditOpen] = React.useState(false)
  const [isRemoveOpen, setRemoveOpen] = React.useState(false)
  const [isDropdownOpen, setDropdownOpen] = React.useState(false)
  const [editedPosition, setEditedPosition] = React.useState<Position | null>(null)
  const [removedPosition, setRemovedPosition] = React.useState<Position | null>(null)

  const handleEditProfession = (team) => {
    setDropdownOpen(false)
    setEditOpen(true)
    setEditedPosition(team)
  }

  const handleRemoveProfession = (team) => {
    setDropdownOpen(false)
    setRemoveOpen(true)
    setRemovedPosition(team)
  }

  const handleConfirmRemove = (id: number) => {
    remove(id)
    setRemoveOpen(false)
  }

  const [remove] = useRemoveProfessionByIdMutation()

  return (
    <>
      <ResponsiveDialog
        isOpen={isAddOpen}
        setIsOpen={setIsAddOpen}
        title="Add profession"
        description="Any required profession from any place"
      >
        <AddProfessionForm setIsOpen={setIsAddOpen} />
      </ResponsiveDialog>
      <ResponsiveDialog
        isOpen={isEditOpen}
        setIsOpen={setEditOpen}
        title="Edit profession"
        description="Change to correct profession"
      >
        <EditProfessionForm profession={editedPosition} setIsOpen={setEditOpen} />
      </ResponsiveDialog>
      <ResponsiveDialog
        isOpen={isRemoveOpen}
        setIsOpen={setRemoveOpen}
        title={`Are you sure you want to remove profession ${removedPosition?.name}`}
        description="This action cannot be undone"
      >
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => {
              setRemoveOpen(false)
            }}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={() => {
              handleConfirmRemove(removedPosition?.id)
            }}
          >
            Remove
          </Button>
        </DialogFooter>
      </ResponsiveDialog>
      <SidebarMenu>
        <SidebarMenuItem>
          <Popover open={isDropdownOpen} onOpenChange={setDropdownOpen}>
            <PopoverTrigger asChild>
              <SidebarMenuButton
                tooltip={
                  isMobile
                    ? {}
                    : {
                      children:
                        currentActivePosition?.name ?? "Profession is not selected",
                      hidden: false,
                    }
                }
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground md:h-8 md:p-0 cursor-pointer"
              >
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  {currentActivePosition?.icon && (
                    <img src={currentActivePosition?.icon} alt="" />
                  )}
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">
                    {currentActivePosition?.name}
                  </span>
                  {/* <span className="truncate text-xs">{activePosition.location}</span> */}
                </div>
                <ChevronsUpDown className="ml-auto" />
              </SidebarMenuButton>
            </PopoverTrigger>
            <PopoverContent
              className="min-w-80 rounded-lg p-2"
              align="start"
              side={isMobile ? "bottom" : "right"}
              sideOffset={4}
            >
              <div className="text-muted-foreground text-xs px-2 py-1.5">
                {teams.length > 0 ? "Professions" : "No professions found"}
              </div>

              {teamsWithIcons.map((team, index) => (
                <div
                  key={team.name}
                  className="group flex w-full items-center justify-between rounded-md p-2 text-sm hover:bg-muted"
                >
                  <button
                    onClick={() => {
                      setActivePosition(team)
                      setDropdownOpen(false)
                    }}
                    className="flex flex-1 items-center gap-2 text-left cursor-pointer"
                  >
                    <div className="flex size-6 items-center justify-center rounded-md border">
                      <img src={team.icon} alt="" width={20} height={20} />
                    </div>
                    {team.name}
                    <span className="ml-auto text-xs text-muted-foreground">
                      ⌘{index + 1}
                    </span>
                  </button>
                  <div className="flex items-center gap-1 ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleEditProfession(team)}
                      className="text-muted-foreground hover:text-foreground cursor-pointer"
                    >
                      <Pencil className="size-4" />
                    </button>
                    <button
                      onClick={() => handleRemoveProfession(team)}
                      className="text-muted-foreground hover:text-destructive cursor-pointer"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                </div>
              ))}

              <div className="my-2 h-px bg-border" />

              <button
                onClick={() => {
                  setDropdownOpen(false)
                  setIsAddOpen(true)
                }}
                className="flex w-full items-center gap-2 rounded-md p-2 text-sm hover:bg-muted"
              >
                <div className="flex size-6 items-center justify-center rounded-md border bg-transparent">
                  <Plus className="size-4" />
                </div>
                <div className="text-muted-foreground font-medium">
                  Add new profession
                </div>
              </button>
            </PopoverContent>
          </Popover>
        </SidebarMenuItem>
      </SidebarMenu>
    </>
  )
}
