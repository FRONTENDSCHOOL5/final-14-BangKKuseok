import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { modalState } from '../atoms/modal';
import { useCallback } from 'react';

export default function useModal() {
  const [modalData, setModalData] = useRecoilState(modalState);
  const [isVisible, setIsVisible] = useState(false);

  const openModal = useCallback(
    (modalType) =>
      setModalData({
        isShow: true,
        modalType: modalType,
      }),
    [setModalData],
  );

  const closeModal = useCallback(
    () =>
      setModalData((prev) => {
        return { ...prev, isShow: false };
      }),
    [setModalData],
  );

  useEffect(() => {
    let modalTimer;

    if (modalData.isShow) {
      setIsVisible(true);
    } else {
      modalTimer = setTimeout(() => setIsVisible(false), 250);
    } // 0.25초뒤에 없어짐

    return () => {
      if (modalTimer !== undefined) {
        clearTimeout(modalTimer);
      }
    };
  }, [modalData.isShow]);

  return {
    modalData,
    isVisible,
    openModal,
    closeModal,
  };
}
