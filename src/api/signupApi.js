import { instance } from './axiosInstance';

// 리액트 쿼리에서 에러 캐치를 하는데 try-catch에서 에러 처리해서
// 의도된 에러인지 모르기 때문에 onError로 넘어가지 않았음.
export const postSignUp = async (formData) => {
  const response = await instance.post(`/user`, formData);
  return response;
};

export const checkEmailExist = async (email) => {
  try {
    const response = await instance.post(`user/emailvalid`, email);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const checkIdExist = async (accountname) => {
  try {
    const response = await instance.post(`user/accountnamevalid`, accountname);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
