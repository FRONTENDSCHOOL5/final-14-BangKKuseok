import styled, { css, keyframes } from 'styled-components';

const loading = keyframes`
  0% {
    transform: translateX(0);
  }
  50%,
  100% {
    transform: translateX(480px);
  }
  `;

const moveItem = css`
  overflow: hidden;
  position: relative;
  background-color: ${({ theme }) => theme.colors.gray50};
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 30px;
    height: 100%;
    background: linear-gradient(to right, #eeeeeefd 30%, #dddddd 30%, #eeeeeefd 30%);
    opacity: 0.8;
    animation: ${css`
        ${loading}`} 2s infinite linear;
  }
`;

export const SkeletonWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;

export const SkeletonUserImg = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  flex-shrink: 0;
  ${moveItem}
`;

export const SkeletonBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-left: 12px;
`;

export const SkeletonUserName = styled.div`
  display: block;
  width: 60%;
  height: 17px;
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: 500;
  margin-bottom: 6px;
  ${moveItem}
`;

export const SkeletonAccountName = styled.div`
  display: block;
  width: 50%;
  height: 14px;
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: 400;
  color: ${({ theme }) => theme.colors.gray300};
  ${moveItem}
`;
