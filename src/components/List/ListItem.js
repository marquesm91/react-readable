import React from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Card, Icon, Popconfirm } from 'antd';

import { getTimestampAsString } from '../../utils';

import {
  votePost,
  deletePost,
  voteComment,
  deleteComment,
  setModal
} from '../../redux/actions';

const getColorVoteScoreStyle = (voteScore) => {
  if (voteScore > 0) {
    return { color: '#7ac479' };
  } else if (voteScore < 0) {
    return { color: '#e28c8c' };
  } else {
    return { color: '#888' };
  }
}

const ListItem = ({ item, loading, onClick, clicklable, isDetailsScreen, category, ...props }) => {
  if (loading) {
    return <Card loading />
  }

  // when loading is false and can't find any item (result -1) redirect to 404 not found
  if (item === -1) {
    return <Redirect to="/not-found" />;
  }

  if (item === undefined) {
    // Redirect to props.category when is a deleted Post and is in Post screen
    return isDetailsScreen
      ? <Redirect to={category === '/' ? category : `/${category}`} />
      : null;
  }

  const isPost = item && item.title !== undefined;

  return (
    <Card
      hoverable={!isDetailsScreen}
      onClick={e => {e.stopPropagation(); if (!isDetailsScreen) { onClick(item) }}}
      style={{
        cursor: !isDetailsScreen ? 'pointer' : 'default',
        margin: isPost ? '0px' : '15px 0px 0px 35px'
      }}
    >
      <div className={`list-item-container ${isPost ? 'post-container' : 'comment-container'}`}>
        <div className="list-item-left-container">
          <div className="list-item-vote-container">
            <Icon className="icon-caret-up" type="caret-up" onClick={e => {e.stopPropagation(); isPost ? props.votePost(item.id, "upVote") : props.voteComment(item.id, "upVote")}} />
            <span className="list-item-votescore" style={getColorVoteScoreStyle(item.voteScore)}>
              {item.voteScore}
            </span>
            <Icon className="icon-caret-down" type="caret-down" onClick={e => {e.stopPropagation(); isPost ? props.votePost(item.id, "downVote") : props.voteComment(item.id, "downVote")}} />
          </div>
          {isPost
            ? [
                <div key="tag" className="list-item-tag-container">
                  <span className="list-item-tag">{item.category}</span>
                </div>,
                <div key="comment-counter" className="list-item-comment-counter-container">
                  <span>{`${item.commentCount} comment${item.commentCount !== 1 ? 's' : ''}`}</span>
                </div>
              ]
            : null
          }
        </div>
        <div className="list-item-right-container">
          {isPost
            ? <div className="list-item-header border-bottom-gradient">
                {clicklable
                  ? <span className="list-item-title hover-effects">
                      {item.title}
                    </span>
                  : <span className="list-item-title">{item.title}</span>
                }
              </div>
            : null
          }
          <div
            className="list-item-content"
            style={isPost
              ? { minHeight: '95px', margin: '15px 0' }
              : { minHeight: '40px', margin: '0px', paddingLeft: '15px' }
            }
          >
            {item.body}
          </div>
          <div className="list-item-footer" style={{ paddingLeft: isPost ? '0px' : '15px' }}>
            <div className="list-item-action-buttons-container">
              <Popconfirm
                placement="top"
                title="Are you sure?"
                onCancel={e => e.stopPropagation()}
                onConfirm={e => {e.stopPropagation(); isPost ? props.deletePost(item.id) : props.deleteComment(item.id)}}
                okText="Yes"
                cancelText="No"
              >
                <button className="list-item-action-button" onClick={e => e.stopPropagation()}>Delete</button>
              </Popconfirm>
              <button className="list-item-action-button" onClick={e => {e.stopPropagation(); isPost ? props.editPost(item) : props.editComment(item)}}>Edit</button>
            </div>
            <div className="list-item-author-container">
              <span>
                <span style={{ fontWeight: 500 }}>{isPost ? 'posted' : 'commented'}</span> {getTimestampAsString(item.timestamp)}
              </span>
              <span>by <span style={{ fontWeight: 'bold' }}>{item.author}</span></span>
            </div>
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
