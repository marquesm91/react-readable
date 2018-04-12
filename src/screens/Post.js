import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Layout, Card } from 'antd';

import { ListItem as SinglePost, List as Comments, FloatButton } from '../components';
import { getPosts, selectPostObject, getPost, getPostComments, setModal } from '../redux/actions';

const { Content } = Layout;

class Post extends Component {
  state = {
    loading: true
  }

  async componentDidMount() {
    const { post_id } = this.props.match.params;

    if (!this.props.posts) {
      await this.props.getPosts();
    }
    await this.props.getPost(post_id);
    await this.props.getPostComments(post_id);
    this.setState({ loading: false });
  }

  componentWillUnmount() {
    this.props.selectPost(null);
  }

  render() {
    const { loading } = this.state;
    const { postId, posts, comments, addNewComment } = this.props;

    const post = posts && posts.find(p => p.id === postId);

    if (loading) {
      return <Card loading />;
    }

    if (!post) {
      return <Redirect to='/not-found' />;
    }

    if (post && post.deleted) {
      return <Redirect to='/' />;
    }

    return (
      <Content style={{ minHeight: '100vh' }}>
        <SinglePost item={post} />
        <Comments items={comments} onClick={item => console.log(item)} />
        <FloatButton onClick={() => addNewComment(post.id)} />
      </Content>
    );
  }
}

const mapStateToProps = ({ posts, categories, comments }) => {
  return {
    posts: posts.postsList,
    postId: posts.postSelected ? posts.postSelected.id : null,
    comments: comments.commentsList
    /*categories: categories.categoriesList,
    category: categories.categorySelected,
    comments: comments.commentsList,
    commentSelected: comments.commentSelected,
    postsOrderBy: posts.orderBy,
    postsOrderDir: posts.orderDir,
    postsSortBy: (posts.orderDir === 'desc' ? '-' : '') + posts.orderBy*/
  };
};

const mapDispatchToProps = dispatch => ({
  selectPost: post => dispatch(selectPostObject(post)),
  getPost: id => dispatch(getPost(id)),
  getPostComments: id => dispatch(getPostComments(id)),
  addNewComment: parentId => dispatch(setModal({ id: parentId, body: '', author: '' })),
  getPosts: () => dispatch(getPosts()),
  /*setPostsOrderBy: orderBy => dispatch(setPostsOrderByObject(orderBy)),
  setPostsOrderDir: orderDir => dispatch(setPostsOrderDirObject(orderDir)),
  getCategoryPosts: category => dispatch(getCategoryPosts(category)),
  setCategory: category => dispatch(setCategoryObject(category)),
  addPost: post => dispatch(addPost(post)),
  votePost: (id, option) => dispatch(votePost(id, option)),
  editPost: (id, content) => dispatch(editPost(id, content)),
  deletePost: id => dispatch(deletePost(id)),
  getCategories: () => dispatch(getCategories()),
  addComment: comment => dispatch(addComment(comment)),
  voteComment: (id, comment) => dispatch(voteComment(id, comment)),
  getPostComments: id => dispatch(getPostComments(id)),
  selectComment: comment => dispatch(selectCommentObject(comment))*/
});

const PostConnected = connect(mapStateToProps, mapDispatchToProps)(Post);

export { PostConnected as Post };
