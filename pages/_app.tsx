import { AppProps } from 'next/dist/next-server/lib/router/router'
import { Provider } from 'react-redux'
import { store } from '../redux'
import '../styles/globals.css'
import { WrappedApp } from '../components/WrappedApp'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <WrappedApp>
        <Component {...pageProps} />
      </WrappedApp>
    </Provider>
  )
}
