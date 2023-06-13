import React from 'react';
import { SOCIALS, StyledButton } from './SocialButtonStyle';

export default function SocialButton({ social, onClick, children }) {
  const socialStyle = SOCIALS[social];

  return (
    <StyledButton type='button' social={socialStyle} onClick={onClick}>
      {children}
    </StyledButton>
  );
}
