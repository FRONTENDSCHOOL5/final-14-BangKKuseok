import { accessInstance } from './axiosInstance';

export const getComments = async (postId) => {
  try {
    const response = await accessInstance.get(`/post/${postId}/comments/?limit=50`);
    const { comments } = response.data;

    return comments;
  } catch (error) {
    console.error(error);
  }
};

export const uploadComment = async ({ postId, comment }) => {
  try {
    const response = await accessInstance.post(`/post/${postId}/comments`, {
      comment: { ...comment },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteComment = async ({ postId, commentId }) => {
  try {
    const response = await accessInstance.delete(`/post/${postId}/comments/${commentId}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const reportComment = async ({ postId, commentId }) => {
  try {
    const response = await accessInstance.post(`/post/${postId}/comments/${commentId}/report`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
