import type { Metadata } from 'next'
import { Geist, Roboto, Inter, Lato, Montserrat, Open_Sans, Poppins } from 'next/font/google'
import './globals.css'


const geist = Geist({
  subsets: ['latin'],
})

const roboto = Roboto({
  subsets: ['latin'],
})

// Additional Google fonts
export const inter = Inter({
  subsets: ['latin'],
})

export const lato = Lato({
  subsets: ['latin'],
  weight: '100'
})

export const montserrat = Montserrat({
  subsets: ['latin'],
})

export const openSans = Open_Sans({
  subsets: ['latin'],
})

export const poppins = Poppins({
  subsets: ['latin'],
  weight: '400'
})


export const metadata: Metadata = {
  title: 'Task Project',
  description: 'Dashbaord design',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        {/* Use roboto.className, inter.className, lato.className, montserrat.className, openSans.className, or poppins.className on specific elements if needed */}
        {children}
      </body>
    </html>
  )
}
