import styled from 'styled-components';

const ProfileCardWrapper = styled.section`
  width: 100%;
  padding-bottom: 18px;
  background-image: linear-gradient(
    ${({ theme }) => theme.colors.subCoral} 72px,
    ${({ theme }) => theme.colors.white} 72px
  );
`;

const FollowFollowingBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  max-width: 281px;
  margin: 0 auto;
  padding-top: 3px;
`;

const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 6px;
  padding-top: 14px;
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSize.xs};
  cursor: pointer;

  strong {
    font-weight: 700;
    font-size: ${({ theme }) => theme.fontSize.md};
  }
`;

const ProfileImgBox = styled.div`
  width: 110px;
  height: 110px;
  border-radius: 50%;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.white};

  img {
    object-fit: cover;
  }
`;

const UserInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  margin-top: 10px;
`;

const UserName = styled.span`
  font-weight: 700;
  font-size: ${({ theme }) => theme.fontSize.base};
  margin-bottom: 6px;
`;

const AccountName = styled.span`
  font-size: ${({ theme }) => theme.fontSize.xs};
  margin-bottom: 12px;
`;

const Intro = styled.span`
  font-size: ${({ theme }) => theme.fontSize.sm};
`;

const UserActionBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
  margin-top: 16px;
`;

export {
  ProfileCardWrapper,
  FollowFollowingBox,
  TextBox,
  ProfileImgBox,
  UserInfoBox,
  UserName,
  AccountName,
  Intro,
  UserActionBox,
};
