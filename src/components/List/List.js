import React from 'react';
import sortBy from 'sort-by';
import escapeRegExp from 'escape-string-regexp';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Card } from 'antd';

import { ListItem } from '../index';

import './List.css';

const List = ({ items, loading, onClick, clicklable, orderBy, orderDir, target, category, isDetailsScreen, query }) => {
  if (!items || loading) {
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
  const itemsAfterSort = (isDetailsScreen && target === 'comment') || (!isDetailsScreen && target === 'post')
    ? itemsAfterSearchFilter.sort(sortBy(`${orderDir === 'new' ? '-' : ''}${orderBy}`))
    : itemsAfterSearchFilter;

  return (
    <ol className="container-list">
      {itemsAfterSort.map(item => (
        <li key={item.id}>
          <ListItem item={item} onClick={itemClicked => onClick(itemClicked)} clicklable={clicklable} />
        </li>
      ))}
    </ol>
  );
};

const mapStateToProps = ({ post, category, filter, search, loader }, ownProps) => ({
  category: category.selected,
  orderBy: filter.orderBy,
  orderDir: filter.orderDir,
  target: filter.target,
  query: search,
  loading: loader,
  // isDetailsScreen will check if url path is in Post or Posts
  // Post has Comment List -> category is irrelevant and filter won't be necessary
  // Posts has Posts List -> category is relevant and filter will be necessary but only if category is different to '/'
  isDetailsScreen: ownProps.match.path === '/:category/:post_id' ? true : false
});

const ListConnected = withRouter(connect(mapStateToProps)(List));

export { ListConnected as List };
