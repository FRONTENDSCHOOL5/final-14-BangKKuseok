import React, { useState, useRef, useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import BasicLayout from '../../../layout/BasicLayout';
import RoundedBottomInput from '../../../components/common/Input/RoundedBottomInput/RoundedBottomInput';
import BottomSheet from '../../../components/common/BottomSheet/BottomSheet';
import ListModal from '../../../components/common/BottomSheet/ListModal';
import {
  ChatRoomWrapper,
  ChatRoomContainer,
  ChatBox,
  ImgWrapper,
  ChatText,
  ChatTime,
  Message,
} from './ChatRoomPageStyle';
import useModal from '../../../hooks/useModal';

export default function ChatRoomPage() {
  const location = useLocation();

  const { openModal, closeModal } = useModal('');

  const [type, setType] = useState('text');
  const [message, setMessage] = useState('');
  const [arrMessages, setarrMessages] = useState([]);

  const [isUser, setIsUser] = useState(false);

  const bottomRef = useRef(null);
  const [scrollDown, setScrollDown] = useState(false);

  const fileInputRef = useRef(null);

  const navigate = useNavigate();

  // 오전, 오후 시간 반환 함수
  const handleHours = (num) =>
    num < 12 ? '오전 ' + num : num === 12 ? '오후 ' + num : '오후 ' + (num - 12);

  // 숫자가 한 자리일 때 두 자리로 변환하는 함수
  const padZero = (num) => (num < 10 ? '0' + num : num);

  // 시간, 분 정보 추출
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const formattedHours = handleHours(hours);
  const formattedMinutes = padZero(minutes);

  // 모달창 열기
  const handleClickRightButton = () => {
    openModal('chat');
  };

  // 채팅방 나가기를 누르면 ChatListPage로 이동
  const handleClickListItem = () => {
    navigate('/chat');
    closeModal();
  };

  // input 클릭하면 실행
  const handleInputClick = (e) => {
    setType('file');
    fileInputRef.current.click();
  };

  const handleInputChange = (e) => {
    if (type === 'text') {
      const value = e.target.value;
      setMessage(value);
    } else if (type === 'file') {
      const file = fileInputRef.current.files[0];
      if (file) {
        setIsUser(true);
        const reader = new FileReader();
        // 파일을 읽어서 이미지 URL을 생성
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          // 파일의 이미지 URL
          const fileUrl = reader.result;
          const newImageMsg = {
            content: fileUrl,
            isUser: true,
            timestamp: new Date(),
            type: 'image',
          };

          const newMsgArray = [...arrMessages, newImageMsg];

          if (arrMessages.length < newMsgArray.length) {
            setScrollDown(true);
          }
          setarrMessages((prev) => [...prev, newImageMsg]);
        };
        setType('text');
        fileInputRef.current.value = '';
      }
    }
  };

  // Submit되면 입력한 메시지들을 처리
  const handleShowMsg = (e) => {
    e.preventDefault();
    setIsUser(true);

    // 빈 메시지가 아니면
    if (message.trim() !== '') {
      const newMessage = {
        content: message,
        isUser: true,
        timestamp: new Date(),
        type: 'text',
      };

      const newMsgArray = [...arrMessages, newMessage];

      if (arrMessages.length < newMsgArray.length) {
        setScrollDown(true);
      }
      setarrMessages(newMsgArray);

      // input value값 초기화
      setMessage('');
    }
  };

  //scroll아래로 이동하기
  useLayoutEffect(() => {
    if (scrollDown) {
      bottomRef.current.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
      setScrollDown(false);
    }
  }, [scrollDown]);

  return (
    <BasicLayout
      type={'chat'}
      title={location.state.username}
      isNonNav={true}
      onClickRightButton={handleClickRightButton}
    >
      {/* 상대 채팅 */}
      <ChatRoomWrapper>
        <ChatRoomContainer ref={bottomRef}>
          {location.state.otherChatArr ? (
            location.state.otherChatArr.map((chat, index) => (
              <ChatBox key={index}>
                <ImgWrapper>
                  <img src={location.state.image} alt='상대 프로필 이미지' />
                </ImgWrapper>
                <ChatText>
                  <p>{chat}</p>
                </ChatText>
                <ChatTime>
                  <span>{`${formattedHours}:${formattedMinutes}`}</span>
                </ChatTime>
              </ChatBox>
            ))
          ) : (
            <Message>{location.state.username}님과의 채팅을 시작해보세요!</Message>
          )}

          {/* 내가 보낸 채팅 */}
          {isUser &&
            arrMessages.map((message, index) => (
              <ChatBox isUser={isUser} key={index} type={type}>
                {message.type === 'text' ? (
                  <>
                    {/* 메시지가 텍스트면 */}
                    <ChatText isUser={isUser}>
                      <p>{message.content}</p>
                    </ChatText>
                  </>
                ) : (
                  <>
                    {/* 메시지가 이미지면 */}
                    <img src={message.content} alt='유저 업로드 이미지' />
                  </>
                )}
                <ChatTime isUser={isUser}>
                  <span>{`${handleHours(message.timestamp.getHours())}:${padZero(
                    message.timestamp.getMinutes(),
                  )}`}</span>
                </ChatTime>
              </ChatBox>
            ))}
        </ChatRoomContainer>
      </ChatRoomWrapper>
      <RoundedBottomInput
        ref={fileInputRef}
        type={type}
        placeholder={'메시지를 보내세요'}
        onClick={handleInputClick}
        onChange={handleInputChange}
        onSubmit={handleShowMsg}
        isChat={true}
        value={message}
      />
      {/* -- BottomSheet */}
      <BottomSheet>
        <ListModal onClick={handleClickListItem}></ListModal>
      </BottomSheet>
    </BasicLayout>
  );
}
