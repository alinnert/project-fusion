import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { AppRoutes } from './AppRoutes'
import { AppSplashScreen } from './components/app/AppSplashScreen'
import './globals.css'
import { store } from './redux'
import './utils/i18n'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Suspense fallback={<AppSplashScreen />}>
          <AppRoutes />
        </Suspense>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
)
