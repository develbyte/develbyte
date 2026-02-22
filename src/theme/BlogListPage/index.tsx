import React, { useState, useMemo } from 'react';
import clsx from 'clsx';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {
  PageMetadata,
  HtmlClassNameProvider,
  ThemeClassNames,
} from '@docusaurus/theme-common';
import Layout from '@theme/Layout';
import BlogListPaginator from '@theme/BlogListPaginator';
import SearchMetadata from '@theme/SearchMetadata';
import type {Props} from '@theme/BlogListPage';
import BlogPostItems from '@theme/BlogPostItems';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

function BlogListPageMetadata(props: Props): JSX.Element {
  const {metadata} = props;
  const {
    siteConfig: {title: siteTitle},
  } = useDocusaurusContext();
  const {blogDescription, blogTitle, permalink} = metadata;
  const isBlogOnlyMode = permalink === '/';
  const title = isBlogOnlyMode ? siteTitle : blogTitle;
  return (
    <>
      <PageMetadata title={title} description={blogDescription} />
      <SearchMetadata tag="blog_posts_list" />
    </>
  );
}

function BlogListPageContent(props: Props): JSX.Element {
  const {metadata, items} = props;
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Date cutoff: October 20, 2016
  const cutoffDate = new Date('2016-10-20').getTime();

  // Filter items based on date cutoff and selected tag
  const {dateFilteredItems, filteredItems} = useMemo(() => {
    // First filter by date (hide posts older than October 20, 2016)
    const dateFiltered = items.filter(({content: BlogPostContent}) => {
      const postDate = new Date(BlogPostContent.metadata.date).getTime();
      return postDate >= cutoffDate;
    });

    // Then filter by selected tag if any
    const tagFiltered = !selectedTag 
      ? dateFiltered 
      : dateFiltered.filter(({content: BlogPostContent}) => {
          const tags = BlogPostContent.metadata.tags || [];
          return tags.some((tag) => tag.label === selectedTag);
        });

    return { dateFilteredItems: dateFiltered, filteredItems: tagFiltered };
  }, [items, selectedTag]);

  // Extract all unique tags for the filter (only from posts after cutoff date)
  const allTags = React.useMemo(() => {
    const tagSet = new Set<string>();
    items.forEach(({content: BlogPostContent}) => {
      const postDate = new Date(BlogPostContent.metadata.date).getTime();
      if (postDate >= cutoffDate) {
        const tags = BlogPostContent.metadata.tags || [];
        tags.forEach((tag) => tagSet.add(tag.label));
      }
    });
    return Array.from(tagSet).sort();
  }, [items]);

  return (
    <div className={styles.blogListPage}>
      <h1 className={styles.pageTitle}>Recent Posts</h1>
      
      {/* Tags filter */}
      <div style={{ marginBottom: '2rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
        <button
          onClick={() => setSelectedTag(null)}
          style={{
            padding: '0.5rem 1rem',
            background: !selectedTag ? 'rgba(255, 255, 102, 0.2)' : 'rgba(60, 60, 60, 0.4)',
            border: !selectedTag ? '1px solid rgba(255, 255, 102, 0.5)' : '1px solid rgba(80, 80, 80, 0.3)',
            borderRadius: '4px',
            color: !selectedTag ? '#FFFF66' : '#B8B8B8',
            cursor: 'pointer',
            fontSize: '0.9rem',
            fontWeight: !selectedTag ? 600 : 400,
          }}
        >
          All Posts ({dateFilteredItems.length})
        </button>
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag)}
            style={{
              padding: '0.5rem 1rem',
              background: selectedTag === tag ? 'rgba(255, 255, 102, 0.2)' : 'rgba(60, 60, 60, 0.4)',
              border: selectedTag === tag ? '1px solid rgba(255, 255, 102, 0.5)' : '1px solid rgba(80, 80, 80, 0.3)',
              borderRadius: '4px',
              color: selectedTag === tag ? '#FFFF66' : '#B8B8B8',
              cursor: 'pointer',
              fontSize: '0.9rem',
              fontWeight: selectedTag === tag ? 600 : 400,
            }}
          >
            {tag}
          </button>
        ))}
      </div>

      <div className={styles.blogArchive}>
        {filteredItems.length === 0 ? (
          <div className={styles.noResults}>
            No posts found with tag "{selectedTag}".
          </div>
        ) : (
          <div className={styles.postsList}>
            {filteredItems.map(({content: BlogPostContent}) => {
              const {metadata: postMetadata} = BlogPostContent;
              const date = new Date(postMetadata.date);
              const formattedDate = date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              });

              return (
                <div key={postMetadata.permalink} className={styles.blogItem}>
                  <span className={styles.blogDate}>{formattedDate}:</span>
                  <Link to={postMetadata.permalink} className={styles.blogLink}>
                    {postMetadata.title}
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </div>
      {!selectedTag && <BlogListPaginator metadata={metadata} />}
    </div>
  );
}

export default function BlogListPage(props: Props): JSX.Element {
  return (
    <HtmlClassNameProvider
      className={clsx(
        ThemeClassNames.wrapper.blogPages,
        ThemeClassNames.page.blogListPage,
      )}>
      <BlogListPageMetadata {...props} />
      <Layout wrapperClassName="blog-list-page-wrapper" noFooter={false}>
        <main>
          <BlogListPageContent {...props} />
        </main>
      </Layout>
    </HtmlClassNameProvider>
  );
}

