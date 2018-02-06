import React from 'react';
import { getTimestampAsString } from '../utils';

const Comment = ({ comment, commentStyle }) => {
  const { full } = getTimestampAsString(comment.timestamp);
  return (
    <div style={{ ...styles.container, ...commentStyle}}>
      <div style={styles.description}>{comment.body}</div>
      <div style={styles.description}>{full}</div>
      <div style={styles.description}>{comment.author}</div>
      <div style={styles.description}>{comment.voteScore}</div>
      <div style={styles.description}>{comment.deleted ? 'true' : 'false'}</div>
      <div style={styles.description}>{comment.commentCount}</div>
      <div style={styles.description}>{comment.id}</div>
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

export { Comment };
