import { accessInstance } from './axiosInstance';

export const uploadPost = async (postData) => {
  try {
    const response = await accessInstance.post(`/post`, postData);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
