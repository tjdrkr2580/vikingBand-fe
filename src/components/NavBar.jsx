import React, { useState } from "react";
import styled from "styled-components";
import { flexCenter } from "../utils/styles/mixins";

const NavElement = styled.li`
  ${flexCenter};
  padding: 0.4rem 0.6rem;
  border-bottom: 0.3rem solid transparent;
  .filterText {
    font-size: 1.5rem;
    color: ${(props) => props.theme.textColor1};
  }
`;

const NavActiveElement = styled.li`
  cursor: pointer;
  ${flexCenter};
  padding: 0.4rem 0.6rem;
  border-bottom: 0.3rem solid ${(props) => props.theme.primary};
  .filterText {
    font-size: 1.5rem;
  }
`;

const NavBarWrapper = styled.ul`
  cursor: pointer;
  display: flex;
  width: 100vw;
  padding-left: 3rem;
  gap: 1.2rem;
  margin-bottom: 2rem;
`;

const NavBar = () => {
  const [selectFilter, setSelectFilter] = useState("최신 순");
  const filters = ["최신 순", "좋아요 순"];
  const onFilter = async (filter) => {
    setSelectFilter(filter);
  };
  return (
    <NavBarWrapper>
      {filters.map((filter) =>
        filter === selectFilter ? (
          <NavActiveElement key={filter}>
            <span className="filterText">{filter}</span>
          </NavActiveElement>
        ) : (
          <NavElement onClick={() => onFilter(filter)} key={filter}>
            <span className="filterText">{filter}</span>
          </NavElement>
        )
      )}
    </NavBarWrapper>
  );
};

export default NavBar;
