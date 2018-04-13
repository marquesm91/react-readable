import React from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Card, Icon, Button, Popconfirm } from 'antd';

import { getTimestampAsString } from '../../utils';

import {
  votePost,
  deletePost,
  voteComment,
  deleteComment,
  setModal
} from '../../redux/actions';

const ListItem = ({ item, loading, onClick, clicklable, isDetailsScreen, category, ...props }) => {
  //console.log(item, loading);
  if (loading) {
    return <Card loading />
  }

  // when loading is false and can't find any item (result -1) redirect to 404 not found
  if (item === -1) {
    return <Redirect to="/not-found" />;
  }

  if (item === undefined) {
    console.log(item)
    // Redirect to props.category when is a deleted Post and is in Post screen
    return isDetailsScreen
      ? <Redirect to={category === '/' ? category : `/${category}`} />
      : null;
  }

  const isPost = item && item.title !== undefined;

  return (
    <Card>
      <div className="list-item-container">
        <div className="list-item-left-info-container">
          <Icon type="caret-up" onClick={e => {e.stopPropagation(); isPost ? props.votePost(item.id, "upVote") : props.voteComment(item.id, "upVote")}} />
          <div>{item.voteScore}</div>
          <Icon type="caret-down" onClick={e => {e.stopPropagation(); isPost ? props.votePost(item.id, "downVote") : props.voteComment(item.id, "downVote")}} />
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
                {clicklable
                  ? <span className="list-item-title hover-effects" onClick={e => {e.stopPropagation(); onClick(item)}}>
                      {item.title}
                    </span>
                  : <span className="list-item-title">{item.title}</span>
                }
              </div>
            : null
          }
          <div className="list-item-content">
            <div>{item.body}</div>
          </div>
          <div className="list-item-footer">
            <div>{getTimestampAsString(item.timestamp)}</div>
            <div>{item.author}</div>
            <Popconfirm
              placement="top"
              title={'Are you sure?'}
              onCancel={e => e.stopPropagation()}
              onConfirm={e => {e.stopPropagation(); isPost ? props.deletePost(item.id) : props.deleteComment(item.id)}}
              okText="Yes"
              cancelText="No"
            >
              <Button type="danger" onClick={e => e.stopPropagation()}>Delete</Button>
            </Popconfirm>
            <Button onClick={e => {e.stopPropagation(); isPost ? props.editPost(item) : props.editComment(item)}}>Edit</Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

const mapStateToProps = ({ category, loader }, ownProps) => ({
  category: category.selected,
  loading: loader,
  // isDetailsScreen will check if url path is in Post or Posts
  // Post has Comment List -> category is irrelevant and filter won't be necessary
  // Posts has Posts List -> category is relevant and filter will be necessary but only if category is different to '/'
  isDetailsScreen: ownProps.match.path === '/:category/:post_id' ? true : false
});

const mapDispatchToProps = dispatch => ({
  votePost: (id, option) => dispatch(votePost(id, option)),
  deletePost: id => dispatch(deletePost(id)),
  editPost: post => dispatch(setModal({ id: post.id, title: post.title, body: post.body, author: post.author, category: post.category })),
  voteComment: (id, option) => dispatch(voteComment(id, option)),
  deleteComment: id => dispatch(deleteComment(id)),
  editComment: comment => dispatch(setModal({ id: comment.id, body: comment.body, author: comment.author }))
});

const ListItemConnected = withRouter(connect(mapStateToProps, mapDispatchToProps)(ListItem));

export { ListItemConnected as ListItem };
