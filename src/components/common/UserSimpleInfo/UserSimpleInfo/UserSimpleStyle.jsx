import styled, { css } from 'styled-components';

const UserSimpleInfoWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  button {
    flex-shrink: 0;
  }
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
    flex-shrink: 0;
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
  width: calc(100% - 100px);
  min-width: 228px;
`;

const UserName = styled.span`
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: 500;
  margin-bottom: 6px;

  .highlight {
    color: ${({ theme }) => theme.colors.mainCoral};
    font-weight: 600;
  }
`;

const AccountName = styled.span`
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: 400;
  color: ${({ theme }) => theme.colors.gray300};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export { UserSimpleInfoWrapper, UserInfoBox, UserNameBox, UserName, AccountName };
