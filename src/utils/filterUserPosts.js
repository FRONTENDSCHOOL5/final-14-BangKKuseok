// TODO: 공간에 따라 포스트 데이터 필터링 기능 추가
export const filterUserPosts = (posts) => {
  const imgInfoArr = posts.map(({ _id, author, image }) => ({
    id: _id,
    author: author.accountname,
    imgUrl: image,
  }));

  return imgInfoArr;
};
