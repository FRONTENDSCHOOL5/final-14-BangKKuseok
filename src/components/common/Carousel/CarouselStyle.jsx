import styled, { css } from 'styled-components';

const CarouselWrapper = styled.article`
  width: 390px;
  height: 404px;
  position: relative;
  overflow: hidden;
`;

const ImageBox = styled.ul`
  display: flex;
  width: 100%;
  height: 100%;
  position: relative;
  transform: translate(${(p) => p.movePercentage});
  transition: all 0.3s ease-in-out;

  li {
    width: 100%;
    display: flex;
    flex-shrink: 0;
    cursor: pointer;

    img {
      width: 100%;
      object-fit: cover;
    }
  }
`;

const ContentBox = styled.div`
  width: 100%;
  height: 100px;
  padding: 11px 16px 39px 26px;
  display: grid;
  grid-template-areas:
    'label label'
    'createdDate indicator';
  position: absolute;
  bottom: 0;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(41, 41, 41, 0.87) 89.06%);

  label {
    grid-area: label;
    ${({ theme }) => css`
      color: ${theme.colors.white};
      font-size: ${theme.fontSize.lg};
    `}
    font-weight: 700;
  }
`;

const PostDate = styled.span`
  grid-area: createdDate;
  align-self: self-end;
  ${({ theme }) => css`
    color: ${theme.colors.white};
    font-size: ${theme.fontSize.lg};
  `}
  font-size: ${({ theme }) => theme.fontSize.xs};
`;

const Indicator = styled.div`
  grid-area: indicator;
  justify-self: end;
  width: 50px;
  height: 22px;
  padding: 5px 0;
  border-radius: 22px;
  background: ${({ theme }) => theme.colors.white50};
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.04);
  backdrop-filter: blur(15px);
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.black};
  text-align: center;
`;

const ControlBox = styled.div`
  width: 100%;
  padding: 0 16px;
  display: flex;
  justify-content: space-between;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  button {
    width: 26px;
    height: 26px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.white50};
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.04);
    backdrop-filter: blur(13px);
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      width: 5px;
      height: 10px;
    }
  }
`;

export { CarouselWrapper, ImageBox, ContentBox, PostDate, Indicator, ControlBox };
