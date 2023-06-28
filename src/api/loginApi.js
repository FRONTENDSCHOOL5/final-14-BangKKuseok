import { instance } from './axiosInstance';

export const postLogin = async (formData) => {
  const response = await instance.post(`/user/login`, formData);
  return response.data;
};
