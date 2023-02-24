import React from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import ToggleMode from "../element/ToggleMode";
import { isUserState } from "../utils/recoil/atoms";
import { fontBigger } from "../utils/styles/mixins";
import { useState } from "react";

const MainLogo = styled.div`
  font-family: 'Tilt Prism', cursive;
  display: flex;
  ${fontBigger};
  color: ${props => props.theme.primary};
`

const HeaderWrapper = styled.header`
  width: 100vw;
  height: 4rem;
  padding: 1rem 0.7rem;
  display: flex;
  justify-content: space-around;
  background-color: ${props => props.theme.bgColor};
`;

const StButtons = styled.div`
  align-items: center;
  display: flex;
  margin-top: 20px;
  gap: 20px;
  position: relative;
`

const HeaderButton = styled.button`
  cursor: pointer;
  width: 3rem;
  height: 3rem;
  background-color: gray;
  border: none;
  border-radius: 20%;
  justify-content: center;
  align-items: center;
  transform: translateX(-10px);
  border-radius: 50%;
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
  background-color: ${props => props.theme.bgColor};
  transition: border 0.3s;

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
  padding: 1rem 1rem;
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
            <HeaderButton onClick={handleHeaderButtonClick}></HeaderButton>
            {isDropdownOpen && (
              <DropdownMenu>
                <DropdownMenuItem onClick={handleLogout}>My Page</DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>Log out</DropdownMenuItem>
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