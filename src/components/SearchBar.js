import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Input, Icon, Menu, Dropdown } from 'antd';
/*import {
  getPosts,
  getCategoryPosts,
  addPost,
  votePost,
  editPost,
  deletePost,
  getPost,
  getCategories,
  addComment,
  voteComment,
  getPostComments,
  setCategoryObject,
  selectPostObject,
  selectCommentObject,
  setPostsOrderByObject,
  setPostsOrderDirObject
} from '../redux/actions';*/

const Search = Input.Search;
const SubMenu = Menu.SubMenu;

class SearchBar extends Component {
  searchHandler = query => {
    console.log(query)
  }

  render() {
    const menu = (
      <Menu>
        <Menu.Item>1st menu item</Menu.Item>
        <Menu.Item>2nd menu item</Menu.Item>
        <SubMenu title="sub menu">
          <Menu.Item>3rd menu item</Menu.Item>
          <Menu.Item>4th menu item</Menu.Item>
        </SubMenu>
        <SubMenu title="disabled sub menu" disabled>
          <Menu.Item>5d menu item</Menu.Item>
          <Menu.Item>6th menu item</Menu.Item>
        </SubMenu>
      </Menu>
    );

    return (
      <Search
        style={{ width: '100%' }}
        placeholder="Search for something..."
        onSearch={this.searchHandler}
        prefix={
          <Dropdown overlay={menu} trigger={['click']}>
            <Icon type="filter" className="searchbar-filter-icon" />
          </Dropdown>
        }
      />
    );
  }
}

const mapStateToProps = ({ posts, categories, comments }) => ({
});

const mapDispatchToProps = dispatch => ({
});

const SearchBarConnected = connect(mapStateToProps, mapDispatchToProps)(SearchBar);

export { SearchBarConnected as SearchBar};
