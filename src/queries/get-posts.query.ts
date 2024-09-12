const queryString = `
    query GetPosts($after: String, $before: String, $excludePins: Boolean, $filterBy: [PostListFilterByInput!], $limit: Int!, $offset: Int, $orderBy: PostListOrderByEnum, $orderByString: String, $postTypeIds: [String!], $reverse: Boolean, $spaceIds: [ID!], $query: String) {
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
          }
          subscribersCount
          postTypeId
          reactionsCount
          createdAt
          publishedAt
          title
          description
        }
      }
    }
  `;

const variables = {
  limit: 3,
  postTypeIds: ["03yEveXEwAktciA"],
  orderByString: "publishedAt",
  reverse: true,
  filterBy: [],
};

const operationName = "GetPosts";

const QUERY_GET_POSTS = JSON.stringify({
  query: queryString,
  variables,
  operationName,
});

export default QUERY_GET_POSTS;
