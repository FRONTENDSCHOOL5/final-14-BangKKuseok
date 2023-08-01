import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { SPACES } from '../../../constants/common';
import useSwipe from '../../../hooks/useSwipe';

const StyledSpaceTab = styled.button`
  font-weight: 500;
  padding: 0.8rem 1.6rem;
  border-radius: 20px;
  color: ${({ theme }) => theme.colors.gray300};
  line-height: 1;
  border: 1.4px solid currentColor;
  flex-shrink: 0;

  &:not(.active):hover {
    color: ${({ theme }) => theme.colors.mainCoral};
  }

  &.active {
    font-weight: 600;
    color: ${({ theme }) => theme.colors.white};
    border: 1.4px solid ${({ theme }) => theme.colors.mainCoral};
    background-color: ${({ theme }) => theme.colors.mainCoral};
  }
`;

const StyledSpaceTabs = styled.nav`
  width: 100%;
  padding: 20px 16px;
  display: flex;
  gap: 1rem;
  overflow-x: scroll;

  ::-webkit-scrollbar {
    display: none;
  }
`;

export default function SpaceTabs({ onClick }) {
  const [currentTab, setCurrentTab] = useState('전체');
  const [isDrag, scrollRef, handleDragStart, handleDragMove, handleDragEnd] = useSwipe();
  const spaces = ['전체', ...SPACES];

  return (
    <StyledSpaceTabs
      ref={scrollRef}
      onMouseDown={handleDragStart}
      onMouseMove={handleDragMove}
      onMouseUp={handleDragEnd}
      onMouseLeave={handleDragEnd}
    >
      {spaces.map((space, index) => (
        <StyledSpaceTab
          key={index}
          onClick={() => {
            if (!isDrag) {
              onClick(space);
              setCurrentTab(space);
            }
          }}
          className={space === currentTab ? 'active' : null}
        >
          {space}
        </StyledSpaceTab>
      ))}
    </StyledSpaceTabs>
  );
}
