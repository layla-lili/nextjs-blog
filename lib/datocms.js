import { HttpsProxyAgent } from 'https-proxy-agent'

const API_URL = 'https://graphql.datocms.com'
const NEXT_DATOCMS_API_TOKEN = process.env.NEXT_DATOCMS_API_TOKEN
const PROXY_USERNAME = process.env.PROXY_USERNAME
const PROXY_USERPASS = process.env.PROXY_USERPASS

export async function fetchAPI(query, { variables, preview } = {}) {

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

    const res = await fetch(API_URL + (preview ? '/preview' : ''), {
      agent: new HttpsProxyAgent("http://" + PROXY_USERNAME + ":" + PROXY_USERPASS + "@bah-webfilter02:8080"),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${NEXT_DATOCMS_API_TOKEN}`,
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    })
  
    const json = await res.json()
    if (json.errors) {
      console.error(json.errors)
      throw new Error('Failed to fetch API')
    }
    return json.data  
  }

 
// import { GraphQLClient } from "graphql-request";

// export function request({ query, variables, includeDrafts, excludeInvalid }) {
//   const headers = {
//     authorization: `Bearer ${process.env.NEXT_DATOCMS_API_TOKEN}`,
//   };
//   if (includeDrafts) {
//     headers['X-Include-Drafts'] = 'true';
//   }
//   if (excludeInvalid) {
//     headers['X-Exclude-Invalid'] = 'true';
//   }
//   const client = new GraphQLClient('https://graphql.datocms.com', { headers });
 
//   return client.request(query, variables);
// }


export async function getPosts() {
  const POST_QUERY = `{
    allPosts{
      id,
      title,
      slug,
      published,
      body{
       value
      }
    }
  }`;

  const data = await fetchAPI(POST_QUERY);
return data?.allPosts;

}


