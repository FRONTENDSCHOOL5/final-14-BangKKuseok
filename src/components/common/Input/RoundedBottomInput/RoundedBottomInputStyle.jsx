import React from 'react';
import styled from 'styled-components';
import { RoundedInputWrapper } from '../RoundedInput/RoundedInput';

const BottomInputWrapper = styled.div`
  width: 100%;
  padding: 0.8rem 1.6rem 1.4rem;
  box-shadow: 0px -1px 20px rgba(67, 67, 67, 0.1);
  border-radius: 20px 20px 0px 0px;
`;

const RoundedInputBox = styled(RoundedInputWrapper)`
  position: relative;
  width: 100%;
  input {
    width: calc(100% - 4.8rem);
  }
`;

const SubmitBtn = styled.button`
  position: absolute;
  padding: 1.2rem 1.4rem;
  inset: 0 0 auto auto;
`;

export {BottomInputWrapper, RoundedInputBox, SubmitBtn}
