import styled, { css } from 'styled-components';

const HeaderWrapper = styled.header`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 6rem;
  padding: 0 1.6rem;
  ${(props) => {
    switch (props.type) {
      case 'home':
        return css`
          background-color: transparent;
          position: relative;
          z-index: 1;
        `;
      case 'feed':
        return css`
          background-color: ${({ theme }) => theme.colors.white};
          position: absolute;
          z-index: 1;
        `;
      case 'search':
        return css`
          background-color: ${({ theme }) => theme.colors.white};
          box-shadow: 0 3px 10px rgba(66, 66, 66, 0.04);
        `;
      case 'profile':
        return css`
          background-color: ${({ theme }) => theme.colors.subCoral};
        `;
      default:
        return css`
          background-color: ${({ theme }) => theme.colors.white};
        `;
    }
  }};
`;

const HeaderText = css`
  display: inline-block;
  margin-right: auto;
  margin-left: 1.6rem;
  font-weight: 500;
`;

const HeaderH2 = styled.h2`
  ${HeaderText}
  font-size: ${({ theme }) => theme.fontSize.md};
`;

const HeaderH3 = styled.h3`
  ${HeaderText}
  font-size: ${({ theme }) => theme.fontSize.base};
  cursor: pointer;
`;

const HeaderSpan = styled.span`
  color: ${({ theme }) => theme.colors.gray200};
  font-size: ${({ theme }) => theme.fontSize.xs};
  letter-spacing: 0.02rem;
  font-weight: 400;
  margin-left: 8px;
`;

const SearchBtn = styled.button`
  display: inline-block;
  position: absolute;
  right: 1.6rem;
`;

export { HeaderWrapper, HeaderH2, HeaderH3, HeaderSpan, SearchBtn };
