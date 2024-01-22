// Gets all posts from hashnode blog
// TODO Review and refactor
// FIXME If there are no posts, the page will break

const myBlog = "blog.stephcrown.com";

export async function getAllPosts() {
  let endCursor = "";
  let hasNextPage = true;
  let allPosts = null;

  while (hasNextPage) {
    const postsRequest = `  
        query allPosts {  
            publication(host: "${myBlog}") {  
              title  
              posts(first: 20, ${endCursor ? `after: "${endCursor}"` : ""}) {  
                pageInfo {  
                  hasNextPage  
                  endCursor  
                }  
                edges {  
                  node {  
                    author {  
                      name  
                      profilePicture  
                    }  
                    title  
                    subtitle  
                    brief  
                    slug  
                    coverImage {  
                      url  
                    }  
                    tags {  
                      name  
                      slug  
                    }  
                    publishedAt  
                    readTimeInMinutes  
                  }  
                }  
              }  
            }  
          }
        `;

    try {
      const res = await fetch("https://gql.hashnode.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: postsRequest }),
      });

      if (res.status >= 400) {
        throw new Error("Server responded with a status of " + res.status);
      }

      const { data } = await res.json();

      // if allPosts is not null, concat the new posts to the existing posts
      if (allPosts === null) {
        allPosts = { ...data };
      } else {
        allPosts.publication.posts.edges =
          allPosts.publication.posts.edges.concat(data.publication.posts.edges);
      }

      // if there is a next page, set the endCursor to the new endCursor
      if (data.publication.posts.pageInfo.hasNextPage === true) {
        endCursor = data.publication.posts.pageInfo.endCursor;
      } else {
        hasNextPage = false;
      }
    } catch (err) {
      hasNextPage = false;
      return err;
    }
  }

  return allPosts;
}
