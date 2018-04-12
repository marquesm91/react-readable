import React from 'react';
import { connect } from 'react-redux';
import { Card, Icon, Button, Popconfirm } from 'antd';

import { votePost, deletePost, voteComment, deleteComment, setModal } from '../../redux/actions';
import { getTimestampAsString } from '../../utils';

const ListItem = ({ item, loading, onClick, clicklable, votePost, editPost, deletePost, voteComment, editComment, deleteComment }) => {
  if (!item) {
    return <Card loading />
  }

  if (item.deleted) {
    return null;
  }

  const { full } = getTimestampAsString(item.timestamp);
  const isPost = item && item.title !== undefined;

  return (
    <Card loading={loading}>
      <div className="list-item-container">
        <div className="list-item-left-info-container">
          <Icon type="caret-up" onClick={e => {e.stopPropagation(); isPost ? votePost(item.id, "upVote") : voteComment(item.id, "upVote")}} />
          <div>{item.voteScore}</div>
          <Icon type="caret-down" onClick={e => {e.stopPropagation(); isPost ? votePost(item.id, "downVote") : voteComment(item.id, "downVote")}} />
          {isPost
            ? [
                <div key="category" className="list-item-tag-category">{item.category}</div>,
                <div key="commentCount">{item.commentCount} comments</div>
              ]
            : null
          }
        </div>
        <div className="list-item-content-container">
          {isPost
            ? <div className="list-item-header">
                <span
                  className={`list-item-title ${clicklable ? 'hover-effects' : ''}`}
                  onClick={e => {e.stopPropagation(); clicklable ? onClick(item) : null}}
                >
                  {item.title}
                </span>
              </div>
            : null
          }
          <div className="list-item-content">
            <div>{item.body}</div>
          </div>
          <div className="list-item-footer">
            <div>{full}</div>
            <div>{item.author}</div>
            <Popconfirm
              placement="top"
              title={'Are you sure?'}
              onCancel={e => e.stopPropagation()}
              onConfirm={e => {e.stopPropagation(); isPost ? deletePost(item.id) : deleteComment(item.id)}}
              okText="Yes"
              cancelText="No"
            >
              <Button type="danger" onClick={e => e.stopPropagation()}>Delete</Button>
            </Popconfirm>
            <Button onClick={e => {e.stopPropagation(); isPost ? editPost(item) : editComment(item)}}>Edit</Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

const mapDispatchToProps = dispatch => ({
  votePost: (id, option) => dispatch(votePost(id, option)),
  deletePost: id => dispatch(deletePost(id)),
  editPost: post => dispatch(setModal({ id: post.id, title: post.title, body: post.body, author: post.author, category: post.category })),
  voteComment: (id, option) => dispatch(voteComment(id, option)),
  deleteComment: id => dispatch(deleteComment(id)),
  editComment: comment => dispatch(setModal({ id: comment.id, body: comment.body, author: comment.author }))
});

const ListItemConnected = connect(null, mapDispatchToProps)(ListItem);

export { ListItemConnected as ListItem };
