import { atom } from 'recoil';

export const confirmState = atom({
  key: 'confirmState',
  default: {
    isShow: false,
    type: '',
    object: '',
  },
});
