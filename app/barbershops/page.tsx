import { BarbershopItem } from "../_components/barbershop-item"
import { Header } from "../_components/header"
import Search from "../_components/search"
import { db } from "../_lib/prisma"

interface BarbershopsPageProps {
  searchParams: {
    title?: string
    service?: string
  }
}

const BarbershopsPage = async ({ searchParams }: BarbershopsPageProps) => {
  const barbershops = await db.barbershop.findMany({
    where: {
      OR: [
        searchParams?.title
          ? {
              name: {
                contains: searchParams?.title,
                mode: "insensitive",
              },
            }
          : {},
        searchParams.service
          ? {
              services: {
                some: {
                  name: {
                    contains: searchParams?.service,
                    mode: "insensitive",
                  },
                },
              },
            }
          : {},
      ],
    },
  })

  return (
    <div>
      <Header />
      <div className="my-6 px-5 xl:hidden">
        <Search />
      </div>
      <div className="mb-6 px-5 xl:px-[98px]">
        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400 xl:mb-5 xl:mt-16 xl:text-xl">
          Resultados para &quot;
          {searchParams?.title || searchParams?.service}
          &quot;
        </h2>

        <div className="grid grid-cols-2 gap-4 xl:grid-cols-5 xl:gap-5">
          {barbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default BarbershopsPage
