import React from 'react';
import Header from '../components/common/Header/Header';
import Navbar from '../components/common/Navbar/Navbar';

import styled from 'styled-components';
import Toast from '../components/common/Toast/Toast';
import useScroll from '../hooks/useScroll';

const LayoutWrapper = styled.div`
  width: clamp(390px, 100%, 720px);
  min-height: 100vh;
  margin: 0 auto;
  position: relative;
  background-color: #fff;
  box-shadow: rgba(105, 80, 80, 0.08) 0px -3px 20px;
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
  const wrapperRef = useScroll();
  return (
    <>
      <LayoutWrapper>
        <LayoutMain isNonNav={isNonNav} ref={wrapperRef}>
          <Header {...props} />
          {children}
          <Toast />
        </LayoutMain>
        {isNonNav ? null : <Navbar />}
      </LayoutWrapper>
    </>
  );
}
