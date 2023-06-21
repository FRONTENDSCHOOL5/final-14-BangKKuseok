export const filterUserPosts = (posts) => {
  const imgInfoArr = posts.map(({ id, author, image }) => ({
    id: id,
    author: author.accountname,
    imgUrl: image,
  }));

  return imgInfoArr;
};
