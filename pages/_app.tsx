import { appWithTranslation } from 'next-i18next'
import { AppProps } from 'next/app'
import React from 'react'
import { Provider } from 'react-redux'
import { WrappedApp } from '../components/app/WrappedApp'
import config from '../next-i18next.config'
import { store } from '../redux'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <WrappedApp>
        <Component {...pageProps} />
      </WrappedApp>
    </Provider>
  )
}

export default appWithTranslation(MyApp, config)
