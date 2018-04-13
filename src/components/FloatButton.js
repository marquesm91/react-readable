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
    const { className, onClick, labels, postId, isDetailsScreen, howManyPostOfCategory, postSelected, leftSide } = this.props;

    const firstComment = isDetailsScreen && postSelected && postSelected.commentCount === 0;
    const firstPost = howManyPostOfCategory === undefined || howManyPostOfCategory === 0;

    return [
      (firstPost || firstComment) && !leftSide
        ? <div
            key="help-first"
            className={
              !hover
                ? 'float-new-text fade-in'
                : 'float-new-text fade-out'
            }
          >
            Write the first <strong>{labels.rightSide}</strong> <strong>{postId ? 'Comment' : 'Post'}</strong>
          </div>
        : null,
      <button
        key="fab"
        className={`float-button ${leftSide ? 'float-left-side-button' : ''}`}
        style={hover
          ? { width: labels.rightSide ? '150px' : '90px' }
          : null
        }
        onClick={onClick}
        onMouseEnter={() => this.setState({ hover: true })}
        onMouseLeave={() => this.setState({ hover: false })}
      >
        <div className={`float-button-text ${hover ? 'fade-in' : 'fade-out'}`}>
          {leftSide
            ? `Back to ${labels.leftSide}`
            : postId
              ? `New ${labels.rightSide} Comment`
              : `New ${labels.rightSide} Post`
          }
        </div>
        <div className={`float-button-text ${hover ? 'fade-out' : 'fade-in'}`}>
          <Icon type={leftSide ? `left`: `plus`} />
        </div>
      </button>
    ];
  }
};

const mapStateToProps = ({ post, comment, category }, ownProps) => ({
  postSelected: post.list && post.list.find(p => p.id === ownProps.match.params.post_id),
  howManyPostOfCategory: post.categoryCount[category.selected],
  labels: category.selected === '/'
    ? { leftSide: 'Home', rightSide: '' }
    : {
        leftSide: category.selected[0].toUpperCase() + category.selected.substring(1),
        rightSide: category.selected[0].toUpperCase() + category.selected.substring(1),
      },
  // isDetailsScreen will check if url path is in Post or Posts
  // Post has Comment List -> category is irrelevant and filter won't be necessary
  // Posts has Posts List -> category is relevant and filter will be necessary but only if category is different to '/'
  isDetailsScreen: ownProps.match.path === '/:category/:post_id' ? true : false,
  postId: ownProps.match.params.post_id
})

const FloatButtonWithRouter = withRouter(connect(mapStateToProps)(FloatButton));

export { FloatButtonWithRouter as FloatButton };
