import React, {type ReactNode} from 'react';
import Header from '@theme-original/BlogPostItem/Header';
import type HeaderType from '@theme/BlogPostItem/Header';
import type {WrapperProps} from '@docusaurus/types';
import {useBlogPost} from '@docusaurus/plugin-content-blog/client';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

type Props = WrapperProps<typeof HeaderType>;

export default function HeaderWrapper(props: Props): ReactNode {
  const {metadata, isBlogPostPage} = useBlogPost();
  
  // Only show on full blog post pages, not in list view
  if (!isBlogPostPage) {
    return <Header {...props} />;
  }

  return (
    <>
          {/* Back Button - will be positioned by CSS Grid */}
          <div className={styles.backButton}>
            <Link to="/" className={styles.backLink}>
              ← Back
            </Link>
          </div>
      
      <Header {...props} />
    </>
  );
}
