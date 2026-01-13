import { Geist } from "next/font/google"
import "./globals.css"
import RadarProvider from "@/src/context/RadarContext"

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
})

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} bg-black text-white`}>
        <RadarProvider>
          {children}
        </RadarProvider>
      </body>
    </html>
  )
}
