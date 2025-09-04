"use client"
import * as React from "react"
import { Blocks, Box, Users, Warehouse, ShoppingCart, LayoutDashboard } from "lucide-react"
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
import Logo from "../../public/yyyyyyyyyy.png"
import Image from "next/image"
import { Separator } from "./ui/separator"
import { usePathname } from "next/navigation"

type NavItem = {
  title: string
  url: string
  icon?: React.ComponentType<{ className?: string }>
}

const data: { navMain: NavItem[] } = {
  navMain: [
    { title: "Dashboard", url: "/admin", icon: LayoutDashboard },
    { title: "Products", url: "/admin/products", icon: Box },
    { title: "Warehouses", url: "/admin/warehouses", icon: Warehouse },
    { title: "Delivery Person", url: "/admin/delivery-persons", icon: Users },
    { title: "Orders", url: "/admin/orders", icon: ShoppingCart },
    { title: "Inventories", url: "/admin/inventories", icon: Blocks },
  ],
}

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild className="h-[100px]">
              <Link href="#">
                <Image src={Logo} width={180} height={180} alt="logo/Razzo" />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <Separator />

      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu className="flex gap-5 flex-col mx-8 mt-1">
            {data.navMain.map((item, index) => {
              const Icon = item.icon
              const isActive = pathname === item.url

              return (
                <Link
                  key={index}
                  href={item.url}
                  className={`flex items-center gap-2 transition-opacity ${
                    isActive ? "text-primary font-bold opacity-100" : "opacity-85 hover:opacity-100"
                  }`}
                >
                  {Icon && <Icon className="mr-2 size-4" />}
                  <h4 className="text-[14px] sm:text-[16px] md:text[18px]">{item.title}</h4>
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
