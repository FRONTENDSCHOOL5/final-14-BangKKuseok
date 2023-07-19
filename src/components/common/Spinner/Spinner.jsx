import React from 'react';
import { ReactComponent as SpinnerIcon } from '../../../assets/icons/icon-spinner.svg';
import styled, { keyframes } from 'styled-components';

const dash = keyframes`
  0% { stroke-dashoffset: 187; }
  50% {
    stroke-dashoffset: 46.75;
    transform:rotate(135deg);
  }
  100% {
    stroke-dashoffset: 187;
    transform:rotate(450deg);
  }
`;

const rotator = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(270deg); }

`;
const StyledSpinner = styled.div`
  height: ${(p) => (p.type === 'carousel' ? '404px' : '100vh')};
  margin-top: ${(p) => (p.type === 'carousel' ? '-60px' : '0')};
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    animation: ${rotator} 1s linear infinite;
  }

  circle {
    stroke: ${({ theme }) => theme.colors.gray100};
    stroke-dasharray: 187;
    stroke-dashoffset: 0;
    transform-origin: center;
    animation: ${dash} 1s ease-in-out infinite;
  }
`;
export default function Spinner({ type }) {
  return (
    <StyledSpinner type={type}>
      <SpinnerIcon />
    </StyledSpinner>
  );
}
