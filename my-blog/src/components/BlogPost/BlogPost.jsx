import { useState, useEffect } from 'react';import PropTypes from 'prop-types';
import LikeButton from '../LikeButton/LikeButton';
import CommentSection from '../CommentSection/CommentSection';
import { calculateReadTime } from '../../utils/readTime';
import styles from './BlogPost.module.css';



function BlogPost({ id, title, content, author, date }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [readTime, setReadTime] = useState(0);

  useEffect(() => {
    setReadTime(calculateReadTime(content));
  }, [content]);

  const toggleContent = () => {
    setIsExpanded(prev => !prev);
  };

  const displayContent = isExpanded 
    ? content 
    : content.slice(0, 200) + (content.length > 200 ? '...' : '');

  return (
    <article className={styles.blogPost}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.blogPostMeta}>
          <span className={styles.blogPostAuthor}>By {author}</span>
          <time className={styles.blogPostDate}>{date}</time>
          <span className={styles.blogPostReadTime}>{readTime} min read</span>
        </div>
      </div>
      
      <div className={styles.blogPostContent}>
        <p>{displayContent}</p>
        {content.length > 200 && (
          <button 
            onClick={toggleContent}
            className="blog-post__expand"
          >
            {isExpanded ? 'Read less' : 'Read more'}
          </button>
        )}
      </div>

      <div className="blog-post__actions">
        <LikeButton initialLikes={0} />
        <CommentSection postId={id} />
      </div>
    </article>
  );
}

BlogPost.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired
};

export default BlogPost;