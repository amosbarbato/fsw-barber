import Image from "next/image"
import { Card, CardContent } from "./ui/card"
import { Button } from "./ui/button"
import { MenuIcon } from "lucide-react"
import { Sheet, SheetTrigger } from "./ui/sheet"
import { SidebarSheet } from "./sidebar-sheet"
import Link from "next/link"
import { NavbarSheet } from "./navbar-sheet"

export const Header = () => {
  return (
    <Card>
      <CardContent className="flex flex-row items-center justify-between p-5 xl:px-28">
        <Link href="/">
          <Image
            src="/logo.png"
            alt="FSW Barber"
            height={20}
            width={120}
            className="xl:my-[10px]"
          />
        </Link>

        <div>
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
