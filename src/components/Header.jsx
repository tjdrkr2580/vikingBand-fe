import React, { useState } from "react";
import styled from "styled-components";
import ToggleMode from "../element/ToggleMode";
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from "../utils/styles/theme";

const HeaderWrapper = styled.header`
  width: 100vw;
  height: 4rem;
  padding: 1rem 0.7rem;
  display: flex;
  background-color: ${props => props.theme.bgColor};
`;

const HeaderButton = styled.button`
  cursor: pointer;
  width: 4rem;
  height: 4rem;
  background-color: gray;
  border: none;
  border-radius: 50%;
  margin-left: auto;
  margin-right: 10px;
`;

const DropdownMenu = styled.ul`
  position: absolute;
  top: 4rem;
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
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleHeaderButtonClick = () => {
    // 한번씩 누를 때 마다 상태를 바꿔줘야 하니까 
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {

    setIsLoggedIn(false);
  };

  return (
    <ThemeProvider theme={lightTheme}>
    <HeaderWrapper>
      <ToggleMode />
      <HeaderButton onClick={handleHeaderButtonClick} />
      {isDropdownOpen && (
        <DropdownMenu>
          {isLoggedIn ? (
            <>
              <DropdownMenuItem>My page</DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout}>Log out</DropdownMenuItem>
            </>
          ) : (
            <>
              <DropdownMenuItem>Log in</DropdownMenuItem>
              <DropdownMenuItem>Sign up</DropdownMenuItem>
            </>
          )}
        </DropdownMenu>
      )}
    </HeaderWrapper>
    </ThemeProvider>
  );
};

export default Header;
