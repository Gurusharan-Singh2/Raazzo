"use client"

import { useState } from "react"
import {
  BadgeCheck,
  Bell,
  CreditCard,
  LogOut,
  User,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import { Button } from "@/components/ui/button"

export function NavUser({
  user,
}: {
  user: {
    name: string
    email: string
    avatar: string
  }
}) {
  const { isMobile } = useSidebar()
  const [profileOpen, setProfileOpen] = useState(false)

  return (
    <>
      <SidebarMenu className="w-fit">
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                
              >
                <Avatar className="h-12 w-12 rounded-xl border shadow-sm">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="rounded-xl text-lg font-semibold">
                    {user.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </SidebarMenuButton>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              className="min-w-72 rounded-xl shadow-lg"
              side={isMobile ? "bottom" : "right"}
              align="end"
              sideOffset={6}
            >
              {/* Header */}
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-3 px-3 py-2">
                  <Avatar className="h-12 w-12 rounded-xl border">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="rounded-xl text-lg font-semibold">
                      {user.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="truncate font-semibold text-base">
                      {user.name}
                    </span>
                    <span className="truncate text-sm text-muted-foreground">
                      {user.email}
                    </span>
                  </div>
                </div>
              </DropdownMenuLabel>

              <DropdownMenuSeparator />

              {/* Menu Items */}
              <DropdownMenuGroup className="text-sm">
                <DropdownMenuItem onClick={() => setProfileOpen(true)}>
                  <User className="size-5 mr-2" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <BadgeCheck className="size-5 mr-2" />
                  Account
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <CreditCard className="size-5 mr-2" />
                  Billing
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Bell className="size-5 mr-2" />
                  Notifications
                </DropdownMenuItem>
              </DropdownMenuGroup>

              <DropdownMenuSeparator />

              {/* Logout */}
              <DropdownMenuItem
                className="text-red-600 font-medium focus:text-red-700"
                onClick={() => {
                  console.log("Logging out…")
                }}
              >
                <LogOut className="size-5 mr-2" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>

      {/* Profile Modal */}
      <Dialog open={profileOpen} onOpenChange={setProfileOpen}>
        <DialogContent className="max-w-md rounded-2xl shadow-xl">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">
              User Profile
            </DialogTitle>
          </DialogHeader>

          <div className="flex items-center gap-4">
            <Avatar className="h-14 w-14 rounded-xl border">
              <AvatarImage src={user.avatar} />
              <AvatarFallback className="rounded-xl text-lg font-semibold">
                {user.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-base font-medium">{user.name}</p>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <Button variant="outline" size="lg" className="w-full rounded-xl">
              Edit Profile
            </Button>
            <Button
              variant="destructive"
              size="lg"
              className="w-full rounded-xl"
              onClick={() => setProfileOpen(false)}
            >
              Logout
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
