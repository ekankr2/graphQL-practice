import '../styles/globals.css'
import '../styles/main.scss';
import type { AppProps } from 'next/app'

import '../styles/carousel.css'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
