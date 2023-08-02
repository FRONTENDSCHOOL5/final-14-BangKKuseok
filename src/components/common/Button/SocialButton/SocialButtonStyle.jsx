import styled, { css } from 'styled-components';
import mailIcon from '../../../../assets/icons/icon-mail.svg';
import kakaoIcon from '../../../../assets/icons/icon-kakao.svg';
import googleIcon from '../../../../assets/icons/icon-google.svg';

const SOCIALS = {
  mail: css`
    --border: 1px solid ${({ theme }) => theme.colors.mainCoral};
    --background: url(${mailIcon}) no-repeat left 1em center / 1.7em;
    &:hover {
      background-color: rgba(241, 88, 70, 0.2);
    }
  `,
  kakao: css`
    --border: 1px solid ${({ theme }) => theme.colors.yellow};
    --background: url(${kakaoIcon}) no-repeat left 1em center / 1.7em;
    &:hover {
      background-color: rgba(242, 201, 76, 0.2);
    }
  `,
  google: css`
    --border: 1px solid ${({ theme }) => theme.colors.gray300};
    --background: url(${googleIcon}) no-repeat left 1em center / 1.7em;
    &:hover {
      background-color: rgba(118, 118, 118, 0.2);
    }
  `,
};

const StyledButton = styled.button`
  ${(p) => p.social}

  z-index: 10;
  min-width: 322px;
  padding: 15px 14px;
  border-radius: 14px;
  font-weight: 500;
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.gray300};
  border: var(--border, '1px solid currentColor');
  background: var(--background, none);
`;

export { SOCIALS, StyledButton };
