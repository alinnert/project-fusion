import { appWithTranslation } from 'next-i18next'
import { AppProps } from 'next/dist/next-server/lib/router/router'
import { Provider } from 'react-redux'
import { WrappedApp } from '../components/WrappedApp'
// import '../i18n/i18next'
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

export default appWithTranslation(MyApp)
