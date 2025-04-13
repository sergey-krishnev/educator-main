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
import { Position, TeamSwitcher } from "./team-switcher"
import { useGetProfessionsQuery } from "@/api/professionApi"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: professions, isLoading: isLoadingProfession } = useGetProfessionsQuery({
  })
  const [activePosition, setActivePosition] = React.useState(null)
  const [activeItem, setActiveItem] = React.useState(activePosition?.skills?.[0])
  const { setOpen } = useSidebar()

  const handleChangePosition = (position: Position) => {
    setActivePosition(position)
    setActiveItem(position?.skills?.[0])
  }

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
                {activePosition?.skills?.map((skill) => (
                  <SidebarMenuItem key={skill.title}>
                    <SidebarMenuButton
                      tooltip={{
                        children: skill.title,
                        hidden: false,
                      }}
                      onClick={() => {
                        setActiveItem(skill)
                        setOpen(true)
                      }}
                      isActive={activeItem?.title === skill.title}
                      className="px-2.5 md:px-2 cursor-pointer"
                    >
                      <span>{skill.icon}</span>
                      <span>{skill.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <Sidebar collapsible="none" className="hidden flex-1 md:flex">
        <SidebarHeader className="gap-3.5 border-b p-4">
          <div className="flex w-full items-center justify-between">
            <div className="text-foreground text-base font-medium">
              Roadmap: {activeItem?.title}
            </div>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup className="px-0">
            <SidebarGroupContent>
              {activeItem?.items?.map((item) => (
                <a
                  href="#"
                  key={item.title}
                  className="hover:bg-sidebar-accent hover:text-sidebar-accent-foreground flex flex-col items-start gap-2 border-b p-4 text-sm leading-tight last:border-b-0"
                >
                  <div className="flex w-full items-center gap-2">
                    <span>{item.title}</span>{" "}
                  </div>
                </a>
              ))}
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </Sidebar>
  )
}
