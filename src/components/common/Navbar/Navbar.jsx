import React from 'react';
import {
  NavbarWrapper,
  NavbarList,
  StyledHomeIcon,
  StyledFeedIcon,
  StyledChatIcon,
  StyledUserIcon,
  NavbarLabel,
} from './NavbarStyle';
import { Link, useLocation } from 'react-router-dom';
import { ReactComponent as UploadIcon } from '../../../assets/icons/icon-upload.svg';

export default function Navbar() {
  const { pathname } = useLocation();
  return (
    <NavbarWrapper>
      <NavbarList>
        <li>
          <Link to='/home'>
            <StyledHomeIcon pathname={pathname} />
            <NavbarLabel active={pathname === '/home'}>홈</NavbarLabel>
          </Link>
        </li>
        <li>
          <Link to='/feed'>
            <StyledFeedIcon pathname={pathname} />
            <NavbarLabel active={pathname === '/feed'}>피드</NavbarLabel>
          </Link>
        </li>
        <li>
          <Link to='/post/upload'>
            <UploadIcon />
            <NavbarLabel>게시글 작성</NavbarLabel>
          </Link>
        </li>
        <li>
          <Link to='/chat'>
            <StyledChatIcon pathname={pathname} />
            <NavbarLabel active={pathname === '/chat'}>채팅</NavbarLabel>
          </Link>
        </li>
        <li>
          <Link to='/profile'>
            <StyledUserIcon pathname={pathname} />
            <NavbarLabel active={pathname === '/profile'}>프로필</NavbarLabel>
          </Link>
        </li>
      </NavbarList>
    </NavbarWrapper>
  );
}
