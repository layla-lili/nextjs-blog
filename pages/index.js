import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
//import { getSortedPostsData } from '../lib/posts';
import Link from 'next/link';
import Date from '../components/date';

//process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
// import {fetchAPI} from '../lib/datocms'
import { fetchAPI } from "../lib/datocms";
const HOMEPAGE_QUERY = `{
  allPosts{
    title,
    slug,
    published,
    body{
     value
    }
  }
}`;

 
export default function Home({ data  }) {
  return <div>{JSON.stringify(data, null, 2)}</div>;
  
  // return (
  //   <Layout home>
  //     <Head>
  //       <title>{siteTitle}</title>
  //     </Head>
  //     <section className={utilStyles.headingMd}>
  //       <p>Junior Developer with 1 plus years of experience is seeking to 
  //         obtain a position that brings new challenges and skill 
  //         development in order to further my expertise and reward 
  //         in the work field.</p>
  //       <p>
  //         (This is a sample website - you’ll be building a site like this on{' '}
  //         <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
  //       </p>
  //     </section>
  //          {/* Add this <section> tag below the existing <section> tag */}
  //    <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
  //       <h2 className={utilStyles.headingLg}>Blog</h2>
  //       <ul className={utilStyles.list}>
  //         {allPostsData.map(({ id, date, title }) => (
  //          <li className={utilStyles.listItem} key={id}>
  //          <Link href={`/posts/${id}`}>
  //            <a>{title}</a>
  //          </Link>
  //          <br />
  //          <small className={utilStyles.lightText}>
  //            <Date dateString={date} />
  //          </small>
  //        </li>
  //         ))}
  //       </ul>
  //     </section>
  //   </Layout>
  // );
}

export async function getStaticProps() {
  const data = await fetchAPI(HOMEPAGE_QUERY)
  console.log(data)
  
  return {
    props: { 
      data: data 
    }
  };

}
