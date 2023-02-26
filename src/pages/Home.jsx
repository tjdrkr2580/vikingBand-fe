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
import { useRecoilValue } from "recoil";
import { isModalState } from "../utils/recoil/atoms";
import Login from "../components/Login";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { getStudies } from "../utils/axios/axios";
import { AiFillHeart } from "react-icons/ai";

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
    width: fit-content;
    padding: 0.4rem 0.6rem;
    background-color: ${(props) => props.theme.primary};
    ${boxBorderRadius};
    font-size: 1.05rem;
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
  .post-bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 1rem;
    .author {
      font-size: 1.2rem;
      display: flex;
      font-weight: 500;
      justify-content: flex-end;
    }
  }

  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const Home = () => {
  const visible = useRecoilValue(isModalState);
  const navigate = useNavigate();

  const navigateToPost = (postId) => {
    navigate(`/post/${postId}`);
  };

  const { isLoading, data } = useQuery("studies", getStudies);
  return (
    <HomeWrapper>
      <NavBar />
      <PostLists>
        {isLoading === false &&
          data.data.data.map((post, i) => (
            <PostList
              key={i}
              onClick={() => {
                navigateToPost(post.id);
              }}
            >
              <img src={test} alt={post.title} />
              <PostForm>
                <h1 className="title">{post.title}</h1>
                <span className="subject">{post.subject}</span>
                <p className="desc">{post.content}</p>
                <p className="date">
                  {new Date(post.createdAt).toLocaleString()}
                </p>
                <section className="post-bottom">
                  <AiFillHeart size={22} />
                  <span className="author">
                    작성자 : {post.author.memberName}
                  </span>
                </section>
              </PostForm>
            </PostList>
          ))}
      </PostLists>
      {visible === true && <Login />}
    </HomeWrapper>
  );
};
export default Home;
