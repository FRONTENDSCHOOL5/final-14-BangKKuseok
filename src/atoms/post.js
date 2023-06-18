import { atom, selector } from 'recoil';
import { products } from '../mock/mockData';

export const userProductsAtom = atom({
  key: 'userProductsAtom',
  default: products,
});

export const selectedProductsAtom = atom({
  key: 'selectedProductsAtom',
  default: [],
});

export const canSelectProductSelector = selector({
  key: 'canSelectProductsSelector',
  get: ({ get }) => {
    const list = get(userProductsAtom);
    const filter = get(selectedProductsAtom).map((product) => product.id);
    return list.filter((product) => !filter.includes(product.id));
  },
});

export const mouseLocAtom = atom({
  key: 'mouseLocAtom',
  default: { x: 50, y: 50 },
});

export const bubbleLocAtom = atom({
  key: 'bubbleLocAtom',
  default: { x: 50, y: 50, bubleUp: true, edgeLeft: 50 },
});
