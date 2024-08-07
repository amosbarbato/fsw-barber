import { PhoneItem } from "@/app/_components/phone-item"
import { ServiceItem } from "@/app/_components/service-item"
import { Button } from "@/app/_components/ui/button"
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
          className="absolute left-4 top-4"
          asChild
        >
          <Link href="/">
            <ChevronLeftIcon />
          </Link>
        </Button>

        <Button
          size="icon"
          variant="secondary"
          className="absolute right-4 top-4"
        >
          <Link href="/">
            <MenuIcon size={20} />
          </Link>
        </Button>
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
        <h2 className="text-xs font-bold uppercase text-gray-400">Sobre Nos</h2>
        <p className="text-justify text-sm">{barbershop.description}</p>
      </div>

      <div className="space-y-3 p-5">
        <h2 className="text-xs font-bold uppercase text-gray-400">Serviços</h2>
        <div className="space-y-3">
          {barbershop.services.map((service) => (
            <ServiceItem key={service.id} service={service} />
          ))}
        </div>
      </div>

      <div className="space-y-3 p-5">
        {barbershop.phones.map((phone) => (
          <PhoneItem key={phone} phone={phone} />
        ))}
      </div>
    </div>
  )
}

export default BarbershopPage
