import styled from 'styled-components';

export const ModalProductItemWrapper = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
  text-align: left;
  &:nth-last-of-type(1) {
    margin-bottom: 34px;
  }

  img {
    width: 70px;
    aspect-ratio: 1;
    object-fit: cover;
    border-radius: 9px;
  }
`;
export const ProductInfoBox = styled.div`
  display: inline-block;
  max-width: 213px;
  vertical-align: middle;
  margin-left: 8px;
  h3 {
    color: ${({ theme }) => theme.colors.black};
    font-size: ${({ theme }) => theme.fontSize.sm};
    font-weight: 500;
    margin-bottom: 0.7rem;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  p {
    color: ${({ theme }) => theme.colors.mainCoral};
    font-size: ${({ theme }) => theme.fontSize.xs};
    font-weight: 700;
  }
`;
