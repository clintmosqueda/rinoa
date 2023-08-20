import { extendTheme } from '@chakra-ui/react'
import { Plus_Jakarta_Sans } from 'next/font/google'
import colors from './colors'

const jakarta_sans = Plus_Jakarta_Sans({ 
  preload: false,
  weight: ['400', '500', '700'], 
  subsets: ['latin'] 
})

export const theme = extendTheme({
  styles: {
    global: (props) => ({
      html: {
        scrollBehavior: 'smooth',
      },
      'html, body': {
        fontFamily: `${jakarta_sans.style.fontFamily}`, 
        color: 'brand.black',
      },
    }),
  },
  colors,
})