import '../style/global.css'
import type { AppContext, AppProps } from 'next/app'
import Head from 'next/head'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from '../config/chakra'
import { Header } from '@components/Layout/Header'
import { LayoutWrapper } from '@components/Layout/LayoutWrapper'
import App from 'next/app'
import { Analytics } from '@vercel/analytics/react'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Yugo Ibuki</title>
      </Head>

      <ChakraProvider theme={theme}>
        <Header />

        <LayoutWrapper>
          <Component {...pageProps} />
          <Analytics />
        </LayoutWrapper>
      </ChakraProvider>
    </>
  )
}

export default MyApp
