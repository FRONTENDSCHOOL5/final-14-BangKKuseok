import React, { forwardRef } from 'react';
import Header from '../components/common/Header/Header';
import Navbar from '../components/common/Navbar/Navbar';
import styled from 'styled-components';
import Toast from '../components/common/Toast/Toast';

const LayoutWrapper = styled.div`
  width: clamp(390px, 100%, 720px);
  min-height: calc(var(--vh, 1vh) * 100);
  margin: 0 auto;
  position: relative;
  background-color: #fff;
  box-shadow: rgba(105, 80, 80, 0.08) 0px -3px 20px;
  overflow-y: hidden;
`;

const LayoutMain = styled.div`
  overflow-y: scroll;
  height: ${(p) => !p.isNonNav && 'calc((var(--vh, 1vh) * 100) - 68px)'};
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const BasicLayout = forwardRef(({ children, isNonNav = false, ...props }, ref) => {
  return (
    <LayoutWrapper>
      <LayoutMain isNonNav={isNonNav} ref={ref}>
        <Header {...props} />
        {children}
        <Toast />
      </LayoutMain>
      {isNonNav ? null : <Navbar />}
    </LayoutWrapper>
  );
});

export default BasicLayout;
