import styled, { css } from 'styled-components';

// 태그 위치에 따른 Y축 위치
const bubbleYPosition = css`
  ${({ bubbleLoc }) =>
    bubbleLoc.bubbleUp
      ? css`
          bottom: 36px;
        `
      : css`
          top: 36px;
        `};
`;

export const ProductBubbleWrapper = styled.div`
  box-shadow: 4px 3px 25px rgba(29, 29, 29, 0.15);
  position: absolute;
  z-index: 1;
  left: ${({ bubbleLoc }) => bubbleLoc.x + 'px'};
  ${bubbleYPosition}
`;

// 태그 위치에 따른 말꼬리 위치
const edgePosition = css`
  ${({ bubbleLoc }) =>
    bubbleLoc.bubbleUp
      ? css`
          top: 98%;
        `
      : css`
          top: -9px;
          transform: rotate(180deg);
        `};
`;

export const ProductBubbleBox = styled.div`
  position: relative;
  padding: 6px 8px;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 12px;
  display: flex;
  gap: 8px;
  align-items: center;
  width: 208px;
  cursor: ${({ type }) => type === 'postDetail' && 'pointer'};

  img:first-child {
    width: 56px;
    aspect-ratio: 1;
    object-fit: cover;
    border-radius: 8px;
  }
  img:last-child {
    width: 24px;
  }
  &::after {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    border-top: 10px solid white;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    transform: translateX(-50%);
    left: ${({ bubbleLoc }) => bubbleLoc.edgeLeft + '%'};
    ${edgePosition}
  }
`;

export const ProductInfoBox = styled.div`
  min-width: 96px;
  padding-left: 2px;
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
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
`;
