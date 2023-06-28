import React from 'react';
import styled from 'styled-components';
import listImg from '../../../assets/icons/icon-list.svg';
import listActiveImg from '../../../assets/icons/icon-list-active.svg';
import gridImg from '../../../assets/icons/icon-gallery.svg';
import gridActiveImg from '../../../assets/icons/icon-gallery-active.svg';

const StyledViewTabs = styled.nav`
  padding: 10px 16px 10px 0; /* sticky일 경우 디자인을 위해 margin 대신 padding을 줌 */
  margin-bottom: 10px;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  position: sticky;
  top: 0;
  background-color: ${({ theme }) => theme.colors.white};
  z-index: 10;

  button {
    width: 4rem;
    padding: unset;
  }
`;

export default function ViewTabs({ selectedTab, onClick }) {
  return (
    <StyledViewTabs>
      <button type='button' aria-label='리스트형 버튼' onClick={() => onClick('list')}>
        <img src={selectedTab === 'list' ? listActiveImg : listImg} alt='리스트형 버튼' />
      </button>
      <button type='button' aria-label='리스트형 버튼' onClick={() => onClick('grid')}>
        <img src={selectedTab === 'grid' ? gridActiveImg : gridImg} alt='그리드형 버튼' />
      </button>
    </StyledViewTabs>
  );
}

// 기능 구현법
/*
- 사용하는 페이지에서 useState로 selected 변수에 선택된 button에 따라 'grid'나 'list'로 변경한다
*/
