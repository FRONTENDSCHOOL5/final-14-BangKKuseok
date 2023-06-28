import styled from 'styled-components';

export const NoneFeedWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 58px);
  flex-direction: column;

  img {
    width: 187px;
  }

  p {
    font-size: ${({ theme }) => theme.fontSize.base};
    color: ${({ theme }) => theme.colors.gray200};
    margin: 18px 0 30px;
  }
`;

export const FeedPageWrapper = styled.div`
  margin-top: 64px;
`;
