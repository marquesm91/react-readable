import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Layout } from 'antd';

import { List as PostList, FloatButton } from '../components';
import { getPosts, getCategoryPosts, setModal } from '../redux/actions';

const { Content } = Layout;

class Posts extends Component {
  async componentDidMount() {
    if (!this.props.posts) {
      await this.props.getPosts();
    }
  }

  onClickPostHandler = post => this.props.history.push(`/${post.category}/${post.id}`);

  render() {
    const { posts, addNewPost } = this.props;

    return (
      <Content style={{ minHeight: '100vh', boxSizing: 'border-box' }}>
        <PostList items={posts} onClick={this.onClickPostHandler} clicklable />
        <FloatButton onClick={() => addNewPost()} />
      </Content>
    );
  }
}

const mapStateToProps = ({ posts }) => ({
  posts: posts.postsList
});

const mapDispatchToProps = dispatch => ({
  getCategoryPosts: category => dispatch(getCategoryPosts(category)),
  getPosts: () => dispatch(getPosts()),
  addNewPost: () => dispatch(setModal({ title: '', body: '', author: '', category: '' }))
});

const PostsConnected = withRouter(connect(mapStateToProps, mapDispatchToProps)(Posts));

export { PostsConnected as Posts };
