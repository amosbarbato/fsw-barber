import { getServerSession } from "next-auth"
import { Header } from "../_components/header"
import { authOptions } from "../_lib/auth"
import { notFound } from "next/navigation"
import BookingItem from "../_components/booking-item"
import { getConcludedBookings } from "../_data/get-concluded-bookings"
import { getConfirmedBookings } from "../_data/get-confirmed-bookings"

const Booking = async () => {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    return notFound()
  }

  const confirmedBookings = await getConfirmedBookings()
  const concludedBookings = await getConcludedBookings()

  return (
    <>
      <Header />
      <div className="space-y-3 p-5 xl:px-[98px] xl:pt-10">
        <h1 className="text-xl font-bold xl:text-2xl">Agendamentos</h1>

        {confirmedBookings.length === 0 && concludedBookings.length === 0 && (
          <p className="text-gray-400">Voce não tem agendamentos.</p>
        )}

        <main className="xl:grid xl:grid-cols-2 xl:gap-10">
          {confirmedBookings.length > 0 && (
            <div className="space-y-3 xl:space-y-[10px]">
              <h2 className="mt-6 text-xs font-bold uppercase text-gray-400 xl:mt-5 xl:text-sm">
                Confirmados
              </h2>
              {confirmedBookings.map((booking) => (
                <BookingItem
                  key={booking.id}
                  booking={JSON.parse(JSON.stringify(booking))}
                />
              ))}
            </div>
          )}
          {concludedBookings.length > 0 && (
            <div className="space-y-3 xl:space-y-[10px]">
              <h2 className="mt-6 text-xs font-bold uppercase text-gray-400 xl:mt-5 xl:text-sm">
                Finalizados
              </h2>
              {concludedBookings.map((booking) => (
                <BookingItem
                  key={booking.id}
                  booking={JSON.parse(JSON.stringify(booking))}
                />
              ))}
            </div>
          )}
        </main>
      </div>
    </>
  )
}

export default Booking
