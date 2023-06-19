import { accessInstance } from './axiosInstance';

export const getProfile = async (accountname) => {
  try {
    const response = await accessInstance.get(`/profile/${accountname}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getMyProfile = async () => {
  try {
    const response = await accessInstance.get(`/user/myinfo`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

