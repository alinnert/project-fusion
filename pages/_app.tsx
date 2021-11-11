import { AppProps } from 'next/dist/pages/_app'
import React from 'react'
import { Provider } from 'react-redux'
import { WrappedApp } from '../components/app/WrappedApp'
import { store } from '../redux'
import '../styles/globals.css'
import '../utils/i18n'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <WrappedApp>
        <Component {...pageProps} />
      </WrappedApp>
    </Provider>
  )
}
