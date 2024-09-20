import { useLazyQuery } from "@apollo/client";
import { IPostNode } from "@bettermode/models";
import GET_POST_GQL from "../gql/get-post.graphql";

const usePost = () => {
  const [fetchPost, { loading, error }] = useLazyQuery<{
    post: IPostNode;
  }>(GET_POST_GQL);

  return {
    fetchPost,
    loading,
    error,
  };
};

export default usePost;
