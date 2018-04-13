import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Layout } from 'antd';

import {
  List as PostList,
  FloatButton
} from '../components';

import {
  getPosts,
  setModal,
  setCategory,
  setAPIFetching
} from '../redux/actions';

const { Content } = Layout;

class Posts extends Component {
  async componentDidMount() {
    const { path, params } = this.props.match;
    if (path === '/:category') {
      this.props.setCategory(params.category);
    }

    if (this.props.posts.length === 0) {
      this.props.setAPIFetching(true);
      await this.props.getPosts();
      this.props.setAPIFetching(false);
    }
  }

  onClickPostHandler = post => this.props.history.push(`/${post.category}/${post.id}`);

  render() {
    const { posts, addNewPost, loading } = this.props;

    return (
      <Content>
        <PostList items={posts} onClick={this.onClickPostHandler} clicklable />
        {!loading ? <FloatButton onClick={() => addNewPost()} /> : null}
      </Content>
    );
  }
}

const mapStateToProps = ({ post, loader }) => ({
  posts: post.list,
  loading: loader
});

const mapDispatchToProps = dispatch => ({
  getPosts: () => dispatch(getPosts()),
  addNewPost: () => dispatch(setModal({ title: '', body: '', author: '', category: '' })),
  setCategory: category => dispatch(setCategory(category)),
  setAPIFetching: apiFetching => dispatch(setAPIFetching(apiFetching))
});

const PostsConnected = withRouter(connect(mapStateToProps, mapDispatchToProps)(Posts));

export { PostsConnected as Posts };
