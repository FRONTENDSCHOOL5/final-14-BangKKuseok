import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
from {
    opacity: 0;
}
to {
    opacity: 1;
}
`;
const fadeOut = keyframes`
from {
    opacity: 1;
}
to {
    opacity: 0;
}
`;

const slideUp = keyframes`
  from {
    transform: translateY(100%);
  }

  to {
    transform: translateY(0);
  }
`;

const slideDown = keyframes`
  from {
    transform: translateY(0);
  }

  to {
    transform: translateY(100%);
  }
`;

export const BottomSheetDim = styled.div`
  position: fixed;
  top: 0;
  width: clamp(390px, 100%, 720px);
  height: 100vh;
  margin: 0 auto;
  z-index: 50;
  background-color: rgba(0, 0, 0, 0.3);
  animation: ${(p) => (p.isShow ? fadeIn : fadeOut)} 0.3s ease-out;
  transition: background-color 0.3s ease-out;
`;

export const BottomSheetWrapper = styled.article`
  width: 100%;
  position: absolute;
  bottom: 0;
`;

export const ModalBox = styled.div`
  position: relative;
  bottom: 0;
  z-index: 51;
  border-radius: 20px 20px 0 0;
  padding-top: 48px;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.white};
  animation: ${(p) => (p.isShow ? slideUp : slideDown)} 0.3s ease-out;
`;

export const ModalHandle = styled.button`
  width: 100%;
  height: 48px;
  position: absolute;
  top: 0;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 50px;
    height: 4px;
    background-color: ${({ theme }) => theme.colors.gray100};
  }
`;
