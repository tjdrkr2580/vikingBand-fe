import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        font-size: 10px;
        box-sizing: border-box;
        text-decoration: none;
        transition: 0.25s filter, 0.25s background-color;
        list-style: none;
        font-family: Pretendard;
    }

    body {
        overflow-x: hidden;
    }

    input {
        &:focus {
            outline: none;
        }
    }
`;

export default GlobalStyle;
