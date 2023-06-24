import { atom } from 'recoil';

export const isLastFeedAtom = atom({
  key: 'isLastFeedAtom',
  default: false,
});

export const feedDataAtom = atom({
  key: 'feedDataAtom',
  default: [],
});
