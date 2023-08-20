import { atom } from 'recoil';

const myProfileDataLocalStorage = JSON.parse(localStorage.getItem('myProfileData')) || null;

export const myProfileDataAtom = atom({
  key: 'myProfileDataAtom',
  default: myProfileDataLocalStorage,
});
