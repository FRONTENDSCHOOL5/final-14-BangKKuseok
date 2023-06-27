import React, { useEffect } from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { SPACES } from '../../../constants/spaces';

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
    border: unset;
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

export default function SpaceTabs({ currentTab, onClick, scrollLeft }) {
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

  return (
    <StyledSpaceTabs
      ref={scrollRef}
      onMouseDown={handleDragStart}
      onMouseMove={handleDragMove}
      onMouseUp={handleDragEnd}
      onMouseLeave={handleDragEnd}
      onClick={handleClickTab}
    >
      {['전체', ...SPACES].map((space, index) => (
        <StyledSpaceTab key={index} className={index === currentTab ? 'active' : null}>
          {space}
        </StyledSpaceTab>
      ))}
    </StyledSpaceTabs>
  );
}

// 기능 구현법
/*
- 사용하는 페이지에서 useState로 currentTab변수에 선택된 index번호를 넣기
- tab을 클릭하면 currentTab 값이 해당 인덱스로 변경되고 해당 게시글 들이 보이도록 한다
*/
