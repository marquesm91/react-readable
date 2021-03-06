import React from 'react';
import { connect } from 'react-redux';
import { Input, Icon } from 'antd';

import { setQuerySearch } from '../redux/actions';

const SearchBar = ({ query, setQuerySearch }) => (
  <Input
    prefix={<Icon type="search" style={{ color: 'rgba(0,0,0,.25)' }} />}
    style={{ width: '100%', height: '50%', marginRight: '15px' }}
    placeholder="Search for Post title, Comment content or Author..."
    value={query}
    onChange={e => setQuerySearch(e.target.value)}
  />
);

const mapStateToProps = ({ search }) => ({
  query: search
});

const mapDispatchToProps = dispatch => ({
  setQuerySearch: query => dispatch(setQuerySearch(query))
});

const SearchBarConnected = connect(mapStateToProps, mapDispatchToProps)(SearchBar);

export { SearchBarConnected as SearchBar};
