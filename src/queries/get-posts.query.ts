import { useLazyQuery } from "@apollo/client";
import { IPostsData } from "@bettermode/models";
import { useState } from "react";
import GET_POSTS_GQL from "../gql/get-posts.graphql";

const useLazyGetPosts = (initialData?: IPostsData) => {
  // State to store current data including initial and fetched data
  const [postsData, setPostsData] = useState<IPostsData | undefined>(
    initialData
  );

  // Lazy query to fetch more posts when needed
  const [fetchPosts, { loading, error, fetchMore }] = useLazyQuery<IPostsData>(
    GET_POSTS_GQL,
    {
      fetchPolicy: "network-only",
      onCompleted: (data) => {
        if (!import.meta.env.SSR) {
          setPostsData(data);
        }
      },
    }
  );

  // Function to load more posts, combining with existing postsData
  const loadMorePosts = () => {
    const pageInfo = postsData?.posts?.pageInfo;

    if (!pageInfo?.hasNextPage) return;

    fetchMore({
      variables: {
        after: pageInfo.endCursor,
        limit: 6,
        postTypeIds: ["DWq1nJxcUBfmFp3"],
        orderByString: "publishedAt",
        reverse: false,
        filterBy: [],
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) return previousResult;

        const newPosts = fetchMoreResult.posts.nodes;
        const existingPosts = postsData?.posts?.nodes || [];

        // Update the state with combined data
        setPostsData({
          ...previousResult,
          posts: {
            ...fetchMoreResult.posts,
            nodes: [...existingPosts, ...newPosts],
          },
        });

        return {
          ...previousResult,
          posts: {
            ...fetchMoreResult.posts,
            nodes: [...existingPosts, ...newPosts],
          },
        };
      },
    });
  };

  return {
    data: postsData,
    loading,
    error,
    fetchPosts,
    loadMorePosts,
  };
};

export default useLazyGetPosts;
