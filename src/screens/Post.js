import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout } from 'antd';

import { ListItem as SinglePost, List as Comments, FloatButton } from '../components';
import { getPosts, getPost, getPostComments, setModal, setAPIFetching } from '../redux/actions';

const { Content } = Layout;

class Post extends Component {
  componentDidMount() {
    const { post_id } = this.props.match.params;

    this.props.setAPIFetching(true);
    Promise.all([
      !this.props.posts ? this.props.getPosts() : null,
      this.props.getPost(post_id),
      this.props.getPostComments(post_id)
    ])
      .then(() => this.props.setAPIFetching(false));
  }

  render() {
    const { post, comments, addNewComment, loading } = this.props;

    return (
      <Content style={{ minHeight: '100vh' }}>
        <SinglePost item={post} />
        <Comments items={comments} />
        {!loading ? <FloatButton onClick={() => addNewComment(post.id)} /> : null}
      </Content>
    );
  }
}

const mapStateToProps = ({ posts, comments, loader }) => ({
  post: posts.postsList && posts.postsList.find(p => p.id === posts.postSelected),
  comments: comments.commentsList,
  loading: loader
});

const mapDispatchToProps = dispatch => ({
  getPosts: () => dispatch(getPosts()),
  getPost: id => dispatch(getPost(id)),
  getPostComments: id => dispatch(getPostComments(id)),
  addNewComment: parentId => dispatch(setModal({ id: parentId, body: '', author: '' })),
  setAPIFetching: apiFetching => dispatch(setAPIFetching(apiFetching))
});

const PostConnected = connect(mapStateToProps, mapDispatchToProps)(Post);

export { PostConnected as Post };
