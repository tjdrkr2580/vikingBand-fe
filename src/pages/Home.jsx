import styled from "styled-components";
import NavBar from "../components/NavBar";
import {
  boxBorderRadius,
  elipsis,
  flexCenter,
  fontMedium,
  pageMargin,
} from "../utils/styles/mixins";
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
  @media (max-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }
  @media (max-width: 580px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  place-items: center;
  margin: 0 auto;
  gap: 1.25rem;
`;

const PostList = styled.li`
  cursor: pointer;
  width: 25rem;
  height: 30rem;
  padding: 0.6rem;
  img {
    width: 100%;
    height: 45%;
    ${boxBorderRadius}
    object-fit: cover;
  }

  ${boxBorderRadius}
  transition: 0.25s transform;
  &:hover {
    transform: scale(0.98);
  }
  box-shadow: ${(props) => props.theme.shadow};
`;

const PostForm = styled.section`
  padding: 0.6rem;
  .title {
    ${fontMedium}
  }
  .subject {
    color: #d1d6e6;
    max-width: 5rem;
    padding: 0.4rem 0.6rem;
    background-color: ${(props) => props.theme.primary};
    ${flexCenter};
    ${boxBorderRadius};
    font-size: 1.1rem;
  }
  .desc {
    font-size: 1.05rem;
    width: 100%;
    ${elipsis}
  }
  .date {
    font-size: 1.1rem;
    font-weight: 500;
  }
  .author {
    margin-top: 1.5rem;
    font-size: 1.1rem;
    display: flex;
    font-weight: 500;
    justify-content: flex-end;
  }
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const Home = () => {
  const posts = [
    {
      id: 2,
      userId: 2,
      author: "teste2r",
      title: "영어공부",
      subject: "주제2",
      imageUrl: null,
      createdAt: "2023-02-24T04:02:51.191694",
      modifiedAt: "2023-02-24T04:02:51.191694",
    },
    {
      id: 2,
      userId: 2,
      author: "qqwe123",
      title: "부동산",
      subject: "주제2",
      imageUrl: null,
      createdAt: "2023-02-24T04:02:51.191694",
      modifiedAt: "2023-02-24T04:02:51.191694",
    },
    {
      id: 2,
      userId: 2,
      author: "vccvb123",
      title: "공인중개사",
      subject: "주제1",
      imageUrl: null,
      createdAt: "2023-02-24T04:02:51.191694",
      modifiedAt: "2023-02-24T04:02:51.191694",
    },
    {
      id: 2,
      userId: 2,
      author: "bvcvcsd123",
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
            <PostForm>
              <h1 className="title">{post.title}</h1>
              <span className="subject">{post.subject}</span>
              <p className="desc">
                ㅇ장ㅈ마ㅐㅁ제ㅐㅈ마ㅐㅔㅇㅈ마ㅐㅔㅁㅇ자ㅔㅐㅁㅇ제ㅏㅐㅈㅁ아매ㅔㅈㅇㅁ재ㅏㅔ
              </p>
              <p className="date">
                {new Date(post.createdAt).toLocaleString()}
              </p>
              <span className="author">작성자 : {post.author}</span>
            </PostForm>
          </PostList>
        ))}
      </PostLists>
    </HomeWrapper>
  );
};
export default Home;
