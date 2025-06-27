import { useState } from "react";
import { Calendar } from "../Calendar";
import { AppSidebar } from "./Sidebar";

export const IntegrationSidebar = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <AppSidebar
      item={
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border shadow-sm w-full"
          captionLayout="dropdown"
        />
      }
      sidebarGroupLabelText="Calendário"
      sidebarSide="right"
    />
  );
};
