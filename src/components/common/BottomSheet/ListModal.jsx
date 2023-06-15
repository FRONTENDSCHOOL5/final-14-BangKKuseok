import React from 'react';
import styled from 'styled-components';

const BottomSheetListWrapper = styled.ul`
  max-height: 425px;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    width: 0;
    background: transparent;
  }
`;

const ListItem = styled.li`
  height: 48px;
  display: flex;
  align-items: center;
  padding: 0 24px;
  font-size: ${({ theme }) => theme.fontSize.sm};
`;

const LEN = 0;

export default function ListModal({ items }) {
  const LEN = items.length * 48;

  return (
    <BottomSheetListWrapper>
      {items.map((item, index) => (
        <ListItem key={index}>{item}</ListItem>
      ))}
    </BottomSheetListWrapper>
  );
}

export { LEN };
