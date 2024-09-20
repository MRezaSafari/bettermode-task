import { useParams } from "react-router-dom";

const PostPage = () => {
  const { slug } = useParams();

  return <>{slug}</>;
};

export default PostPage;
