import styled from "styled-components";
import { pageMargin } from "../utils/styles/mixins";

const HomeWrapper = styled.section`
  ${pageMargin}
`;

const Home = () => {
  return <HomeWrapper>Home</HomeWrapper>;
};
export default Home;
