import { accessInstance } from './axiosInstance';

export const getAllPost = async (skip) => {
  try {
    const response = await accessInstance.get(`/post?limit=1000&skip=${skip}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
