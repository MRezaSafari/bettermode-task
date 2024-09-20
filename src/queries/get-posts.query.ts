import { gql, useLazyQuery } from "@apollo/client";
import { IPostsData } from "@bettermode/models";
import { useState } from "react";

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

const useLazyGetPosts = (initialData?: IPostsData) => {
  // State to store current data including initial and fetched data
  const [postsData, setPostsData] = useState<IPostsData | undefined>(
    initialData
  );

  // Lazy query to fetch more posts when needed
  const [fetchPosts, { loading, error, fetchMore }] = useLazyQuery<IPostsData>(
    GET_POSTS,
    {
      fetchPolicy: "network-only",
      nextFetchPolicy: "cache-first",
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
