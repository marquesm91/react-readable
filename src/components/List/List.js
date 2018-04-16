import React from 'react';
import sortBy from 'sort-by';
import escapeRegExp from 'escape-string-regexp';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Card, Icon } from 'antd';

import { ListItem } from '../index';

import './List.css';

const List = ({ items, loading, onClick, clicklable, orderBy, orderDir, target, category, isDetailsScreen, query }) => {
  if (loading) {
    return [
      <Card key="1" loading style={{ width: '100%' }} />,
      <Card key="2" loading style={{ width: '100%' }} />
    ];
  }

  // Apply this filter only if items are Post List and category is different to '/'
  const itemsAfterCategoryFilter = !isDetailsScreen && category !== '/'
    ? items.filter(i => i.category === category)
    : items;

  // Apply this filter only if SearchBar query isn't empty
  let itemsAfterSearchFilter = itemsAfterCategoryFilter;
  if (query.length) {
    const match = new RegExp(escapeRegExp(query), 'i');
    itemsAfterSearchFilter = itemsAfterCategoryFilter.filter(i => match.test(i.title) || match.test(i.body) || match.test(i.author));
  }

  // Apply sort only if these two conditions are true
  const itemsAfterSort = itemsAfterSearchFilter.sort(sortBy(`${orderDir === 'new' ? '-' : ''}${orderBy}`));

  return [
    <div
      key="title"
      style={isDetailsScreen
        ? { marginTop: '8px', color: '#777', fontSize: '18px' }
        : { marginTop: '0px', color: '#555', fontSize: '26px' }
      }
      className="list-title border-bottom-gradient"
    >
      {isDetailsScreen
        ? 'Comments'
        : [
            <span key="prefix" style={{ fontWeight: 'bold' }}>
              {category === '/'
                ? 'All '
                : `${category.charAt(0).toUpperCase() + category.substring(1)} `
              }
            </span>,
            'Posts'
          ]
      }
    </div>,
    itemsAfterSort.length
      ? <ol key="list" className="container-list">
          {itemsAfterSort.map(item => (
            <li key={item.id}>
              <ListItem item={item} onClick={itemClicked => onClick(itemClicked)} clicklable={clicklable} />
            </li>
          ))}
        </ol>
      : <div key="empty-list" className={`empty-container-list-${isDetailsScreen ? 'comment' : 'post'}`}>
          {query.length === 0
            ? [
                `Be the first to ${isDetailsScreen ? 'Comment' : 'Post'} something`,
                <div key='bold-text' style={{ fontWeight: 'bold', margin: '0 5px' }}>awesome</div>,
                `about it!`
              ]
            : <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <span>Your filter search bar can't find what you are looking for.</span>
                <span>How about <strong>{isDetailsScreen ? 'Comment' : 'Post'}</strong> it? <Icon type="smile-o" /></span>
              </div>
          }
        </div>
  ];
};

const mapStateToProps = ({ post, category, filter, search, loader }, ownProps) => ({
  category: category.selected,
  orderBy: filter.orderBy,
  orderDir: filter.orderDir,
  query: search,
  loading: loader,
  // isDetailsScreen will check if url path is in Post or Posts
  // Post has Comment List -> category is irrelevant and filter won't be necessary
  // Posts has Posts List -> category is relevant and filter will be necessary but only if category is different to '/'
  isDetailsScreen: ownProps.match.path === '/:category/:post_id' ? true : false
});

const ListConnected = withRouter(connect(mapStateToProps)(List));

export { ListConnected as List };
