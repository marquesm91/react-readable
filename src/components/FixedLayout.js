import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Layout, Menu, Icon, Select } from 'antd';
import {
  getPosts,
  getCategoryPosts,
  getCategories,
  setCategoryObject,
  setFilterOrderDir,
  setFilterOrderBy,
  setTargetFilters
} from '../redux/actions';
import { SearchBar, Modal } from '../components';

import './FixedLayout.css';

const { Header, Sider, Content } = Layout;
const Option = Select.Option;

class FixedLayout extends Component {
  state = {
    collapsed: false
  };

  async componentWillMount() {
    if (!this.props.categories) {
      await this.props.getCategories();
    }
  }

  toggle = () => this.setState({ collapsed: !this.state.collapsed });

  loadPostsHanlder = async e => {
    this.props.setCategory(e.key);
    e.key === '/'
      ? this.props.history.push('/')
      : this.props.history.push(`/${e.key}`);
  }

  render() {
    const { collapsed } = this.state;
    const { children, categories, location, orderBy, orderDir, targetFilters } = this.props;

    return (
      <Layout>
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
        >
          <div className="logo">{collapsed ? 'R' : 'Readable'}</div>
          {!collapsed
            ? <div className="filters-container">
                <div className="filters-container-title">Filters</div>
                <span>Apply to</span>
                <Select value={targetFilters} onChange={value => this.props.setTargetFilters(value)}>
                  <Option value="post">Posts</Option>
                  <Option value="comment">Comments</Option>
                </Select>
                <span>Order by</span>
                <Select value={orderBy} onChange={value => this.props.setFilterOrderBy(value)}>
                  <Option value="voteScore">Vote score</Option>
                  <Option value="timestamp">Date</Option>
                </Select>
                <span>Order direction</span>
                <Select value={orderDir} onChange={value => this.props.setFilterOrderDir(value)}>
                  <Option value="old">{orderBy === 'timestamp' ? 'Most older' : 'Less rated'}</Option>
                  <Option value="new">{orderBy === 'timestamp' ? 'Most newer' : 'Most rated'}</Option>
                </Select>
              </div>
            : null
          }
          <Menu theme="dark" mode="inline" selectedKeys={[location.pathname.substring(1) || '/']} onClick={this.loadPostsHanlder}>
            <Menu.Item key="/">
              <div className="menu-item-sidebar">
                <Icon type="tags" />
                <span>All Categories</span>
              </div>
            </Menu.Item>
            {categories
              ? categories.map(category => (
                  <Menu.Item key={`${category.path}`}>
                    <div className="menu-item-sidebar">
                      <Icon type="tag" />
                      <span>{category.name}</span>
                    </div>
                  </Menu.Item>
                ))
              : null
            }
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
            <SearchBar />
          </Header>
          <Content style={{ padding: '15px', background: '#fff', minHeight: '100vh', position: 'relative' }}>
            {children}
          </Content>
        </Layout>
        <Modal />
      </Layout>
    );
  }
}

const mapStateToProps = ({ posts, categories, filter }) => ({
  posts: posts.postsList,
  categories: categories.categoriesList,
  orderBy: filter.orderBy,
  orderDir: filter.orderDir,
  targetFilters: filter.targetFilters
});

const mapDispatchToProps = dispatch => ({
  getPosts: () => dispatch(getPosts()),
  getCategories: () => dispatch(getCategories()),
  setCategory: category => dispatch(setCategoryObject(category)),
  getCategoryPosts: category => dispatch(getCategoryPosts(category)),
  setFilterOrderBy: orderBy => dispatch(setFilterOrderBy(orderBy)),
  setFilterOrderDir: orderDir => dispatch(setFilterOrderDir(orderDir)),
  setTargetFilters: targetFilters => dispatch(setTargetFilters(targetFilters))
});

const FixedLayoutConnected = withRouter(connect(mapStateToProps, mapDispatchToProps)(FixedLayout));

export { FixedLayoutConnected as FixedLayout };
