import styled from 'styled-components';

export const FollowerWrapper = styled.section`
  padding: 16px;

  button {
    width: 68px;
  }
`;

export const FollowerList = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 16px;
`;

export const FollowItem = styled.li`
  & > div > div {
    width: calc(100% - 78px);
  }
`;
