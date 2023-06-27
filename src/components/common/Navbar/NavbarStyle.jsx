import styled, { css } from 'styled-components';
import { ReactComponent as HomeIcon } from '../../../assets/icons/icon-home.svg';
import { ReactComponent as FeedIcon } from '../../../assets/icons/icon-feed.svg';
import { ReactComponent as ChatIcon } from '../../../assets/icons/icon-message.svg';
import { ReactComponent as UserIcon } from '../../../assets/icons/icon-user.svg';

export const NavbarWrapper = styled.nav`
  width: clamp(390px, 100%, 720px);
  position: fixed;
  bottom: 0;
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: 0 -3px 20px rgba(105, 80, 80, 0.08);
`;

export const NavbarList = styled.ul`
  display: flex;

  li {
    flex-grow: 1;
    text-align: center;
    margin-bottom: 8px;
  }

  li a {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 7px 0;
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
    props.pathname === '/profile'
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
