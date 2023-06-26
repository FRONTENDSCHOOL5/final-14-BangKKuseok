import styled, { css } from 'styled-components';

const ChatRoomWrapper = styled.div`
  height: calc(100vh - 110px);
  background-color: ${({ theme }) => theme.colors.gray50};
`;

const ChatRoomContainer = styled.div`
  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
  height: calc(100vh - 130px);
  padding: 18px 16px 0;
  display: flex;
  flex-direction: column;

  justify-content: ${({ isUser }) => isUser && 'flex-end'};
`;

const ChatBox = styled.div`
  display: flex;
  flex-direction: ${({ isUser }) => (isUser ? 'row-reverse' : 'row')};
  margin-bottom: 15px;
  img {
    width: 240px;
    height: 240px;
    border-radius: 10px;
  }
`;
const ImgWrapper = styled.div`
  width: 42px;
  height: 42px;
  border-radius: 50%;

  overflow: hidden;
  object-fit: cover;
`;
const ChatText = styled.div`
  margin-top: 5px;
  max-width: 61%;
  padding: 12px;
  font-size: ${({ theme }) => theme.fontSize.sm};

  ${({ isUser }) =>
    isUser
      ? css`
          border-radius: 10px 0 10px 10px;
          background-color: ${({ theme }) => theme.colors.mainCoral};
          color: #fff;
        `
      : css`
          margin-left: 12px;
          border-radius: 0 10px 10px 10px;
          background-color: #fff;
          color: ${({ theme }) => theme.colors.black};
        `};

  line-height: 1.4em;
`;
const ChatTime = styled.div`
  ${({ isUser }) =>
    isUser
      ? css`
          margin-right: 6px;
        `
      : css`
          margin-left: 6px;
        `};
  align-self: flex-end;
  color: ${({ theme }) => theme.colors.gray300};
`;

export { ChatRoomWrapper, ChatRoomContainer, ChatBox, ChatText, ChatTime, ImgWrapper };
