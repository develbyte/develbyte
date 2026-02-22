import React, {type ReactNode} from 'react';
import BlogPostPage from '@theme-original/BlogPostPage';
import type BlogPostPageType from '@theme/BlogPostPage';
import type {WrapperProps} from '@docusaurus/types';
import RecentPosts from '@site/src/components/RecentPosts';
import Link from '@docusaurus/Link';

type Props = WrapperProps<typeof BlogPostPageType>;

export default function BlogPostPageWrapper(props: Props): ReactNode {
  return (
    <>
      <BlogPostPage {...props} />
      <div style={{
        maxWidth: 'min(85%, 1400px)', 
        margin: '0 auto',
        padding: '0 clamp(2rem, 5vw, 5rem)',
        marginTop: '2rem', 
        marginBottom: '3rem'
      }}>
        <RecentPosts limit={6} />
      </div>
    </>
  );
}
