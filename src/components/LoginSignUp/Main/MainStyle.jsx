import styled from 'styled-components';

export const MainPageWrapper = styled.main`
  width: clamp(390px, 100%, 720px);
  height: 100vh;
  margin: 0 auto;
  background-color: ${({ theme }) => theme.colors.subCoral};
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const WhiteLogoImg = styled.img`
  width: 187px;
  max-width: calc(100% - 102px);
  margin: 107px auto 0;
  display: inline-block;
`;

export const CanvasBox = styled.div`
  position: relative;
  margin: 0 auto;
  width: 170px;
  min-width: 150px;
  aspect-ratio: 1;
  & > div {
    z-index: 1;
  }
  canvas {
    filter: saturate(1.5);
  }
  img {
    position: absolute;
    top: -8px;
    left: -8px;
    width: 202px;
    min-width: 182px;
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
