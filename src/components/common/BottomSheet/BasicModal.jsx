import React from 'react';
import styled from 'styled-components';

const BasicModalWrapper = styled.div`
  height: 192px;
  margin: 0 16px;
`;

export default function BasicModal({ children }) {
  return <BasicModalWrapper>{children}</BasicModalWrapper>;
}
