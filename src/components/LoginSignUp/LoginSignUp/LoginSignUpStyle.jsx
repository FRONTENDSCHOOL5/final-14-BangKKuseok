import styled from 'styled-components';

export const LoginSignUpWrapper = styled.form`
  box-shadow: rgba(105, 80, 80, 0.08) 0px -3px 20px;
  width: clamp(390px, 100%, 720px);
  min-height: calc(var(--vh, 1vh) * 100);
  margin: 0 auto;
  background-color: ${({ theme }) => theme.colors.white};
  position: relative;
`;

export const LoginSignUpLogo = styled.h1`
  font-size: ${({ theme }) => theme.fontSize.lg};
  text-align: center;
  padding-top: 55px;
  margin-bottom: 40px;
`;
export const BottomBox = styled.div`
  display: flex;
  flex-direction: column;

  & > :first-child {
    margin: 8px auto 0;
  }
`;

export const LinkWrapper = styled.span`
  margin: 24px auto 0;
  border: none;
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.gray300};

  & > *:not(:last-child)::after {
    content: ' | ';
  }
`;
