import React from 'react';
import { Card } from 'antd';
import { getTimestampAsString } from '../utils';

const Comment = ({ item, loading }) => {
  const comment = item;
  const { full } = getTimestampAsString(comment.timestamp);

  return (
    <Card loading={loading} style={{ width: '100%' }}>
      <div style={styles.description}>{comment.body}</div>
      <div style={styles.description}>{full}</div>
      <div style={styles.description}>{comment.author}</div>
      <div style={styles.description}>{comment.voteScore}</div>
      <div style={styles.description}>{comment.deleted ? 'true' : 'false'}</div>
      <div style={styles.description}>{comment.commentCount}</div>
      <div style={styles.description}>{comment.id}</div>
    </Card>
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
