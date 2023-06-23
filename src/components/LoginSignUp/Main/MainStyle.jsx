import styled from 'styled-components';

export const MainPageWrapper = styled.main`
  width: clamp(390px, 100%, 720px);
  min-height: 100vh;
  margin: 0 auto;
  background-color: ${({ theme }) => theme.colors.mainCoral};
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

export const WhiteLogoImg = styled.img`
  object-fit: cover;
  width: 187px;

  margin: 223px auto 200px;
`;

export const BottomBox = styled.section`
  height: 362px;
  border-radius: 20px 20px 0 0;
  background-color: ${({ theme }) => theme.colors.white};
  display: flex;
  flex-direction: column;
`;
export const BtnBox = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 50px;
`;

export const AccountSignUpBox = styled.span`
  border: none;
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.gray300};
  margin-top: 2px;

  & > *:not(:last-child)::after {
    content: ' | ';
  }
`;
