import styled, { css } from 'styled-components';

const UserSimpleInfoWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const UserInfoBox = styled.div`
  width: 100%;
  ${(p) =>
    p.isLink
      ? css`
          a {
            display: flex;
            align-items: center;
          }
        `
      : css`
          display: flex;
          align-items: center;
        `};

  img {
    width: 50px;
    height: 50px;
    object-fit: cover;
    border-radius: 50%;
    margin-right: 12px;
  }
`;

const UserNameBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserName = styled.span`
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: 500;
  margin-bottom: 6px;
`;

const AccountName = styled.span`
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: 400;
  color: ${({ theme }) => theme.colors.gray300};
`;

export { UserSimpleInfoWrapper, UserInfoBox, UserNameBox, UserName, AccountName };
