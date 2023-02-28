import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Profile from "./pages/Profile";
import Detail from "./pages/Detail";
import GlobalStyle from "./utils/styles/GlobalStyle";
import styled, { ThemeProvider } from "styled-components";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  darkmodeState,
  studyModalState,
  isModalState,
} from "./utils/recoil/atoms";
import { darkTheme, lightTheme } from "./utils/styles/theme";
import StudyModal from "./components/StudyModal";
import { useEffect } from "react";
import Login from "./components/Login";

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
  const [isDark, setDark] = useRecoilState(darkmodeState);
  const isModalStudy = useRecoilValue(studyModalState);
  const visible = useRecoilValue(isModalState);

  return (
    <ThemeProvider theme={isDark === true ? darkTheme : lightTheme}>
      <RootWrapper>
        <GlobalStyle />
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/post/:id" element={<Detail />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
          <Footer />
        </BrowserRouter>
        {isModalStudy === true && <StudyModal />}
        {visible === true && <Login />}
      </RootWrapper>
    </ThemeProvider>
  );
}

export default App;
