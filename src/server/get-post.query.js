import fs from "fs";
import { print } from "graphql";
import gql from "graphql-tag";
import fetch from "node-fetch";
import path from "path";
import { fileURLToPath } from "url";

// Get the file path of the current module
const __filename = fileURLToPath(import.meta.url);

// Get the directory path of the current module
const __dirname = path.dirname(__filename);

// Resolve the path to your .graphql file
const filePath = path.resolve(__dirname, "../gql/get-post.graphql");

// Read and parse the .graphql file
const queryString = fs.readFileSync(filePath, "utf8");
const GET_POSTS_GQL = gql`
  ${queryString}
`;

// Convert the parsed GraphQL query back to a string
const query = print(GET_POSTS_GQL);

async function fetchPosts(token, id) {
  try {
    const response = await fetch("https://api.bettermode.com/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        query,
        variables: {
          id,
        },
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
