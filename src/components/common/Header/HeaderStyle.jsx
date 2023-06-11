import React from 'react';
import styled, { css } from 'styled-components';
import theme from './../../../styles/theme';

const HeaderWrapper = styled.header`
  width: 100%;
  background-color: transparent;
`;

const HeaderLayout = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 6rem;
  padding: 0 1.6rem;
`;

const HeaderUI = styled.div`
  ${HeaderLayout}
`;

const HeaderShadowUI = styled.div`
  ${HeaderLayout}
  box-shadow: 0 3px 10px rgba(66, 66, 66, 0.04);
`;

const HeaderText = css`
  display: inline-block;
  position: absolute;
`;

const HeaderH2 = styled.h2`
  ${HeaderText}
  margin-left: 5.4rem;
  font-size: ${({ theme }) => theme.fontSize.md};
`;

const HeaderH3 = styled.h3`
  ${HeaderText}
  margin-left: 4.8rem;
  font-size: ${({ theme }) => theme.fontSize.base};
`;

const SearchBtn = styled.button`
  display: inline-block;
  position: absolute;
  right: 1.6rem;
`;

export { HeaderWrapper, HeaderUI, HeaderShadowUI, HeaderH2, HeaderH3, SearchBtn };
