import styled from 'styled-components';

export const StyledCommentItem = styled.li`
  margin-bottom: 14px;
  color: ${({ theme }) => theme.colors.black};
  font-size: ${({ theme }) => theme.fontSize.sm};

  p {
    margin: 2px 20px 0 48px;
    line-height: 1.5;
  }
`;

export const CommentInfoBox = styled.div`
  img {
    width: 36px;
    aspect-ratio: 1;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 1.2rem;
  }
  h5,
  time {
    display: inline-block;
    vertical-align: top;
  }
  h5 {
    padding: 6px 6px 0;
    font-weight: 500;
  }
  time {
    padding-top: 7px;
    color: ${({ theme }) => theme.colors.gray300};
    font-size: ${({ theme }) => theme.fontSize.xs};
  }

  button {
    float: right;
    margin-top: 8px;
    width: 20px;
    height: 20px;
    background: url(${({ moreIcon }) => moreIcon}) center / contain;
  }

  &:after {
    content: '';
    display: block;
    clear: both;
  }
`;
