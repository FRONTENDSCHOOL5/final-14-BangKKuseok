import styled, { keyframes } from 'styled-components';

const fadeOut = keyframes`
  from {
    background-color: transparent;
  }
  to {
    background-color: #f15846;
  }
`;

export const SplashPageWrapper = styled.div`
  width: clamp(390px, 100%, 720px);
  height: 100vh;
  position: relative;
  margin: auto;

  ul {
    display: flex;
    height: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 50vh;
  }

  div {
    top: 0;
    z-index: 30;
    position: absolute;
    width: 100%;
    height: calc(100% - 362px);
    animation: ${fadeOut} 0.4s 2.4s;
  }
`;

const pop = keyframes`
  from {
    transform: translate(-50%, -50%) scale(0.2);
  }
  to {
    transform: translate(-50%, -50%) scale(1);
  }
`;

export const StyledLogo = styled.img`
  width: clamp(187px, 20%, 374px);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: ${pop} 0.5s 0.1s cubic-bezier(0.17, 0.67, 0.62, 1.27) forwards;
`;

const flow = keyframes`
  0% {
    background-position: 0px;
  }
  100% {
    background-position: 341px;
  }
`;

export const RailImg = styled.li`
  height: 100px;
  width: 100%;
  background: url(${({ furnituresImg }) => furnituresImg}) repeat-x 0 / contain;
  animation: ${flow} 3.5s infinite linear;
  &:first-child {
    animation: ${flow} 3.5s infinite linear reverse;
  }
`;
