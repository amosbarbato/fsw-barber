import { Header } from "./_components/header"
import { Button } from "./_components/ui/button"
import Image from "next/image"
import { db } from "./_lib/prisma"
import { BarbershopItem } from "./_components/barbershop-item"
import BookingItem from "./_components/booking-item"
import { quickSearchOptions } from "./_constants/search"
import Search from "./_components/search"
import Link from "next/link"
import { getServerSession } from "next-auth"
import { authOptions } from "./_lib/auth"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { getConfirmedBookings } from "./_data/get-confirmed-bookings"

const Home = async () => {
  const session = await getServerSession(authOptions)
  const barbershops = await db.barbershop.findMany({})
  const popularBarbershops = await db.barbershop.findMany({
    orderBy: {
      name: "desc",
    },
  })

  const confirmedBookings = await getConfirmedBookings()

  return (
    <div>
      <Header />
      <div className="p-5 xl:p-0">
        <div className="xl:grid xl:grid-cols-2 xl:border-b xl:border-solid xl:border-input xl:bg-pattern xl:bg-cover xl:bg-no-repeat xl:px-[98px]">
          <div className="xl:mr-32 xl:py-16">
            <h2 className="text-xl font-bold xl:text-2xl">
              Olá, {session?.user ? session?.user?.name : "bem vindo"}!
            </h2>
            <p>
              {/* Segunda-feira, 05 de agosto. */}
              <span className="capitalize xl:text-sm">
                {format(new Date(), "EE, dd", { locale: ptBR })}
              </span>
              <span>&nbsp;de&nbsp;</span>
              <span className="capitalize xl:text-sm">
                {format(new Date(), "MMMM", { locale: ptBR })}
              </span>
            </p>

            <div className="mt-6 xl:mt-8">
              <Search />
            </div>

            <div className="mt-6 flex gap-3 overflow-x-scroll xl:hidden [&::-webkit-scrollbar]:hidden">
              {quickSearchOptions.map((option) => (
                <Button
                  className="min-w-fit gap-2"
                  variant="ghost"
                  size="tag"
                  key={option.title}
                  asChild
                >
                  <Link href={`/barbershops?service=${option.title}`}>
                    <Image
                      src={option.imageUrl}
                      alt={option.title}
                      height={16}
                      width={16}
                    />
                    {option.title}
                  </Link>
                </Button>
              ))}
            </div>

            <div className="relative mt-6 h-[150px] w-full xl:hidden">
              <Image
                src="/banner-01.png"
                alt="Agende nos melhores com FSW Barber"
                fill
                className="rounded-xl object-cover"
              />
            </div>

            {confirmedBookings.length > 0 && (
              <>
                <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400 xl:mb-5 xl:mt-9 xl:text-sm">
                  Agendamentos
                </h2>
                <div className="flex gap-3 overflow-x-auto [&::-webkit-scrollbar]:hidden">
                  {confirmedBookings.map((booking) => (
                    <BookingItem
                      key={booking.id}
                      booking={JSON.parse(JSON.stringify(booking))}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          <div className="xl:py-16">
            <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400 xl:mb-5 xl:mt-0 xl:text-sm">
              Recomendados
            </h2>
            <div className="flex gap-4 overflow-auto xl:gap-5 [&::-webkit-scrollbar]:hidden">
              {barbershops.map((barbershop) => (
                <BarbershopItem key={barbershop.id} barbershop={barbershop} />
              ))}
            </div>
          </div>
        </div>

        <div className="xl:px-[98px]">
          <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400 xl:mb-5 xl:mt-10 xl:text-sm">
            Populares
          </h2>
          <div className="flex gap-4 overflow-auto xl:gap-5 [&::-webkit-scrollbar]:hidden">
            {popularBarbershops.map((barbershop) => (
              <BarbershopItem key={barbershop.id} barbershop={barbershop} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
