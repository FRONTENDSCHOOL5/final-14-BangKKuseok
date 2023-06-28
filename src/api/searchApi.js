import { accessInstance } from './axiosInstance';

export const getSearchResult = async (keyword) => {
  try {
    const response = await accessInstance.get(`/user/searchuser/?keyword=${keyword}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
