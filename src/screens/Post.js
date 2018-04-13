import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout } from 'antd';

import { ListItem as SinglePost, List as Comments, FloatButton } from '../components';
import { getPosts, getPost, getPostComments, setModal } from '../redux/actions';

const { Content } = Layout;

class Post extends Component {
  state = {
    loading: true
  }

  componentDidMount() {
    const { post_id } = this.props.match.params;

    Promise.all([
      !this.props.posts ? this.props.getPosts() : null,
      this.props.getPost(post_id),
      this.props.getPostComments(post_id)
    ])
      .then(() => this.setState({ loading: false }));
  }

  render() {
    const { loading } = this.state;
    const { post, comments, addNewComment } = this.props;

    return (
      <Content style={{ minHeight: '100vh' }}>
        <SinglePost item={post} loading={loading} />
        <Comments items={comments} loading={loading} />
        <FloatButton onClick={() => addNewComment(post.id)} />
      </Content>
    );
  }
}

const mapStateToProps = ({ posts, comments }) => ({
  post: posts.postsList && posts.postsList.find(p => p.id === posts.postSelected),
  comments: comments.commentsList
});

const mapDispatchToProps = dispatch => ({
  getPost: id => dispatch(getPost(id)),
  getPostComments: id => dispatch(getPostComments(id)),
  addNewComment: parentId => dispatch(setModal({ id: parentId, body: '', author: '' })),
  getPosts: () => dispatch(getPosts())
});

const PostConnected = connect(mapStateToProps, mapDispatchToProps)(Post);

export { PostConnected as Post };
