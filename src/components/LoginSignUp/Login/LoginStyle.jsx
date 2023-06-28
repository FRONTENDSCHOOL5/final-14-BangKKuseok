import styled from 'styled-components';

export const LoginHeader = styled.header`
  width: clamp(390px, 100%, 720px);
  min-height: 100vh;
  margin: 0 auto;
  position: relative;
  background-color: ${({ theme }) => theme.colors.white};
  position: relative;
`;

export const LoginLogo = styled.h1`
  font-size: ${({ theme }) => theme.fontSize.lg};
  text-align: center;
  padding-top: 55px;
  margin-bottom: 40px;
`;

export const LoginBottomBox = styled.div`
  display: flex;
  flex-direction: column;

  & > :first-child {
    margin: 8px auto 0;
  }
`;

export const LoginGoBack = styled.span`
  margin: 24px auto 0;
  border: none;
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.gray300};

  & > *:not(:last-child)::after {
    content: ' | ';
  }
`;
