import Layout from "../../components/layout";
import Head from "next/head";
import Date from '../../components/date';
import utilStyles from '../../styles/utils.module.css'; 
import { fetchAPI, getPosts } from "../../lib/datocms";
import { StructuredText } from "react-datocms";
import { renderRule, isHeading } from 'datocms-structured-text-utils';

export default function Post({ blog }) {
  
  return (
    <Layout>
      <Head>
        <title>{blog.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{blog.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={blog.published} />
        </div>
        {/* <div dangerouslySetInnerHTML={{ __html: JSON.stringify(blog.body.value,null,2)}} /> */}
        <StructuredText data={blog.body.value}  
        
        customRules={[
       renderRule(
      isHeading,
      ({ node, children, key }) => {
        const Tag = `h${node.level}`;
        return <Tag className="text-cyan-500" key={key}>{children}</Tag>;
      },
    ),
  ]}/>
      
      </article>
    </Layout>
  );
}

// import { getAllPostIds, getPostData } from "../../lib/posts";
export const getStaticProps = async ({ params: { slug } }) => {
  const blogs=  await getPosts();
  console.log(blogs);
  const blog = blogs.find(x => x.slug === slug);
  console.log("blog ", blog)
  return {
    props: {
      blog: blog,
      
    }
  };
}

export async function getStaticPaths() { // every possible []
  const blogs=   await getPosts();
  console.log("blogs ", blogs);

  // const slugs = blogs.map(blog => blog.slug);
  const paths = blogs.map(blog => ({
    params: {slug: blog.slug }
  }));
  // const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

// export async function getStaticProps({ params }) {
//   const postData = await getPostData(params.id);

//   return {
//     props: {
//       postData,
//     },
//   };
// }

// };