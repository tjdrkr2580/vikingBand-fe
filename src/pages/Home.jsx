import styled from "styled-components";
import NavBar from "../components/NavBar";
import { boxBorderRadius, boxShadow, pageMargin } from "../utils/styles/mixins";
import test from "../assets/test.jpg";

const HomeWrapper = styled.section`
  min-height: 77.5vh;
  min-width: 100vw;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  ${pageMargin}
`;

const PostLists = styled.ul`
  display: grid;
  max-width: 90rem;
  grid-template-columns: 1fr 1fr 1fr;
  place-items: center;
  margin: 0 auto;
  gap: 1.25rem;
`;

const PostList = styled.li`
  cursor: pointer;
  width: 25rem;
  height: 30rem;
  ${boxShadow}
  padding: 0.6rem;
  img {
    width: 100%;
    height: 40%;
    ${boxBorderRadius}
    object-fit: cover;
  }
  ${boxBorderRadius}
  transition: 0.25s transform;
  &:hover {
    transform: scale(0.98);
  }
`;

const PostForm = styled.div;

const Home = () => {
  const posts = [
    {
      id: 2,
      userId: 2,
      username: "teste2r",
      title: "영어공부",
      subject: "주제2",
      imageUrl: null,
      createdAt: "2023-02-24T04:02:51.191694",
      modifiedAt: "2023-02-24T04:02:51.191694",
    },
    {
      id: 2,
      userId: 2,
      username: "qqwe123",
      title: "부동산",
      subject: "주제2",
      imageUrl: null,
      createdAt: "2023-02-24T04:02:51.191694",
      modifiedAt: "2023-02-24T04:02:51.191694",
    },
    {
      id: 2,
      userId: 2,
      username: "vccvb123",
      title: "공인중개사",
      subject: "주제1",
      imageUrl: null,
      createdAt: "2023-02-24T04:02:51.191694",
      modifiedAt: "2023-02-24T04:02:51.191694",
    },
    {
      id: 2,
      userId: 2,
      username: "bvcvcsd123",
      title: "모각코",
      subject: "주제3",
      imageUrl: null,
      createdAt: "2023-02-24T04:02:51.191694",
      modifiedAt: "2023-02-24T04:02:51.191694",
    },
  ];
  return (
    <HomeWrapper>
      <NavBar />
      <PostLists>
        {posts.map((post, i) => (
          <PostList key={i}>
            <img src={test} alt={post.title} />
          </PostList>
        ))}
      </PostLists>
    </HomeWrapper>
  );
};
export default Home;
