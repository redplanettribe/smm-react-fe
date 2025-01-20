

import { ThemeProvider } from 'styled-components'
import { DarkTheme, LightTheme } from './theme.ts'
import GlobalStyle from './globalStyles.ts'
import ToastNotification from './components/toast-notification/ToastNotification.tsx'
import { MyRouter } from './routes.tsx'
import { useSelector } from 'react-redux'
import { selectIsDarkTheme } from './store/theme/themeSlice.ts'

function App() {
  const isDarkTheme = useSelector(selectIsDarkTheme);
  return (
    <ThemeProvider theme={isDarkTheme ? DarkTheme : LightTheme}>
      <GlobalStyle />
      <ToastNotification />
      <MyRouter />
    </ThemeProvider>

  );
}

export default App
