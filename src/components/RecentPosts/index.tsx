import React from 'react';
import Link from '@docusaurus/Link';
import { usePluginData } from '@docusaurus/useGlobalData';
import styles from './styles.module.css';

interface BlogPost {
  id: string;
  metadata: {
    permalink: string;
    title: string;
    date: string;
    formattedDate: string;
    description?: string;
  };
}

interface RecentPostsProps {
  currentPostId?: string;
  limit?: number;
}

export default function RecentPosts({ currentPostId, limit = 5 }: RecentPostsProps): JSX.Element {
  const blogData = usePluginData('docusaurus-plugin-content-blog', 'default') as any;
  
  // Date cutoff: October 20, 2016
  const cutoffDate = new Date('2016-10-20').getTime();
  
  // Get recent posts excluding the current post and posts older than cutoff date
  const recentPosts = (blogData?.blogPosts || [])
    .filter((post: BlogPost) => {
      const postDate = new Date(post.metadata.date).getTime();
      return post.id !== currentPostId && postDate >= cutoffDate;
    })
    .slice(0, limit);

  if (recentPosts.length === 0) {
    return null;
  }

  return (
    <div className={styles.recentPostsBottom}>
      <h2>Recent Posts</h2>
      <div className={styles.recentPostsList}>
        {recentPosts.map((post: BlogPost) => (
          <div key={post.id} className={styles.recentPostItem}>
            <Link to={post.metadata.permalink} className={styles.recentPostLink}>
              <h3>{post.metadata.title}</h3>
            </Link>
            <time className={styles.recentPostDate}>
              {post.metadata.formattedDate}
            </time>
            {post.metadata.description && (
              <p className={styles.recentPostDescription}>
                {post.metadata.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}


