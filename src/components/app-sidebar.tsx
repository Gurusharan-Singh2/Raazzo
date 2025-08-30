import * as React from "react"
import { Blocks, Box, ClipboardList, Database, GalleryVerticalEnd, HomeIcon, LayoutDashboard, ShoppingCart, Users, Warehouse } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import Link from "next/link"
import Logo from '../../public/Razzo.png'
import Image from "next/image"


type NavItem = {
  title: string
  url: string
  icon?: React.ComponentType<{ className?: string }>
  isActive?: boolean
  items?: NavItem[]
}

const data: { navMain: NavItem[] } = {
 navMain: [
    {
      title: "Dashboard",
      url: "/admin",
      icon: LayoutDashboard,
    },
    {
      title: "Products",
      url: "/admin/products",
      icon: Box,
    },
    {
      title: "Warehouses",
      url: "/admin/warehouses",
      icon: Warehouse, 
    },
    {
      title: "Delivery Person",
      url: "/admin/delivery-persons",
      icon: Users,
    },
    {
      title: "Orders",
      url: "/admin/orders",
      icon: ShoppingCart,
    },
    {
      title: "Inventories",
      url: "/admin/inventories",
      icon: Blocks,
    },
  ],
}

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="#">
             
                  <Image src={Logo} width={100} height={100} alt="logo/Razzo"/>
            
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
       
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu className="flex gap-5 flex-col mt-5">
            {data.navMain.map((item, index) => {
              const Icon = item.icon
            
              return (
               <Link key={index} href={item.url} className="flex items-center gap-2 opacity-85 hover:opacity-100">
                          {Icon && <Icon className="mr-2 size-4" />}
                         <h4 className="text-[12px] sm:text-[14px] md:text[16px]"> {item.title}</h4>
                        </Link>
              )
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  )
}
