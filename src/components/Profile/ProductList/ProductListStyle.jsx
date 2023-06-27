import styled from 'styled-components';

const ProductListWrapper = styled.section`
  h2 {
    font-weight: 700;
    font-size: ${({ theme }) => theme.fontSize.base};
  }
  margin-top: 21px;
  padding-left: 16px;
`;

const ProductCardList = styled.ul`
  padding: 15px 0 26px 0;
  display: flex;
  overflow-x: scroll;

  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export { ProductListWrapper, ProductCardList };
