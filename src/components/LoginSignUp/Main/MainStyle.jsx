import styled, { keyframes } from 'styled-components';

export const MainPageWrapper = styled.main`
  position: relative;
  width: clamp(390px, 100%, 720px);
  box-shadow: rgba(105, 80, 80, 0.08) 0px -3px 20px;
  height: 100vh;
  margin: 0 auto;
  background-color: ${({ theme }) => theme.colors.subCoral};
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const WhiteLogoImg = styled.img`
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
  width: 187px;
  max-width: calc(100% - 102px);
  margin: 15vh auto 0;
`;

const rustle = keyframes`
from{
  transform: translate(-50%, -50%) rotate(-35deg);
}
to{
  transform: translate(-50%, -50%) rotate(35deg);
}
`;

export const CanvasBox = styled.div`
  position: relative;
  margin: 0 auto;
  background: url(${({ spotLightImg }) => spotLightImg}) no-repeat center / contain;
  width: 48%;
  height: 64vh;
  background-size: 90% 90%;

  @media screen and (max-width: 570px) {
    width: 56%;
    background-size: 100% 90%;
  }

  @media screen and (max-height: 811px) {
    height: calc(90vh - 191px);
  }

  & > div {
    position: absolute;
    width: 100%;
    bottom: 0;
    aspect-ratio: 1;
    z-index: 1;

    &::after {
      content: '';
      display: ${({ isRotate }) => !isRotate && 'none'};
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 18%;
      aspect-ratio: 1;
      background: url(${({ rotateImg }) => rotateImg}) no-repeat center / contain;
      animation: ${rustle} 0.55s infinite alternate linear;
    }
  }

  canvas {
    filter: saturate(1.5);
  }
`;

export const BottomSection = styled.section`
  border-radius: 20px 20px 0 0;
  background-color: ${({ theme }) => theme.colors.white};
  padding: 4vh 0;
`;

export const BtnBox = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;
  gap: 10px;
`;

export const AccountSignUpBox = styled.span`
  border: none;
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.gray300};
  margin-top: 2px;

  & > *:first-child::after {
    content: ' | ';
  }
`;
