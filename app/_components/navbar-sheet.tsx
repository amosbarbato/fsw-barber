"use client"

import { signOut, useSession } from "next-auth/react"
import { Avatar, AvatarImage } from "./ui/avatar"
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog"
import { Button } from "./ui/button"
import { UserCircle2 } from "lucide-react"
import SignInDialog from "./sign-in-dialog"

export const NavbarSheet = () => {
  const { data } = useSession()
  const handleLogoutClick = () => signOut()

  return (
    <div className="flex items-center">
      {data?.user ? (
        <Button
          variant="none"
          className="flex items-center gap-2"
          onClick={handleLogoutClick}
        >
          <Avatar className="h-9 w-9">
            <AvatarImage src={data?.user?.image ?? ""} />
          </Avatar>
          <p className="font-bold">{data.user.name}</p>
        </Button>
      ) : (
        <>
          <div className="flex items-center gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm" className="w-full space-x-2 rounded-lg px-4">
                  <UserCircle2 size={16} />
                  <p className="text-sm font-bold">Perfil</p>
                </Button>
              </DialogTrigger>

              <DialogContent className="w-80">
                <SignInDialog />
              </DialogContent>
            </Dialog>
          </div>
        </>
      )}
    </div>
  )
}
