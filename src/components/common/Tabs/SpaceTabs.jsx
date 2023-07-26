import React, { useEffect } from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { SPACES } from '../../../constants/common';

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

  const scrollRef = useRef(null);
  const [isStart, setIsStart] = useState(false);
  const [isDrag, setIsDrag] = useState(false);
  const [startX, setStartX] = useState(0);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollLeft;
    }
  }, [scrollLeft]);

  const handleDragStart = (e) => {
    e.preventDefault();
    setIsDrag(false);
    setIsStart(true);
    setStartX(e.pageX + scrollRef.current.scrollLeft);
  };

  const handleDragEnd = (e) => {
    setIsStart(false);
  };

  const handleDragMove = (e) => {
    if (isStart) {
      setIsDrag(true);
      scrollRef.current.scrollLeft = startX - e.pageX;
    }
  };

  const handleClickTab = (e) => {
    if (!isDrag) onClick(e);
  };
export default function SpaceTabs({ onClick }) {
  const [currentTab, setCurrentTab] = useState('전체');
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
