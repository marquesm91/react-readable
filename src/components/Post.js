import React from 'react';
import { getTimestampAsString } from '../utils';

const Post = ({ post }) => {
  const { full } = getTimestampAsString(post.timestamp);
  return (
    <div>
      <h2>{post.body}</h2>
      <h3>{post.title}</h3>
      <h3>{full}</h3>
      <h3>{post.author}</h3>
      <h3>{post.category}</h3>
      <h3>{post.voteScore}</h3>
      <h3>{post.deleted}</h3>
      <h3>{post.commentCount}</h3>
      <h4>{post.id}</h4>
    </div>
  );
};

export { Post };
