import React, { Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { AppRoutes } from './AppRoutes'
import { AppSplashScreen } from './components/app/AppSplashScreen'
import './globals.css'
import { store } from './redux'
import './utils/i18n'

const rootElement = document.getElementById('root')
if (rootElement !== null) render(rootElement)

function render(element: HTMLElement): void {
  const root = createRoot(element)
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <Suspense fallback={<AppSplashScreen />}>
            <AppRoutes />
          </Suspense>
        </BrowserRouter>
      </Provider>
    </React.StrictMode>,
  )
}
