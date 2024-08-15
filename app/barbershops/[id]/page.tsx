import { Header } from "@/app/_components/header"
import { PhoneItem } from "@/app/_components/phone-item"
import { ServiceItem } from "@/app/_components/service-item"
import { SidebarSheet } from "@/app/_components/sidebar-sheet"
import { Avatar, AvatarImage } from "@/app/_components/ui/avatar"
import { Badge } from "@/app/_components/ui/badge"
import { Button } from "@/app/_components/ui/button"
import { Card, CardContent } from "@/app/_components/ui/card"
import { Sheet, SheetTrigger } from "@/app/_components/ui/sheet"
import { db } from "@/app/_lib/prisma"
import { ChevronLeftIcon, MapPinIcon, MenuIcon, StarIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

interface BarbershopPageProps {
  params: {
    id: string
  }
}

const BarbershopPage = async ({ params }: BarbershopPageProps) => {
  const barbershop = await db.barbershop.findUnique({
    where: {
      id: params.id,
    },
    include: {
      services: true,
    },
  })

  if (!barbershop) {
    return notFound()
  }

  return (
    <div>
      {/* DESKTOP VIEW */}
      <div id="desktop-view" className="max-lg:hidden">
        <Header />
        <div className="grid grid-cols-12 gap-10 px-[98px] pt-10">
          <main className="col-span-8 space-y-10">
            <div className="space-y-5">
              <div className="relative h-[487px] w-full">
                <Image
                  alt={barbershop.name}
                  src={barbershop?.imageUrl}
                  fill
                  className="rounded-lg"
                />
              </div>

              <div className="flex justify-between">
                <div className="space-y-3">
                  <h1 className="text-3xl font-bold">{barbershop.name}</h1>
                  <div className="flex items-center gap-2">
                    <MapPinIcon className="text-primary" size={18} />
                    <p className="text-sm">{barbershop.address}</p>
                  </div>
                </div>

                <Badge variant="secondary" className="rounded-lg px-5">
                  <div className="flex flex-col items-center gap-2">
                    <span className="flex items-center gap-2 text-xl">
                      <StarIcon
                        className="fill-primary text-primary"
                        size={18}
                      />
                      5,0
                    </span>

                    <p className="text-xs">499 avaliações</p>
                  </div>
                </Badge>
              </div>
            </div>

            <div className="space-y-3">
              <h2 className="text-sm font-bold uppercase text-gray-400">
                Serviços
              </h2>
              <div className="grid grid-cols-2 gap-x-5 gap-y-3">
                {barbershop.services.map((service) => (
                  <ServiceItem
                    key={service.id}
                    barbershop={JSON.parse(JSON.stringify(barbershop))}
                    service={JSON.parse(JSON.stringify(service))}
                  />
                ))}
              </div>
            </div>
          </main>

          <aside className="col-span-4">
            <Card className="rounded-2xl p-5">
              <CardContent className="space-y-5 p-0">
                <div className="relative flex h-[180px] w-full items-end">
                  <Image
                    alt={`Mapa da barbearia ${barbershop.name}`}
                    src="/map.png"
                    fill
                    className="rounded-lg object-cover"
                  />
                  <Card className="z-50 mx-5 mb-3 w-full rounded-xl">
                    <CardContent className="flex items-center gap-3 px-5 py-3">
                      <Avatar>
                        <AvatarImage src={barbershop.imageUrl} />
                      </Avatar>
                      <div>
                        <h3 className="font-bold">{barbershop.name}</h3>
                        <p className="text-xs">{barbershop.address}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                <div className="space-y-[10px]">
                  <h2 className="text-sm font-bold uppercase">Sobre Nós</h2>
                  <p className="text-justify text-sm text-gray-400">
                    {barbershop.description}
                  </p>
                </div>

                <div className="border-b" />

                <div className="space-y-[10px]">
                  {barbershop.phones.map((phone) => (
                    <PhoneItem key={phone} phone={phone} />
                  ))}
                </div>

                <div className="border-b" />

                <div className="flex justify-between text-sm">
                  <ul className="space-y-[10px] text-left text-gray-400">
                    <li>Segunda</li>
                    <li>Terça</li>
                    <li>Quarta</li>
                    <li>Quinta</li>
                    <li>Sexta</li>
                    <li>Sábado</li>
                    <li>Domingo</li>
                  </ul>
                  <ul className="space-y-[10px] text-right">
                    <li>Fechado</li>
                    <li>09:00 - 18:00</li>
                    <li>09:00 - 18:00</li>
                    <li>09:00 - 18:00</li>
                    <li>09:00 - 18:00</li>
                    <li>08:00 - 18:00</li>
                    <li>Fechado</li>
                  </ul>
                </div>

                <div className="border-b" />

                <div className="flex items-center justify-between py-5">
                  <span>Em parceria com</span>
                  <Link href="/">
                    <Image
                      src="/logo.png"
                      alt="FSW Barber"
                      height={20}
                      width={120}
                    />
                  </Link>
                </div>
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>

      {/* MOBILE VIEW */}
      <div id="mobile-view" className="xl:hidden">
        <div className="relative h-[250px] w-full">
          <Image
            alt={barbershop.name}
            src={barbershop?.imageUrl}
            fill
            className="object-cover"
          />
          <Button
            size="icon"
            variant="secondary"
            className="absolute left-4 top-4 rounded-lg"
            asChild
          >
            <Link href="/">
              <ChevronLeftIcon />
            </Link>
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button
                size="icon"
                variant="secondary"
                className="absolute right-4 top-4 rounded-lg"
              >
                <MenuIcon size={20} />
              </Button>
            </SheetTrigger>
            <SidebarSheet />
          </Sheet>
        </div>

        <div className="border-b border-solid px-5 pb-5 pt-3">
          <h1 className="mb-3 text-xl font-bold">{barbershop.name}</h1>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <MapPinIcon className="text-primary" size={18} />
              <p className="text-sm">{barbershop.address}</p>
            </div>
            <div className="flex items-center gap-2">
              <StarIcon className="fill-primary text-primary" size={18} />
              <p className="text-sm">5,0 (499 avaliações)</p>
            </div>
          </div>
        </div>

        <div className="space-y-3 border-b border-solid p-5">
          <h2 className="text-xs font-bold uppercase text-gray-400">
            Sobre Nos
          </h2>
          <p className="text-justify text-sm">{barbershop.description}</p>
        </div>

        <div className="space-y-3 p-5">
          <h2 className="text-xs font-bold uppercase text-gray-400">
            Serviços
          </h2>
          <div className="space-y-3">
            {barbershop.services.map((service) => (
              <ServiceItem
                key={service.id}
                barbershop={JSON.parse(JSON.stringify(barbershop))}
                service={JSON.parse(JSON.stringify(service))}
              />
            ))}
          </div>
        </div>

        <div className="space-y-3 p-5">
          {barbershop.phones.map((phone) => (
            <PhoneItem key={phone} phone={phone} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default BarbershopPage
