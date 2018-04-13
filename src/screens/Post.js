import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout } from 'antd';

import {
  ListItem as SinglePost,
  List as Comments,
  FloatButton
} from '../components';

import {
  getPosts,
  getPost,
  selectPost,
  setComments,
  getPostComments,
  setModal,
  setAPIFetching,
  setTargetFilter
} from '../redux/actions';

const { Content } = Layout;

class Post extends Component {
  async componentWillMount() {
    const { post_id } = this.props.match.params;
    this.props.setTargetFilter('comment');

    this.props.setAPIFetching(true);
    if (this.props.posts.length === 0) {
      await this.props.getPosts();
    }
    await this.props.getPost(post_id);
    await this.props.getPostComments(post_id);
    this.props.setAPIFetching(false);
  }

  componentWillUnmount() {
    this.props.setTargetFilter('post');
    if (this.props.post) {
      this.props.selectPost(null);
      this.props.setComments([]);
    }
  }

  buttonBackHandler = () => {
    const { history, category } = this.props;
    history.push(`${category === '/' ? category : '/' + category}`);
  }

  render() {
    const { posts, postSelectedId, comments, addNewComment, loading } = this.props;

    const post = postSelectedId === -1
      ? -1 // -1 is a special case when fetch for a post that doesn't exist anymore in API
      : posts.find(p => p.id === postSelectedId);

    return (
      <Content>
        <SinglePost item={post} />
        <Comments items={comments} />
        {!loading ? <FloatButton onClick={() => addNewComment(post.id)} /> : null}
        <FloatButton leftSide onClick={this.buttonBackHandler} />
      </Content>
    );
  }
}

const mapStateToProps = ({ post, comment, loader, category }) => ({
  category: category.selected,
  posts: post.list,
  postSelectedId: post.selected,
  comments: comment,
  loading: loader
});

const mapDispatchToProps = dispatch => ({
  getPosts: () => dispatch(getPosts()),
  getPost: id => dispatch(getPost(id)),
  selectPost: id => dispatch(selectPost(id)),
  setComments: id => dispatch(setComments(id)),
  getPostComments: id => dispatch(getPostComments(id)),
  addNewComment: parentId => dispatch(setModal({ id: parentId, body: '', author: '' })),
  setAPIFetching: apiFetching => dispatch(setAPIFetching(apiFetching)),
  setTargetFilter: target => dispatch(setTargetFilter(target))
});

const PostConnected = connect(mapStateToProps, mapDispatchToProps)(Post);

export { PostConnected as Post };
