import styled from "styled-components";
import NavBar from "../components/NavBar";
import { pageMargin } from "../utils/styles/mixins";

const HomeWrapper = styled.section`
  ${pageMargin}
`;

const Home = () => {
  return (
    <HomeWrapper>
      <NavBar />
    </HomeWrapper>
  );
};
export default Home;
