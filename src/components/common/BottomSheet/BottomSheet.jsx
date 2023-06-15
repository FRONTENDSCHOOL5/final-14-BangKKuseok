import React, { useState, useEffect, useRef } from 'react';
import { BottomSheetDim, ModalBox, HeaderModal } from './BottomSheetStyle';
import ListModal from './ListModal';
import BasicModal from './BasicModal';

// type: basic, list
function BottomSheet({ type = 'basic', isShow, setIsShow, children }) {
  const [animate, setAnimate] = useState(false);
  const [localVisible, setLocalVisible] = useState(isShow);
  const wrapperRef = useRef(null);
  const modalBoxRef = useRef(null);

  useEffect(() => {
    setLocalVisible(isShow);
  }, [isShow]);

  useEffect(() => {
    if (localVisible && !isShow) {
      setAnimate(true);
      setTimeout(() => setAnimate(false), 250);
    } // 0.25초뒤에 없어짐
    setLocalVisible(isShow);
  }, [localVisible, isShow]);

  // Dim 클릭했을 때, ModalBox부분을 제외한 영역이어야 동작하도록
  const handleDimClick = (e) => {
    if (wrapperRef.current && modalBoxRef.current && !modalBoxRef.current.contains(e.target)) {
      setIsShow(false);
    }
  };

  // ModalBox의 HeaderModal을 클릭했을 때 동작
  const handleHeaderModalClick = () => {
    setIsShow(false);
  };

  if (!localVisible && !animate) return null;

  return (
    <>
      <BottomSheetDim onClick={handleDimClick} disappear={!isShow} ref={wrapperRef}>
        <ModalBox disappear={!isShow} ref={modalBoxRef}>
          <HeaderModal onClick={handleHeaderModalClick} />
          {type === 'list' ? <ListModal /> : <BasicModal>{children}</BasicModal>}
        </ModalBox>
      </BottomSheetDim>
    </>
  );
}

export default BottomSheet;
