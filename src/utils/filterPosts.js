export const filterPosts = (posts) => {
  const postDetailInfo = posts.map(({ _id, author, image, comments, content, heartCount }) => ({
    id: _id,
    username: author.username,
    accountname: author.accountname,
    imgUrl: image,
    content: content,
    comments: comments,
    createdAt: author.createdAt,
    hearted: !!author.hearts.length,
    heartCount: heartCount,
  }));

  return postDetailInfo;
};
