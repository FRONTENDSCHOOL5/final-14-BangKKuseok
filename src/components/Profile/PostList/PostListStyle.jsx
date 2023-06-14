import styled from 'styled-components';

const PostListWrapper = styled.section`
  padding: 0 16px;
`;

const PostCardList = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;

  li article {
    width: 100%;
    margin: 0 auto;
  }
`;

export { PostListWrapper, PostCardList };
