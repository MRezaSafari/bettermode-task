import { gql, useQuery } from "@apollo/client";
import { IGetPostsVariables, IPostsData } from "@bettermode/models";

export const GET_POSTS = gql`
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
        slug
        mappingFields {
          key
          type
          value
        }
        fields {
          key
          value
          relationEntities {
            __typename
            medias {
              __typename
              ... on Emoji {
                __typename
                id
                text
              }
              ... on File {
                __typename
                downloadUrl
                extension
                id
                name
                size
                status
                url
              }
              ... on Image {
                __typename
                cropHeight
                cropWidth
                cropX
                cropY
                cropZoom
                dominantColorHex
                downloadUrl
                dpi
                height
                id
                name
                status
                url
                urls {
                  __typename
                  full
                  large
                  medium
                  small
                  thumb
                }
                width
              }
            }
          }
        }
        title
        repliesCount
        totalRepliesCount
        reactionsCount
        description
        customSeoDetail {
          description
          noIndex
          thumbnail {
            ... on Image {
              __typename
              id
              url
              width
              height
              dominantColorHex
              dpi
              cropHeight
              cropWidth
              cropX
              cropY
              cropZoom
              urls {
                __typename
                full
                large
                medium
                small
                thumb
              }
            }
            ... on Emoji {
              __typename
              id
              text
            }
            ... on Glyph {
              __typename
              id
              text
              variant
            }
            ... on File {
              id
              name
              url
            }
          }
          thumbnailId
          title
          canonicalUrl
        }
        relativeUrl
        url
        tags {
          description
          id
          slug
          title
        }
      }
    }
  }
`;

const useGetPosts = (variables: IGetPostsVariables) => {
  const { data, loading, error, fetchMore } = useQuery<IPostsData>(GET_POSTS, {
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
