import React from 'react';
import styled from 'styled-components';

const BasicModalWrapper = styled.div`
  padding: 16px;
  max-height: 548px;
  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (min-width: 500px) {
    padding-bottom: 20px;
  }
`;

export default function BasicModal({ children }) {
  return <BasicModalWrapper>{children}</BasicModalWrapper>;
}
