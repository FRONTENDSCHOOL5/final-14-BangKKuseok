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

export const USER_WARNING_MSG = {
  email: {
    format: '잘못된 이메일 형식입니다.',
    require: '이메일을 입력해주세요.',
  },
  password: {
    format: '비밀번호는 6자 이상이어야 합니다.',
    require: '비밀번호를 입력해주세요.',
  },
};

export const USER_REG = {
  email: /^[A-Za-z0-9._-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i,
  password: /^.{6,}$/,
};

export const MAX_PRICE = 999999999;
