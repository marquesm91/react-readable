import React from 'react';
import { Card } from 'antd';
import { getTimestampAsString } from '../utils';

import './Post.css';

const Post = ({ item, loading }) => {
  const post = item;

  if (!post) {
    return <Card loading style={{ width: '100%' }} />
  }
  
  const { full } = getTimestampAsString(post.timestamp);

  return (
    <Card loading={loading} style={{ width: '100%' }}>
      <div className="post-description">{post.title}</div>
      <div className="post-description">{post.body}</div>
      <div className="post-description">{full}</div>
      <div className="post-description">{post.author}</div>
      <div className="post-description">{post.category}</div>
      <div className="post-description">{post.voteScore}</div>
      <div className="post-description">{post.deleted ? 'true' : 'false'}</div>
      <div className="post-description">{post.commentCount}</div>
      <div className="post-description">{post.id}</div>
    </Card>
  );
};

export { Post };
