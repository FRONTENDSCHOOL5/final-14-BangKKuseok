import { useCallback } from 'react';
import { useRecoilState } from 'recoil';
import { confirmState } from '../atoms/confirm';

export default function useConfirm() {
  const [confirmData, setConfirmData] = useRecoilState(confirmState);

  const openConfirm = useCallback(
    ({ type, object }) => {
      setConfirmData({
        isShow: true,
        type: type,
        object: object,
      });
    },
    [setConfirmData],
  );

  const closeConfirm = useCallback(() => {
    setConfirmData({ isShow: false, type: '', object: '' });
  }, [setConfirmData]);

  return { confirmData, openConfirm, closeConfirm };
}
