import styled from 'styled-components';

export const PostTextEditWrapper = styled.div`
  textarea {
    width: 100%;
    resize: none;
    line-height: 160%;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.black};
    font-size: ${({ theme }) => theme.fontSize.base};
    &::placeholder {
      color: ${({ theme }) => theme.colors.gray200};
    }
  }
`;
