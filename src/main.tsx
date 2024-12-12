import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { Provider } from 'react-redux'
import store, { persistor } from './store/store.ts'
import { PersistGate } from 'redux-persist/integration/react'
import { ThemeProvider } from 'styled-components'
import { theme } from './theme.ts'
import GlobalStyle from './globalStyles.ts'
import ToastNotification from './components/toast-notification/ToastNotification.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <ToastNotification />
          <App />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  </StrictMode>,
)
