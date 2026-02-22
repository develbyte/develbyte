import React from 'react';
import styles from './styles.module.css';

interface BlogTagsFilterProps {
  onTagSelect?: (tag: string | null) => void;
  selectedTag?: string | null;
  items: Array<{
    content: {
      metadata: {
        tags: Array<{ label: string; permalink: string }>;
      };
    };
  }>;
}

export default function BlogTagsFilter({ onTagSelect, selectedTag, items }: BlogTagsFilterProps): JSX.Element {
  const allPosts = items;

  // Extract unique tags and count posts per tag
  const tagCounts = React.useMemo(() => {
    const counts = new Map<string, number>();
    allPosts.forEach((item) => {
      const tags = item.content.metadata.tags || [];
      tags.forEach((tag) => {
        counts.set(tag.label, (counts.get(tag.label) || 0) + 1);
      });
    });
    // Sort by count (descending) then alphabetically
    return Array.from(counts.entries())
      .sort((a, b) => {
        if (b[1] !== a[1]) return b[1] - a[1];
        return a[0].localeCompare(b[0]);
      });
  }, [allPosts]);

  const handleTagClick = (tag: string) => {
    if (selectedTag === tag) {
      onTagSelect?.(null); // Deselect if clicking the same tag
    } else {
      onTagSelect?.(tag);
    }
  };

  return (
    <div className={styles.tagsFilterContainer}>
      <div className={styles.tagsFilterHeader}>FILTER BY TAG</div>
      <div className={styles.tagsList}>
        <button
          className={`${styles.tagItem} ${!selectedTag ? styles.tagItemActive : ''}`}
          onClick={() => onTagSelect?.(null)}
        >
          <span className={styles.tagLabel}>All Posts</span>
          <span className={styles.tagCount}>{allPosts.length}</span>
        </button>
        {tagCounts.map(([tag, count]) => (
          <button
            key={tag}
            className={`${styles.tagItem} ${selectedTag === tag ? styles.tagItemActive : ''}`}
            onClick={() => handleTagClick(tag)}
          >
            <span className={styles.tagLabel}>{tag}</span>
            <span className={styles.tagCount}>{count}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

