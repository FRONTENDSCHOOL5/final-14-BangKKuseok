import React from 'react';
import {
  NavbarWrapper,
  NavbarList,
  StyledHomeIcon,
  StyledFeedIcon,
  StyledChatIcon,
  StyledUserIcon,
} from './NavbarStyle';
import { Link, useLocation } from 'react-router-dom';
import { ReactComponent as UploadIcon } from '../../../assets/icons/icon-upload.svg';

export default function Navbar() {
  const location = useLocation();
  const pathname = location.pathname;
  return (
    <NavbarWrapper>
      <NavbarList>
        <li>
          <Link to='/home'>
            <StyledHomeIcon pathname={pathname} />
          </Link>
        </li>
        <li>
          <Link to='/feed'>
            <StyledFeedIcon pathname={pathname} />
          </Link>
        </li>
        <li>
          <Link to='/post/upload'>
            <UploadIcon />
          </Link>
        </li>
        <li>
          <Link to='/chat'>
            <StyledChatIcon pathname={pathname} />
          </Link>
        </li>
        <li>
          <Link to='/profile'>
            <StyledUserIcon pathname={pathname} />
          </Link>
        </li>
      </NavbarList>
    </NavbarWrapper>
  );
}
