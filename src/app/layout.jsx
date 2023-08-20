import './globals.css'
import { Providers } from './providers'
import { Wrapper } from '@/components/Wrapper'

// const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Wrapper>
            {children}
          </Wrapper>
        </Providers>
      </body>
    </html>
  )
}
