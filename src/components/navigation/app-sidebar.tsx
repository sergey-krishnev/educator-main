import * as React from "react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { useGetProfessionsQuery, useGetSkillsByProfessionIdQuery } from "@/api/professionApi"
import { Pencil, Trash2 } from "lucide-react"
import AddSkill from "../../features/skills/add-skill"
import { AddTheory } from "../../features/theories/add-theory"
import { Position, ProfessionPicker } from "../../features/professions/profession-picker"
import TreeTheories from "../../features/theories/tree-theories"
import DeleteSkill from "@/features/skills/delete-skill"

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
          {!isLoadingProfession && <ProfessionPicker teams={professions} activePosition={activePosition} setActivePosition={handleChangePosition} />}
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
            {activeItem && <div className="flex items-center gap-1">
              <AddTheory skillId={activeItem?.id}/>
              <button
                onClick={() => { }}
                className="text-muted-foreground hover:text-foreground cursor-pointer"
              >
                <Pencil width={18} />
              </button>
              <DeleteSkill activeProfession={activePosition} skill={activeItem} setSkill={setActiveItem}/>
            </div>}
          </div>
        </SidebarHeader>
        {activeItem &&
          <>
            <SidebarContent>
              <TreeTheories skillId={activeItem?.id} />
            </SidebarContent>
          </>
        }
      </Sidebar>
    </Sidebar>
  )
}
