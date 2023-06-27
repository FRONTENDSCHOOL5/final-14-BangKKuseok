import styled from 'styled-components';

export const MainPageWrapper = styled.main`
  width: clamp(390px, 100%, 720px);
  height: 100vh;
  margin: 0 auto;
  background-color: ${({ theme }) => theme.colors.subCoral};
  text-align: center;
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const WhiteLogoImg = styled.img`
  display: inline-block;
  width: 187px;
  max-width: calc(100% - 102px);
  margin: 15vh auto -1vh;
  @media screen and (max-width: 500px) {
    margin: 15vh auto 16vw;
  }
  @media screen and (min-height: 812px) {
    margin: 15vh auto 15vh;
  }
`;

export const CanvasBox = styled.div`
  margin: 0 auto;
  width: 50%;
  min-width: 150px;
  aspect-ratio: 1;
  & > div {
    z-index: 1;
  }
  canvas {
    filter: saturate(1.5);
    width: 100%;
  }
`;

export const BackgroundImg = styled.img`
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
  width: 40%;
  min-width: 200px;
  height: 490px;
  min-height: 50vh;
  @media screen and (max-width: 500px) {
    height: 60vh;
  }
  @media screen and (min-height: 812px) {
    width: 50%;
  }
`;

export const BottomSection = styled.section`
  border-radius: 20px 20px 0 0;
  background-color: ${({ theme }) => theme.colors.white};
  padding: 4vh 0;
  position: absolute;
  width: 100%;
  bottom: 0;
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
