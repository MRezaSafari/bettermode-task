import fetch from "node-fetch";

const query = `
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

const variables = {
  limit: 6,
  postTypeIds: ["DWq1nJxcUBfmFp3"],
  orderByString: "publishedAt",
  reverse: false,
  filterBy: [],
};


async function fetchPosts(token) {
  try {
    const response = await fetch("https://api.bettermode.com/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    });

    const data = await response.json();
    if (response.ok) {
      // Handle the response data
      return data;
    } else {
      // Handle GraphQL errors
      console.error("GraphQL error:", data.errors);
    }
  } catch (error) {
    // Handle network or other errors
    console.error("Fetch error:", error);
  }
}

export default fetchPosts;
