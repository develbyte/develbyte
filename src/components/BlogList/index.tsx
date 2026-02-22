import type {ReactNode} from 'react';
import React from 'react';
import Link from '@docusaurus/Link';
import {useAllPluginInstancesData} from '@docusaurus/useGlobalData';
import styles from './styles.module.css';

export default function BlogList(): ReactNode {
  const allBlogData = useAllPluginInstancesData('docusaurus-plugin-content-blog') as any;
  
  // Debug: Log the data
  console.log('All Blog Data:', allBlogData);
  console.log('All Blog Data Keys:', Object.keys(allBlogData || {}));
  
  // Get the default blog instance data
  const blogData = allBlogData?.default;
  console.log('Default Blog Data:', blogData);
  
  // Get all blog posts
  const allPosts = blogData?.blogPosts || [];
  
  // Date cutoff: October 20, 2016
  const cutoffDate = new Date('2016-10-20').getTime();
  
  // Filter posts older than October 20, 2016
  const filteredPosts = allPosts.filter((post: any) => {
    const postDate = new Date(post.metadata.date).getTime();
    return postDate >= cutoffDate;
  });
  
  console.log('All Posts:', allPosts.length);
  console.log('Filtered Posts (after Oct 20, 2016):', filteredPosts.length);
  
  // Sort by date (newest first)
  const sortedPosts = [...filteredPosts].sort((a, b) => 
    new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime()
  );
  
  if (sortedPosts.length === 0) {
    return (
      <section className={styles.blogSection}>
        <div className="container">
          <div className="row">
            <div className="col col--12">
              <div className={styles.blogArchive}>
                <p style={{color: 'white', fontSize: '20px'}}>No blog posts found. Blog data: {JSON.stringify(blogData)}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
  
  return (
    <section className={styles.blogSection}>
      <div className="container">
        <div className="row">
          <div className="col col--12">
            <div className={styles.blogArchive}>
              <div className={styles.postsList}>
                {sortedPosts.map(({metadata}) => {
                  const date = new Date(metadata.date);
                  const formattedDate = date.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  });
                  
                  return (
                    <div key={metadata.permalink} className={styles.blogItem}>
                      <span className={styles.blogDate}>{formattedDate}:</span>
                      <Link to={metadata.permalink} className={styles.blogLink}>
                        {metadata.title}
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
