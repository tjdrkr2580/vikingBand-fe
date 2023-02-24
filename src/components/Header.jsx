import React from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import ToggleMode from "../element/ToggleMode";
import { isUserState } from "../utils/recoil/atoms";
import { circleBorderRadius, fontBigger } from "../utils/styles/mixins";
import { useState } from "react";
import unnamed from "../assets/unname.jpg";

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
  width: 3rem;
  height: 3rem;
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
  top: 2rem;
  right: 0;
  list-style-type: none;
  padding: 0;
  margin: 0;
  background-color: white;
  border: 1px solid black;
  border-radius: 4px;
  transform: translateX(-10px);
`;

const DropdownMenuItem = styled.li`
  padding: 1rem;
  cursor: pointer;
  &:hover {
    background-color: lightgray;
  }
`;

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isUserState);

  const handleHeaderButtonClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <HeaderWrapper>
      <MainLogo>Viking Band</MainLogo>
      <StButtons>
        <ToggleMode />
        {isLoggedIn ? (
          <div>
            <HeaderButton onClick={handleHeaderButtonClick} src={unnamed} />
            {isDropdownOpen && (
              <DropdownMenu>
                <DropdownMenuItem onClick={handleLogout}>
                  My Page
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  Log out
                </DropdownMenuItem>
              </DropdownMenu>
            )}
          </div>
        ) : (
          <LoginButton>Log in</LoginButton>
        )}
      </StButtons>
    </HeaderWrapper>
  );
};

export default Header;
