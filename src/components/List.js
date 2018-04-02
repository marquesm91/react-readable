import React from 'react';
import sb from 'sort-by';
import { Card } from 'antd';

import './List.css';

const List = ({ items, item, sortBy, clickable, onClickItem }) => {
  if (!items) {
    return [
      <Card key="1" loading style={{ width: '100%' }} />,
      <Card key="2" loading style={{ width: '100%' }} />,
      <Card key="3" loading style={{ width: '100%' }} />
    ];
  }

  const itemsBeforeMap = sortBy
    ? items.sort(sb(sortBy))
    : items;

  const Item = item;

  return (
    <ol className="container-list">
      {itemsBeforeMap.map((item, index) => (
        <li key={item.id || index} style={{ cursor: clickable ? 'pointer' : 'default' }} onClick={() => onClickItem(item)}>
          <Item item={item} />
        </li>
      ))}
    </ol>
  );
};

export { List };
