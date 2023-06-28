import styled from 'styled-components';

export const SignUpHeader = styled.div`
  width: clamp(390px, 100%, 720px);
  min-height: 100vh;
  margin: 0 auto;
  position: relative;
  background-color: ${({ theme }) => theme.colors.white};
  position: relative;
`;

export const SignUpLogo = styled.h1`
  font-size: ${({ theme }) => theme.fontSize.lg};
  text-align: center;
  padding-top: 55px;
  margin-bottom: 40px;
`;

export const SignUpBottomBox = styled.div`
  display: flex;
  flex-direction: column;

  & > :first-child {
    margin: 8px auto 0;
  }
`;

export const SignUpGoBack = styled.span`
  margin: 24px auto 0;
  border: none;
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.gray300};

  & > *:not(:last-child)::after {
    content: ' | ';
  }
`;
