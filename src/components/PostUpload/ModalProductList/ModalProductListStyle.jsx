import styled from 'styled-components';

export const ModalProductListWrapper = styled.ul`
  text-align: center;
  & > h2 {
    color: ${({ theme }) => theme.colors.gray200};
    font-size: ${({ theme }) => theme.fontSize.base};
    font-weight: 400;
    margin: 24px 0 26px;
  }
  & > button {
    font-weight: 500;
  }
`;
