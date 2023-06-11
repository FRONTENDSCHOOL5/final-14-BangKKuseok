import React from 'react';
import styled from 'styled-components';

const spaces = [
  '원룸',
  '거실',
  '침실',
  '주방',
  '욕실',
  '아이방',
  '드레스룸',
  '서재&작업실',
  '베란다',
  '사무공간',
  '가구&소품',
  '현관',
  '외관&기타',
];

const StyledSpaceTab = styled.button`
  font-weight: 500;
  padding: 0.8rem 1.6rem;
  border-radius: 20px;
  color: ${({ theme }) => theme.colors.gray300};
  line-height: 1;
  border: 1.4px solid currentColor;
  flex-shrink: 0;

  &.active {
    font-weight: 600;
    color: ${({ theme }) => theme.colors.white};
    border: unset;
    background-color: ${({ theme }) => theme.colors.mainCoral};
  }
`;

const StyledSpaceTabs = styled.nav`
  width: 100%;
  padding: 20px 0 20px 16px;
  display: flex;
  gap: 1rem;
  overflow-x: scroll;
`;

export default function SpaceTabs({ currentTab, ...rest }) {
  return (
    <StyledSpaceTabs {...rest}>
      {spaces.map((space, index) => (
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