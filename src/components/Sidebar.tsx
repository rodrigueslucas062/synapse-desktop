
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

interface SidebarItem {
  title: string;
  url: string;
  icon: React.ComponentType;
}

interface SidebarProps {
  item: SidebarItem[];
  sidebarGroupLabelText: string;
  sidebarSide?: "left" | "right";
}

export function AppSidebar({item, sidebarGroupLabelText, sidebarSide}: SidebarProps) {
  return (
    <Sidebar side={sidebarSide}>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{sidebarGroupLabelText}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {item.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}