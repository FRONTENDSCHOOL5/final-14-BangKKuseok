import { imgInstance } from './axiosInstance';

export const uploadImg = async (imgData) => {
  try {
    const response = await imgInstance.post(`/image/uploadfile`, imgData);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
