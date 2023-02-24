import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import GlobalStyle from "./utils/styles/GlobalStyle";
import styled, { ThemeProvider } from "styled-components";
import { useRecoilValue } from "recoil";
import { darkmodeState } from "./utils/recoil/atoms";
import { darkTheme, lightTheme } from "./utils/styles/theme";

const RootWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  min-width: 100vw;
  min-height: 100vh;
  background-color: ${(props) => props.theme.bgColor};
  color: ${(props) => props.theme.textColor3};
`;

function App() {
  const isDark = useRecoilValue(darkmodeState);
  return (
    <ThemeProvider theme={isDark === true ? darkTheme : lightTheme}>
      <RootWrapper>
        <GlobalStyle />
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </RootWrapper>
    </ThemeProvider>
  );
}

export default App;
