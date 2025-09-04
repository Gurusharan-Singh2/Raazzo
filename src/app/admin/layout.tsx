import { AppSidebar } from "@/components/app-sidebar"
import { SectionCards } from "@/components/section-cards"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { NavUser } from "@/components/userui"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex  w-full h-16 justify-between shrink-0 items-center gap-2 border-b px-4 ">
          <SidebarTrigger className="-ml-1" /> 
          <NavUser user={{
            name:"Gurusharan",
            email:"gurusharansingh2222@gmail.com",
            avatar:""
          }}/>
        </header>

       <section className="p-4">
        {children}
       </section>
        
      </SidebarInset>
    </SidebarProvider>
  )
}
