import styled from 'styled-components';

export const PostPageWrapper = styled.div`
  article {
    padding: 0 16px 14px;
  }
`;

export const CommentList = styled.ul`
  padding: 16px 16px 78px;
  border-top: 1px solid ${({ theme }) => theme.colors.gray100};
`;
