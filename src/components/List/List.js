import React from 'react';
import sb from 'sort-by';
import { Card } from 'antd';

import { ListItem } from '../index';

import './List.css';

const List = ({ items, sortBy, onClick, clicklable }) => {
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

  return (
    <ol className="container-list">
      {itemsBeforeMap.map(item => (
        <li key={item.id}>
          <ListItem item={item} onClick={itemClicked => onClick(itemClicked)} clicklable={clicklable} />
        </li>
      ))}
    </ol>
  );
};

export { List };
