import React from 'react';
import styled from 'styled-components';
import { NoneFeedWrapper } from '../FeedPage/FeedPageStyle';
import notFoundImg from '../../assets/images/404.png';
import Button from '../../components/common/Button/Button/Button';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/common/Navbar/Navbar';

const NoneDataWrapper = styled(NoneFeedWrapper)`
  & > img {
    width: 240px;
    margin-bottom: 6px;
  }
`;

export default function NotFoundPage() {
  const navigate = useNavigate();

  const handleClickBackButton = () => {
    navigate(-1);
  };
  return (
    <NoneDataWrapper>
      <img src={notFoundImg} alt='404 이미지' />
      <p>페이지를 찾을 수 없습니다 :(</p>
      <Button size='md' onClick={handleClickBackButton}>
        이전 페이지
      </Button>
      <Navbar />
    </NoneDataWrapper>
  );
}
