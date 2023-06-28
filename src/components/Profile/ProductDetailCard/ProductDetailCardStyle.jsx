import styled from 'styled-components';

export const ProductDetailCardWrapper = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 18px;
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
`;

export const ProductInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
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
`;
