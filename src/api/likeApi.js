import { accessInstance } from './axiosInstance';

export const SetLike = async (postId) => {
  try {
    const response = await accessInstance.post(`/post/${postId}/heart`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const SetDislike = async (postId) => {
  try {
    const response = await accessInstance.delete(`/post/${postId}/unHeart`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
