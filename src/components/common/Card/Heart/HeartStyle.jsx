import { ReactComponent as HeartIcon } from '../../../../assets/icons/icon-heart.svg';
import styled, { css } from 'styled-components';

export const StyledHeart = styled(HeartIcon)`
  ${(props) =>
    props.ishearted
      ? css`
          path {
            stroke: ${({ theme }) => theme.colors.mainCoral};
            fill: ${({ theme }) => theme.colors.mainCoral};
          }
        `
      : HeartIcon}
`;