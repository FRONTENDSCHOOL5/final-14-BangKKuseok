export default function PostCard({ data, moreInfo }) {
  const { id, content, image, hearted, heartCount, commentCount, createdAt } = data;
  const { space, detail } = JSON.parse(content);
