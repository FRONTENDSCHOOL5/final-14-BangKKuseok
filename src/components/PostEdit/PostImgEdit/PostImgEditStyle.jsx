import styled from 'styled-components';

export const PostImgEditWrapper = styled.div`
  position: relative;
  & > img {
    border-radius: 10px;
    aspect-ratio: 1;
    z-index: 0;
    object-fit: cover;
    border: 1px solid ${({ theme }) => theme.colors.gray100};
  }
`;
