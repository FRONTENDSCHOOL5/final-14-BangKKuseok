import styled from 'styled-components';

const PostListWrapper = styled.section`
  padding: 0 16px 10px 16px;
`;

const PostCardList = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;

  li article {
    margin-top: 1rem;
  }
`;

export { PostListWrapper, PostCardList };
