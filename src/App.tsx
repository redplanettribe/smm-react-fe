import { ThemeProvider } from 'styled-components'
import { DarkTheme, LightTheme } from './theme.ts'
import GlobalStyle from './globalStyles.ts'
import ToastNotification from './components/toast-notification/ToastNotification.tsx'
import { MyRouter } from './routes.tsx'
import { useSelector } from 'react-redux'
import { selectIsDarkTheme } from './store/theme/themeSlice.ts'
import ModalManager from './components/modals/ModalManager.tsx'

function App() {
  const isDarkTheme = useSelector(selectIsDarkTheme);
  const theme = isDarkTheme ? DarkTheme : LightTheme;
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle theme={theme} />
      <ToastNotification />
      <ModalManager />
      <MyRouter />
    </ThemeProvider>

  );
}

export default App
