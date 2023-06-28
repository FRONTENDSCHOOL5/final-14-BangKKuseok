import styled, { keyframes } from 'styled-components';

const pop = keyframes`
  from {
    transform: scale(0.2);
  }
  to {
    transform: scale(1);
  }
`;
export const WelcomeWrapper = styled.div`
  margin: 0 auto;
  width: clamp(390px, 100%, 720px);
  height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.white};

  div {
    position: relative;
  }
  img {
    position: absolute;
    top: 200px;
    left: 28%;
    width: 135px;
    aspect-ratio: 1;
    z-index: 0;
    animation: ${pop} 0.3s ease-in-out forwards;
  }
`;
export const Confetti = styled.div`
  width: 300px;
  height: 300px;
  margin: 50px 0 30px;
`;

export const Headerh2 = styled.h2`
  text-align: center;
  line-height: 1.5;
  font-size: ${({ theme }) => theme.fontSize.lg};
  color: ${({ theme }) => theme.colors.gray400};
  font-weight: 500;
  margin-bottom: 38px;
`;
