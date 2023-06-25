export const WARNING_MSG = {
  itemName: '2~15자 이내여야 합니다.',
  keyword: '2~10자 이내여야 합니다',
  price: '가격은 숫자로 입력하셔야 합니다. ',
};

export const REG = {
  itemName: /^.{2,15}$/,
  keyword: /^.{2,10}$/,
  price: /^\d+$/,
  link: /^.{1,}$/,
};

export const MAX_PRICE = 999999999;
