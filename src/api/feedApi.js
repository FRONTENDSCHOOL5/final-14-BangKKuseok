import { accessInstance } from './axiosInstance';

export const getFeedPost = async ({ skip }) => {
  try {
    const response = await accessInstance.get(`/post/feed/?limit=10&skip=${skip}`);
    const { posts } = response.data;

    return {
      data: posts,
      nextPage: skip,
    };
  } catch (error) {
    console.error(error);
  }
};
