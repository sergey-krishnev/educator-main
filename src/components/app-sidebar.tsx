import * as React from "react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { Position, TeamSwitcher } from "./team-switcher"
import { useGetProfessionsQuery, useGetSkillsByProfessionIdQuery } from "@/api/professionApi"
import AddSkill from "./add-skill"
import { Pencil, Plus, Trash2 } from "lucide-react"
import { SortableTree } from "./Tree/SortableTree"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: professions, isLoading: isLoadingProfession, isSuccess: isSuccessProfessions } = useGetProfessionsQuery({
  })
  const [activePosition, setActivePosition] = React.useState<Position | null>(null)
  const { data: skills } = useGetSkillsByProfessionIdQuery(activePosition?.id, { skip: !activePosition?.id })
  const [activeItem, setActiveItem] = React.useState(null)
  const { setOpen } = useSidebar()

  const handleChangePosition = (position: Position) => {
    setActivePosition(position)
    setActiveItem(null)
  }

  React.useEffect(() => {
    if (isSuccessProfessions) {
      setActivePosition(professions?.[0])
    }
  }, [professions, isSuccessProfessions])

  return (
    <Sidebar
      collapsible="icon"
      className="overflow-hidden *:data-[sidebar=sidebar]:flex-row top-[--header-height] !h-[calc(100vh-1px-var(--header-height))]"
      {...props}
    >
      <Sidebar
        collapsible="none"
        className="w-[calc(var(--sidebar-width-icon)+1px)]! border-r"
      >
        <SidebarHeader>
          {!isLoadingProfession && <TeamSwitcher teams={professions} activePosition={activePosition} setActivePosition={handleChangePosition} />}
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent className="px-1.5 md:px-0">
              <SidebarMenu>
                {skills?.map((skill) => (
                  <SidebarMenuItem key={skill.name}>
                    <SidebarMenuButton
                      tooltip={{
                        children: skill.name,
                        hidden: false,
                      }}
                      onClick={() => {
                        setActiveItem(skill)
                        setOpen(true)
                      }}
                      isActive={activeItem?.name === skill.name}
                      className="px-2.5 md:px-2 cursor-pointer"
                    >
                      <img src={skill.icon} alt="" width={20} height={20} />
                      <span>{skill.name}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
                {!isLoadingProfession && activePosition && <AddSkill activeProfessionId={activePosition.id} />}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <Sidebar collapsible="none" className="hidden flex-1 md:flex">
        <SidebarHeader className="gap-3.5 border-b p-4">
          <div className="flex w-full items-center justify-between">
            <div className="text-foreground text-base font-medium">
              {activeItem ? `Roadmap: ${activeItem?.name}` : "Select a skill"}
            </div>
            {activeItem && <div className="flex items-center gap-1 ml-2">
              <button
                onClick={() => { }}
                className="text-muted-foreground hover:text-foreground cursor-pointer"
              >
                <Pencil className="size-4" />
              </button>
              <button
                onClick={() => { }}
                className="text-muted-foreground hover:text-destructive cursor-pointer"
              >
                <Trash2 className="size-4" />
              </button>
            </div>}
          </div>
        </SidebarHeader>
        {activeItem &&
          <>
            <SidebarContent>
              <SortableTree collapsible indicator removable />
            </SidebarContent>
            <SidebarFooter>
              <button
                onClick={() => {
                }}
                className="flex w-full items-center gap-2 rounded-md p-2 text-sm hover:bg-muted"
              >
                <div className="flex size-6 items-center justify-center rounded-md border bg-transparent">
                  <Plus className="size-4" />
                </div>
                <div className="text-muted-foreground font-medium">
                  Add new theory
                </div>
              </button>
            </SidebarFooter>
          </>
        }
      </Sidebar>
    </Sidebar>
  )
}
