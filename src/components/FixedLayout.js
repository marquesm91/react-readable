import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Layout, Menu, Icon } from 'antd';
import { getPosts, getCategoryPosts, getCategories } from '../redux/actions';
import { SearchBar, Modal } from '../components';

import './FixedLayout.css';

const { Header, Sider, Content } = Layout;

class FixedLayout extends Component {
  state = {
   collapsed: false
  };

  async componentWillMount() {
    if (!this.props.categories) {
      await this.props.getCategories();
    }
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  loadPostsHanlder = async e => {
    if (e.key === '/') {
      await this.props.getPosts();
      this.props.history.push('/');
    } else {
      await this.props.getCategoryPosts(e.key);
      this.props.history.push(`/${e.key}`);
    }
  }

  render() {
    const { collapsed } = this.state;
    const { children, categories, location } = this.props;

    return (
      <Layout>
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
        >
          <div className="logo">{collapsed ? 'R' : 'Readable'}</div>
          <Menu theme="dark" mode="inline" selectedKeys={[location.pathname.substring(1) || '/']} onClick={this.loadPostsHanlder}>
            <Menu.Item key="/">
              <div className="menu-item-sidebar">
                <Icon type="user" />
                <span>All Categories</span>
              </div>
            </Menu.Item>
            {categories
              ? categories.map(category => (
                  <Menu.Item key={`${category.path}`}>
                    <div className="menu-item-sidebar">
                      <Icon type="user" />
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
          <Content style={{ padding: '15px', background: '#fff', minHeight: '100vh' }}>
            {children}
          </Content>
        </Layout>
        <Modal />
      </Layout>
    );
  }
}

const mapStateToProps = ({ posts, categories }) => ({
  posts: posts.postsList,
  categories: categories.categoriesList
});

const mapDispatchToProps = dispatch => ({
  getPosts: () => dispatch(getPosts()),
  getCategories: () => dispatch(getCategories()),
  getCategoryPosts: category => dispatch(getCategoryPosts(category))
});

const FixedLayoutConnected = withRouter(connect(mapStateToProps, mapDispatchToProps)(FixedLayout));

export { FixedLayoutConnected as FixedLayout };
