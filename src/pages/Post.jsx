import CardPost from "../components/CardPost";
import { usePosts } from "../PostsContext";

export default function Post() {
  const { posts } = usePosts();
  return (
    <>
      {posts.map((post, index) => (
        <CardPost key={index} post={post} /> // Pass the post to CardPost
      ))}
    </>
  );
}
