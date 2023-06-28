import React from 'react';
import { Slide, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';

const StyledContainer = styled(ToastContainer)`
  .Toastify__toast {
    background: white;
    width: 80%;
    margin: 0 auto;
    bottom: 80px;
    border-radius: 10px;
  }
  .Toastify__toast-body {
    font-family: 'Pretendard';
    font-size: 1.3rem;
    font-weight: 500;
    color: rgba(71, 75, 86, 0.8);
  }
`;

export default function Toast() {
  return (
    <StyledContainer
      position='bottom-right'
      autoClose={2500}
      limit={1}
      hideProgressBar={false}
      newestOnTop={false}
      transition={Slide}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme='colored'
    />
  );
}
