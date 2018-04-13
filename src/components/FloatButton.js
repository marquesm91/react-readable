import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Icon } from 'antd';

import './FloatButton.css';

class FloatButton extends PureComponent {
  state = {
    hover: false
  }

  render() {
    const { hover } = this.state;
    const { className, onClick, category, postId, isDetailsScreen, howManyPostOfCategory, postSelected } = this.props;

    const firstComment = isDetailsScreen && postSelected && postSelected.commentCount === 0;
    const firstPost = howManyPostOfCategory === undefined || howManyPostOfCategory === 0;

    return [
      firstPost || firstComment
        ? <div
            key="help-first"
            className={
              !hover
                ? 'float-new-text fade-in'
                : 'float-new-text fade-out'
            }
          >
            Write the first <strong>{category}</strong> {postId ? 'Comment' : 'Post'}
          </div>
        : null,
      <button
        key="fab"
        className={`float-button ${className}`}
        style={hover ? {width: postId ? '120px' : '90px' } : null}
        onClick={onClick}
        onMouseEnter={() => this.setState({ hover: true })}
        onMouseLeave={() => this.setState({ hover: false })}
      >
        <div className={`float-button-text ${hover ? 'fade-in' : 'fade-out'}`}>{postId ? 'New Comment' : 'New Post'}</div>
        <div className={`float-button-text ${hover ? 'fade-out' : 'fade-in'}`}><Icon type="plus" /></div>
      </button>
    ];
  }
};

const mapStateToProps = ({ posts, comments, categories }, ownProps) => ({
  postSelected: posts.postsList && posts.postsList.find(p => p.id === ownProps.match.params.post_id),
  howManyPostOfCategory: posts.howManyPosts[categories.categorySelected],
  category: categories.categorySelected === '/' || ownProps.match.path === '/:category/:post_id'
    ? ''
    : categories.categorySelected[0].toUpperCase() + categories.categorySelected.substring(1),
  // isDetailsScreen will check if url path is in Post or Posts
  // Post has Comment List -> category is irrelevant and filter won't be necessary
  // Posts has Posts List -> category is relevant and filter will be necessary but only if category is different to '/'
  isDetailsScreen: ownProps.match.path === '/:category/:post_id' ? true : false,
  postId: ownProps.match.params.post_id
})

const FloatButtonWithRouter = withRouter(connect(mapStateToProps)(FloatButton));

export { FloatButtonWithRouter as FloatButton };
