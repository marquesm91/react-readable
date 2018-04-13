import React from 'react';
import sortBy from 'sort-by';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Card } from 'antd';

import { ListItem } from '../index';

import './List.css';

const List = ({ items, onClick, clicklable, orderBy, orderDir, target, category, isDetailsScreen }) => {
  if (!items) {
    return [
      <Card key="1" loading style={{ width: '100%' }} />,
      <Card key="2" loading style={{ width: '100%' }} />,
      <Card key="3" loading style={{ width: '100%' }} />
    ];
  }

  // Apply filter only if items are Post List and category is different to '/'
  const itemsAfterFilter = !isDetailsScreen && category !== '/'
    ? items.filter(i => i.category === category)
    : items;

  // Apply sort only if these two conditions are true
  const itemsAfterSort = (isDetailsScreen && target === 'comment') || (!isDetailsScreen && target === 'post')
    ? itemsAfterFilter.sort(sortBy(`${orderDir === 'new' ? '-' : ''}${orderBy}`))
    : itemsAfterFilter;

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

const mapStateToProps = ({ posts, categories, filter }, ownProps) => ({
  category: categories.categorySelected,
  orderBy: filter.orderBy,
  orderDir: filter.orderDir,
  target: filter.targetFilters,

  // isDetailsScreen will check if url path is in Post or Posts
  // Post has Comment List -> category is irrelevant and filter won't be necessary
  // Posts has Posts List -> category is relevant and filter will be necessary but only if category is different to '/'
  isDetailsScreen: ownProps.match.path === '/:category/:post_id' ? true : false
});

const ListConnected = withRouter(connect(mapStateToProps)(List));

export { ListConnected as List };
