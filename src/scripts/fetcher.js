// TODO Add error handling
// TODO Look into using GraphQL client
export async function getPosts(numberOfPosts = 3) {
  const postsRequest = `  
      query allPosts {  
          publication(host: "blog.stephcrown.com") {  
            title  
            posts(first: ${numberOfPosts}) {  
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

    // console.log(data);
    return data;
  } catch (err) {
    // console.log(err);
    return err;
  }
}

export async function getTagsPosts(tag, numberOfPosts = 3) {
  const postsRequest = `  
      query allPosts {  
          publication(host: "blog.stephcrown.com") {  
            title  
            posts(first: ${numberOfPosts}, filter: {tagSlugs: ["${tag}"]}) {  
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

    // console.log(data);
    return data;
  } catch (err) {
    // console.log(err);
    return err;
  }
}

export async function getPost(slug) {
  console.log(typeof slug);
  const postsRequest = `
  query allPosts {
    publication(host: "blog.stephcrown.com") {
      title
      post(slug: "${slug}") {
        title
        slug
        content {
          markdown
          html
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

    return data;
  } catch (err) {
    return err;
  }
}
