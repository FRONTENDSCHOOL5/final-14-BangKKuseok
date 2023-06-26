import { accessInstance } from './axiosInstance';

export const getFollowers = async ({ accountname, skip }) => {
  try {
    const response = await accessInstance.get(
      `/profile/${accountname}/follower/?limit=10&skip=${skip}`,
    );
    return {
      data: response.data,
      nextPage: skip,
    };
  } catch (error) {
    console.error(error);
  }
};

export const getFollowings = async ({ accountname, skip }) => {
  try {
    const response = await accessInstance.get(
      `/profile/${accountname}/following/?limit=10&skip=${skip}`,
    );
    return {
      data: response.data,
      nextPage: skip,
    };
  } catch (error) {
    console.error(error);
  }
};
