import React, { useRef } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import ToggleMode from "../element/ToggleMode";
import { isModalState, isUserState } from "../utils/recoil/atoms";
import { Link, useNavigate } from "react-router-dom";
import {
  boxBorderRadius,
  circleBorderRadius,
  fontBigger,
} from "../utils/styles/mixins";
import { useState } from "react";
import unnamed from "../assets/unname.jpg";
import Button from "../element/Button";
import { useCookies } from "react-cookie";

const MainLogo = styled.h1`
  cursor: pointer;
  font-family: "Tilt Prism", cursive;
  ${fontBigger};
  color: ${(props) => props.theme.primary};
  transition: 0.25s letter-spacing;
  &:hover {
    letter-spacing: 0.2rem;
  }
`;

const HeaderWrapper = styled.header`
  z-index: 998;
  position: fixed;
  width: 100vw;
  height: 5rem;
  padding: 1rem 0.7rem;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-color: ${(props) => props.theme.bgColor};
`;

const StButtons = styled.div`
  align-items: center;
  display: flex;
  gap: 2rem;
  position: relative;
`;

const HeaderButton = styled.img`
  cursor: pointer;
  width: 3.5rem;
  height: 3.5rem;
  ${circleBorderRadius}
  object-fit: cover;
`;

const LoginButton = styled.button`
  cursor: pointer;
  width: 7rem;
  height: 2.5rem;
  border: 1px solid gray;
  border-radius: 30px;
  justify-content: center;
  align-items: center;
  transform: translateX(-10px);
  background-color: ${(props) => props.theme.bgColor};
  transition: border 0.3s;
  color: ${(props) => props.theme.textColor3};
  &:hover {
    border: 2px solid gray;
  }
`;

const DropdownMenu = styled.ul`
  position: absolute;
  top: 3rem;
  right: 0rem;
  list-style-type: none;
  padding: 0;
  margin: 0;
  background-color: ${(props) => props.theme.bgColor};
  box-shadow: ${(props) => props.theme.shadow};
  ${boxBorderRadius}
`;

const DropdownMenuItem = styled.li`
  padding: 1.4rem;
  cursor: pointer;
  font-size: 1.2rem;
`;

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isUserState);
  const [etc, etc2, removeCookie] = useCookies();
  const homeWrapperRef = useRef(null);
  const navigate = useNavigate();

  const handleHeaderButtonClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    removeCookie("viking-band-token");
    setIsLoggedIn(false);
    window.location.reload();
  };

  const setVisible = useSetRecoilState(isModalState);

  return (
    <HeaderWrapper
      ref={homeWrapperRef}
      onClick={(e) => {
        if (isDropdownOpen !== true) return;
        if (homeWrapperRef.current === e.target) {
          setIsDropdownOpen(false);
        }
      }}
    >
      <Link to="/">
        <MainLogo>Viking Band</MainLogo>
      </Link>
      <StButtons>
        <ToggleMode />
        {isLoggedIn ? (
          <div>
            <HeaderButton onClick={handleHeaderButtonClick} src={unnamed} />
            {isDropdownOpen && (
              <DropdownMenu>
                <DropdownMenuItem onClick={() => navigate("/profile")}>
                  프로필
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  로그아웃
                </DropdownMenuItem>
              </DropdownMenu>
            )}
          </div>
        ) : (
          <Button onClick={() => setVisible(true)}>로그인</Button>
        )}
      </StButtons>
    </HeaderWrapper>
  );
};

export default Header;
