import GlobalStyle from './styles/GlobalStyle';
import { ThemeProvider } from 'styled-components';
import theme from './styles/theme';
import AppRouter from './pages/Router';
import { RecoilRoot } from 'recoil';

function App() {
  return (
    <>
      <GlobalStyle />
      <RecoilRoot>
        <ThemeProvider theme={theme}>
          <AppRouter />
        </ThemeProvider>
      </RecoilRoot>
    </>
  );
}
export default App;
