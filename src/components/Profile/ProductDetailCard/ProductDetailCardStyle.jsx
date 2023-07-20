import styled from 'styled-components';

export const ProductDetailCardWrapper = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 18px;

  @media (min-width: 500px) {
    display: grid;
    grid-template: repeat(2, 1fr) / repeat(2, 1fr);
  }
`;

export const ProductImageWrapper = styled.div`
  width: 100%;
  height: 293px;
  border-radius: 10px;
  overflow: hidden;

  img {
    width: 100%;
    aspect-ratio: 358 / 293;
    object-fit: cover;
  }

  @media (min-width: 500px) {
    grid-row: 1 / 3;
    height: auto;

    img {
      aspect-ratio: 1 / 1;
    }
  }
`;

export const ProductInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  @media (min-width: 500px) {
    padding-top: 14px;
    max-width: calc(100% - 55px);
  }
`;

export const ProductName = styled.span`
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: 500;
`;

export const ProductPrice = styled.span`
  font-size: ${({ theme }) => theme.fontSize.base};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.mainCoral};
`;

export const ProductKeyword = styled.span`
  padding: 0.8rem 1.2rem;
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.gray400};
  border: 1.4px solid currentColor;
  border-radius: 20px;
  position: absolute;
  right: 16px;
`;

export const ProductActionWrapper = styled.div`
  button:nth-child(1) {
    width: 100%;
    margin-bottom: 10px;
  }

  button:nth-child(n + 2) {
    min-width: calc(50% - 4px);
  }

  button:nth-child(2) {
    margin-right: 8px;
  }

  @media (min-width: 500px) {
    align-self: end;

    button:nth-child(1) {
      min-width: 100%;
    }
  }
`;
