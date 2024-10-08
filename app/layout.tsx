import type { Metadata } from "next"
import { Nunito } from "next/font/google"
import "./globals.css"
import { Toaster } from "sonner"
import { Footer } from "./_components/footer"
import AuthProvider from "./_providers/auth"

const nunito = Nunito({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "FSW Barber",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={nunito.className}>
        <AuthProvider>
          <div className="flex h-full flex-col">
            <div className="flex-1 xl:mb-[100px]">{children}</div>
            <Footer />
          </div>
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  )
}
