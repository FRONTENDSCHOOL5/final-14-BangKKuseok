import React, { useState } from 'react';
import { StyledHeart } from './HeartStyle';



export default function Heart() {
  const [isHearted, setIsHearted] = useState(false);

  const handleClickHeartButton = () => {
    setIsHearted(!isHearted);
  };

  return (
    <button type='button' aria-label='하트 버튼' onClick={handleClickHeartButton} >
      <StyledHeart ishearted={+isHearted} />
    </button>
  );
}

// 실 사용시 API로 받아올 hearted 값과 연동하기