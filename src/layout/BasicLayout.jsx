import React from 'react';
import Header from '../components/common/Header/Header';
import Navbar from '../components/common/Navbar/Navbar';

import styled from 'styled-components';
import Toast from '../components/common/Toast/Toast';

const LayoutWrapper = styled.div`
  width: clamp(390px, 100%, 720px);
  min-height: 100vh;
  margin: 0 auto;
  position: relative;
  background-color: #fff;
  overflow-y: hidden;
`;

const LayoutMain = styled.div`
  overflow-y: scroll;
  height: ${(p) => !p.isNonNav && 'calc(100vh - 68px)'};
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export default function BasicLayout({ children, isNonNav = false, ...props }) {
  return (
    <LayoutWrapper>
      <LayoutMain isNonNav={isNonNav}>
        <Header {...props} />
        {children}
        <Toast />
      </LayoutMain>
      {isNonNav ? null : <Navbar />}
    </LayoutWrapper>
  );
}
