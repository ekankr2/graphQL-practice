import {gql, request} from "graphql-request";

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT as string;

export const getPosts = async () => {
    const query = gql`
        query MyQuery {
            postsConnection {
            edges {
                node {
                    author {
                        bio
                        name
                        id
                        photo {
                            url
                        }
                    }
                    createdAt
                    slug
                    excerpt
                    featuredImage {
                        url
                    }
                    catagories {
                        slug
                    }
                }
            }
            }
        }
    `
    const result = await request(graphqlAPI, query)

    return result.postConnecion.edges;
}
