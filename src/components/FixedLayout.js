import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Layout, Menu, Icon, Select } from 'antd';

import {
  SearchBar,
  Modal
} from '../components';

import {
  getPosts,
  getCategories,
  setCategory,
  setOrderByFilter,
  setOrderDirFilter
} from '../redux/actions';

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
    const { children, categories, location, orderBy, orderDir, target } = this.props;

    return (
      <Layout>
        <Sider
          className="sider-classname"
          trigger={null}
          collapsible
          collapsed={collapsed}
        >
          <div className="logo">
            {collapsed
              ? <span style={{ display: 'flex', justifyContent: 'center' }}>R</span>
              : <span style={{ display: 'flex', justifyContent: 'flex-start' }}>Readable</span>
            }
          </div>
          {!collapsed
            ? <div className="filters-container">
                <div className="filters-container-title">{`${target === 'comment' ? 'Comment' : 'Post'} Filters`}</div>
                <div className="mask-and-filters-container">
                  <div className="mask-lines-container">
                    <div className="mask-line border-bottom-gradient"></div>
                    <div className="mask-line border-bottom-gradient"></div>
                  </div>
                  <div className="filters">
                    <span>Order by</span>
                    <Select value={orderBy} onChange={value => this.props.setOrderByFilter(value)}>
                      <Option value="voteScore">Vote score</Option>
                      <Option value="timestamp">Date</Option>
                    </Select>
                    <span>Order direction</span>
                    <Select value={orderDir} onChange={value => this.props.setOrderDirFilter(value)}>
                      <Option value="old">{orderBy === 'timestamp' ? 'Most older' : 'Less rated'}</Option>
                      <Option value="new">{orderBy === 'timestamp' ? 'Most newer' : 'Most rated'}</Option>
                    </Select>
                  </div>
                </div>
              </div>
            : null
          }
          <Menu
            mode="inline"
            className="menu-sidebar"
            selectedKeys={[location.pathname.substring(1) || '/']}
            onClick={this.loadPostsHanlder}
          >
            <Menu.Item key="/">
              <div className="menu-item-sidebar">
                <Icon type="heart-o" />
                <span>All Categories</span>
              </div>
            </Menu.Item>
            {categories
              ? categories.map(category => (
                  <Menu.Item key={`${category.path}`}>
                    <div className="menu-item-sidebar">
                      <img
                        alt="logo"
                        style={collapsed
                          ? { width: '20px', height: '20px', marginRight: '0px' }
                          : { width: '16px', height: '16px', marginRight: '10px' }
                        }
                        src={require(`../assets/${category.name}-logo.png`)}
                      />
                      {collapsed
                        ? ''
                        : category.name.charAt(0).toUpperCase() + category.name.substring(1)
                      }
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
          <Content style={{ padding: '15px', background: '#fff', height: '100%', position: 'relative' }}>
            {children}
          </Content>
        </Layout>
        <Modal />
      </Layout>
    );
  }
}

const mapStateToProps = ({ post, category, filter }) => ({
  posts: post.list,
  categories: category.list,
  orderBy: filter.orderBy,
  orderDir: filter.orderDir,
  target: filter.target
});

const mapDispatchToProps = dispatch => ({
  getPosts: () => dispatch(getPosts()),
  getCategories: () => dispatch(getCategories()),
  setCategory: category => dispatch(setCategory(category)),
  setOrderByFilter: orderBy => dispatch(setOrderByFilter(orderBy)),
  setOrderDirFilter: orderDir => dispatch(setOrderDirFilter(orderDir))
});

const FixedLayoutConnected = withRouter(connect(mapStateToProps, mapDispatchToProps)(FixedLayout));

export { FixedLayoutConnected as FixedLayout };
