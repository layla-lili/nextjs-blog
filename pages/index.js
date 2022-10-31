import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';
import Date from '../components/date';

import { fetchAPI, getPosts } from "../lib/datocms";


export default function Home({ posts }) {


  return (
    <Layout home>
 
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>Junior Developer with 1 plus years of experience is seeking to
          obtain a position that brings new challenges and skill
          development in order to further my expertise and reward
          in the work field.</p>
        
      </section>
           {/* Add this <section> tag below the existing <section> tag */}
     <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {posts.map(({ id, published, title, slug }) =>(
          // {allPostsData.map(({ id, date, title }) => (
           <li className={utilStyles.listItem} key={id}>
           <Link id={id} href={`/posts/${slug}`} legacyBehavior>
            {title}
           </Link>
           <br />
           <small className={utilStyles.lightText}>
             <Date dateString={published} />
           </small>
         </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  const posts = await getPosts();
  

  return {
    props: {
      posts: posts,
    },
  };
}
