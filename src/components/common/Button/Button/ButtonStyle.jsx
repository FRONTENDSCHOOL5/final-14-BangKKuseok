import styled, { css } from 'styled-components';

const SIZES = {
  xs: css`
    --font-size: ${({ theme }) => theme.fontSize.xs};
    --font-weight: 400;
    --padding: 7px 12px;
    --min-width: 56px;
  `,
  sm: css`
    --font-size: ${({ theme }) => theme.fontSize.sm};
    --font-weight: 500;
    --padding: 8px 14px;
    --min-width: 89px;
  `,
  md: css`
    --font-size: ${({ theme }) => theme.fontSize.sm};
    --font-weight: 600;
    --padding: 9px 14px;
    --min-width: 119px;
  `,
  lg: css`
    --font-size: ${({ theme }) => theme.fontSize.base};
    --font-weight: 600;
    --padding: 14px 18px;
    --border-radius: 14px;
    --min-width: 322px;
  `,
};

const VARIANTS = {
  white: css`
    --bg-color: ${({ theme }) => theme.colors.white};
    --color: ${({ theme }) => theme.colors.gray300};
    --border: 1px solid ${({ theme }) => theme.colors.gray100};
  `,
  line: css`
    --bg-color: ${({ theme }) => theme.colors.white};
    --color: ${({ theme }) => theme.colors.subCoral};
    --border: 1.2px solid currentColor;
  `,
};

const StyledButton = styled.button`
  ${(p) => p.size}
  ${(p) => p.variant}

  min-width: var(--min-width);
  border-radius: var(--border-radius, 10px);
  font-weight: var(--font-weight, 500);
  font-size: var(--font-size, 1.4rem);
  padding: var(--padding, 9px 14px);
  color: var(--color, ${({ theme }) => theme.colors.white});
  background-color: var(--bg-color, ${({ theme }) => theme.colors.mainCoral});
  border: var(--border, none);

  &:disabled {
    cursor: default;
    background-color: ${({ theme }) => theme.colors.lightCoral};
  }
`;

export { SIZES, VARIANTS, StyledButton };
