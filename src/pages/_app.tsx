import React from 'react'
import '../style/global.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from '../config/chakra'
import { Header } from '@components/Layout/Header'
import { LayoutWrapper } from '@components/Layout/LayoutWrapper'
import { Analytics } from '@vercel/analytics/react'

// https://stackoverflow.com/questions/58070996/how-to-fix-the-warning-uselayouteffect-does-nothing-on-the-server
React.useLayoutEffect = React.useEffect

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
