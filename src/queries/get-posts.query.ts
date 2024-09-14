import { gql, useQuery } from "@apollo/client";
import { IGetPostsVariables } from "@bettermode/models";

const GET_POSTS = gql`
  query GetPosts(
    $after: String
    $before: String
    $excludePins: Boolean
    $filterBy: [PostListFilterByInput!]
    $limit: Int!
    $offset: Int
    $orderBy: PostListOrderByEnum
    $orderByString: String
    $postTypeIds: [String!]
    $reverse: Boolean
    $spaceIds: [ID!]
    $query: String
  ) {
    posts(
      after: $after
      before: $before
      excludePins: $excludePins
      filterBy: $filterBy
      limit: $limit
      offset: $offset
      orderBy: $orderBy
      orderByString: $orderByString
      postTypeIds: $postTypeIds
      reverse: $reverse
      spaceIds: $spaceIds
      query: $query
    ) {
      totalCount
      pageInfo {
        endCursor
        hasNextPage
      }
      nodes {
        id
        title
        description
        createdAt
        publishedAt
      }
    }
  }
`;

const useGetPosts = (variables: IGetPostsVariables) => {
  const { data, loading, error, fetchMore } = useQuery(GET_POSTS, {
    variables,
  });

  // Function to fetch the next page
  const loadMorePosts = () => {
    const pageInfo = data?.posts?.pageInfo;

    if (!pageInfo?.hasNextPage) return;

    fetchMore({
      variables: {
        after: pageInfo.endCursor,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) return previousResult;

        const newPosts = fetchMoreResult.posts.nodes;
        const existingPosts = previousResult.posts.nodes;

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
    data,
    loading,
    error,
    loadMorePosts,
  };
};

export default useGetPosts;
