import styled from 'styled-components';

export const UserProfileWrapper = styled.div`
  width: clamp(390px, 100%, 720px);
  min-height: 100vh;
  margin: 0 auto;
  position: relative;
  background-color: ${({ theme }) => theme.colors.white};
  position: relative;
`;
export const UserProfileHeader = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
`;

export const ProfileMainTitle = styled.h1`
  font-size: ${({ theme }) => theme.fontSize.lg};
  text-align: center;
  margin-top: 55px;
  margin-bottom: 12px;
`;

export const ProfileSubTitle = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.gray300};
  text-align: center;
`;

export const UserProfileBottom = styled.div`
  display: flex;
  flex-direction: column;
  & > :first-child {
    margin: 8px auto 0;
  }
`;
export const IsAlreadyUser = styled.button`
  margin-top: 24px;
  border: none;
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.gray300};
`;
