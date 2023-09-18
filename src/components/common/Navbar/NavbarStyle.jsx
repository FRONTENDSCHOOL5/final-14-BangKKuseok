import styled, { css } from 'styled-components';
import { ReactComponent as HomeIcon } from '../../../assets/icons/icon-home.svg';
import { ReactComponent as FeedIcon } from '../../../assets/icons/icon-feed.svg';
import { ReactComponent as ChatIcon } from '../../../assets/icons/icon-message.svg';
import { ReactComponent as UserIcon } from '../../../assets/icons/icon-user.svg';

export const NavbarWrapper = styled.nav`
  width: clamp(390px, 100%, 720px);
  position: fixed;
  z-index: 10;
  bottom: 0;
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: 0 -3px 20px rgba(105, 80, 80, 0.08);
`;

export const NavbarList = styled.ul`
  display: flex;

  li {
    flex-grow: 1;
    text-align: center;
    margin-bottom: 6px;
  }

  li:nth-child(3) {
    margin-top: -26px;
  }

  li a {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 10px 0;
  }
`;

export const StyledHomeIcon = styled(HomeIcon)`
  ${(props) =>
    props.pathname === '/home'
      ? css`
          path {
            stroke: ${(props) => props.theme.colors.mainCoral};
          }
          path:nth-child(1) {
            fill: ${(props) => props.theme.colors.mainCoral};
          }
          path:nth-child(2) {
            stroke-width: 1px;
            fill: ${(props) => props.theme.colors.white};
          }
        `
      : HomeIcon}
`;

export const StyledFeedIcon = styled(FeedIcon)`
  ${(props) =>
    props.pathname === '/feed'
      ? css`
          path {
            fill: ${(props) => props.theme.colors.mainCoral};
          }
        `
      : FeedIcon}
`;

export const StyledChatIcon = styled(ChatIcon)`
  ${(props) =>
    props.pathname === '/chat'
      ? css`
          path {
            stroke: ${(props) => props.theme.colors.mainCoral};
            fill: ${(props) => props.theme.colors.mainCoral};
          }
        `
      : ChatIcon}
`;

export const StyledUserIcon = styled(UserIcon)`
  ${(props) =>
    props.pathname.includes('/profile')
      ? css`
          path {
            stroke: ${(props) => props.theme.colors.mainCoral};
            fill: ${(props) => props.theme.colors.mainCoral};
          }
          path:nth-child(1) {
            stroke: ${(props) => props.theme.colors.mainCoral};
          }
          path:nth-child(2) {
            stroke: ${(props) => props.theme.colors.mainCoral};
            fill: ${(props) => props.theme.colors.mainCoral};
          }
        `
      : UserIcon}
`;

export const NavbarLabel = styled.span`
  font-size: ${({ theme }) => theme.fontSize.xs};
  margin-top: 6px;
  color: ${({ theme }) => theme.colors.gray300};

  ${(props) =>
    props.active &&
    css`
      color: ${({ theme }) => theme.colors.mainCoral};
    `}
`;
