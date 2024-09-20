import { Container } from "@bettermode/components";
import { IPostNode } from "@bettermode/models";
import { usePost } from "@bettermode/queries";
import { extractIdFromSlug, extractPostImageUrl } from "@bettermode/utilities";
import { FC, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";

interface IProps {
  post?: IPostNode;
}

const PostPage: FC<IProps> = ({ post }) => {
  const [postData, setPostData] = useState(post);
  const { fetchPost, loading } = usePost();
  const { slug } = useParams();

  useEffect(() => {
    if (slug && !import.meta.env.SSR) {
      const postId = extractIdFromSlug(slug);
      console.log(slug);
      fetchPost({
        variables: {
          id: postId,
        },
        onCompleted: (data) => {
          setPostData(data.post);
        },
      });
    }
    return () => {
      setPostData(undefined);
    };
  }, [slug]);

  if (!postData) {
    return null;
  }

  return (
    <Container>
      <Helmet>
        <title>{postData.title}</title>
      </Helmet>
      <div className="flex flex-col items-center gap-3">
        <img
          src={extractPostImageUrl(
            postData.fields.find((f) => f.key === "product_icon")?.value
          )}
          alt={postData.title}
          width={72}
          height={72}
          className="rounded-full w-[72px] h-[72px] object-cover"
        />
        <h2 className="text-3xl font-bold tracking-wider">{postData.title}</h2>
        <p>{postData.description}</p>
      </div>
    </Container>
  );
};

export default PostPage;
