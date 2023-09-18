import styled from 'styled-components';

export const NoneFeedWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: calc(100vh - 58px);

  @media screen and (hover: none) and (pointer: coarse) {
    height: calc((var(--vh, 1vh) * 100) - 58px);
  }

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
