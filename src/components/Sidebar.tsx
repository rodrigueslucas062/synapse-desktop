import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";
import React from "react";

interface SidebarProps {
  item?: React.ReactNode;
  sidebarGroupLabelText: string;
  sidebarSide?: "left" | "right";
}

export function AppSidebar({
  item,
  sidebarGroupLabelText,
  sidebarSide,
}: SidebarProps) {
  return (
    <Sidebar side={sidebarSide}>
      <SidebarContent>
        <SidebarGroup>
          {sidebarGroupLabelText && (
            <SidebarGroupLabel>{sidebarGroupLabelText}</SidebarGroupLabel>
          )}
          <SidebarGroupContent>{item}</SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
