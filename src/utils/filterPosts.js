export const filterPosts = (posts) => {
  const postDetailInfo = posts.map(({ _id, author, image }) => ({
    id: _id,
    author: author.accountname,
    imgUrl: image,
  }));

  return postDetailInfo;
};

export const filterUserPosts = (posts) => {
  const imgInfoArr = posts.map(({ id, author, image }) => ({
    id: id,
    author: author.accountname,
    imgUrl: image,
  }));

  return imgInfoArr;
};
