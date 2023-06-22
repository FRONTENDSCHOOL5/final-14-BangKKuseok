import React, { useState } from 'react';
import { StyledHeart } from './HeartStyle';

export default function Heart({ isHearted, onClick }) {
  return (
    <button type='button' aria-label='하트 버튼' onClick={onClick}>
      <StyledHeart $isHearted={isHearted} />
    </button>
  );
}
