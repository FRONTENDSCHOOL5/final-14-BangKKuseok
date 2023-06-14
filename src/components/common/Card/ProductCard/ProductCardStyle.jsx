import styled from 'styled-components';

const ProductCardWrapper = styled.article`
  width: 164px;
  height: 204px;
  box-shadow: 0px 2px 30px rgba(67, 67, 67, 0.12);
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  margin-right: 12px;
  cursor: pointer;

  img {
    width: 164px;
    aspect-ratio: 164 / 140;
    object-fit: cover;
  }
`;

const ProductInfoBox = styled.div`
  padding: 1.4rem;

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
    font-weight: 600;
  }
`;

const Keyword = styled.span`
  position: absolute;
    inset: 8px 8px auto auto;
    padding: 0.7rem 0.8rem;
    background: ${({ theme }) => theme.colors.white50};
    backdrop-filter: blur(2px);
    border-radius: 20px;

    color: ${({ theme }) => theme.colors.gray400};
    font-size: ${({ theme }) => theme.fontSize.xs};
`
export { ProductCardWrapper, ProductInfoBox, Keyword}
