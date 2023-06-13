import React from 'react';
import { SIZES, StyledButton, VARIANTS } from './ButtonStyle';

export default function Button({
  type = 'button',
  disabled = false,
  size,
  variant,
  onClick,
  children,
}) {
  const sizeStyle = SIZES[size];
  const variantStyle = VARIANTS[variant];

  return (
    <StyledButton
      type={type}
      disabled={disabled}
      size={sizeStyle}
      variant={variantStyle}
      onClick={onClick}
    >
      {children}
    </StyledButton>
  );
}
