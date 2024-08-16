"use client"

import Image from "next/image"
import { Card, CardContent } from "./ui/card"
import { Button } from "./ui/button"
import { MenuIcon } from "lucide-react"
import { Sheet, SheetTrigger } from "./ui/sheet"
import { SidebarSheet } from "./sidebar-sheet"
import Link from "next/link"
import { NavbarSheet } from "./navbar-sheet"
import Search from "./search"
import { usePathname } from "next/navigation"

export const Header = () => {
  const pathname = usePathname()
  const isHomePage = pathname === "/"

  return (
    <Card>
      <CardContent className="flex flex-row items-center justify-between p-5 xl:px-24">
        <Link href="/">
          <Image
            src="/logo.png"
            alt="FSW Barber"
            height={20}
            width={120}
            className="xl:my-[10px]"
          />
        </Link>

        <div className="max-lg:hidden xl:w-[62%] xl:px-11">
          {!isHomePage && <Search />}
        </div>

        <div className="max-lg:hidden">
          <NavbarSheet />
        </div>

        <div className="xl:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="none">
                <MenuIcon size={20} />
              </Button>
            </SheetTrigger>
            <SidebarSheet />
          </Sheet>
        </div>
      </CardContent>
    </Card>
  )
}
