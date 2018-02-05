import React from 'react';
import { getTimestampAsString } from '../utils';

const Post = ({ post, postStyle }) => {
  const { full } = getTimestampAsString(post.timestamp);
  return (
    <div style={{ ...styles.container, ...postStyle}}>
      <div style={styles.description}>{post.body}</div>
      <div style={styles.description}>{post.title}</div>
      <div style={styles.description}>{full}</div>
      <div style={styles.description}>{post.author}</div>
      <div style={styles.description}>{post.category}</div>
      <div style={styles.description}>{post.voteScore}</div>
      <div style={styles.description}>{post.deleted ? 'true' : 'false'}</div>
      <div style={styles.description}>{post.commentCount}</div>
      <div style={styles.description}>{post.id}</div>
    </div>
  );
};

const styles = {
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    padding: '10px 15px 10px 15px',
    border: '1px solid grey',
    margin: '15px'
  },
  description: {
    flex: 1,
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
}

export { Post };
