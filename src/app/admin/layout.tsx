import { AppSidebar } from "@/components/app-sidebar"
import { SearchForm } from "@/components/search-form"
import { SectionCards } from "@/components/section-cards"

import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

const DashboardLayout=()=>{
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 w-full">
          <SidebarTrigger className="-ml-1" />
          
        </header>
        <SectionCards/>
      </SidebarInset>
    </SidebarProvider>
  )
}


export default DashboardLayout