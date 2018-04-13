export const SET_TARGET_FILTERS = 'SET_TARGET_FILTERS';
export const SET_FILTER_ORDER_DIR = 'SET_FILTER_ORDER_DIR';
export const SET_FILTER_ORDER_BY = 'SET_FILTER_ORDER_BY';

export const setTargetFilters = targetFilters => ({
  type: SET_TARGET_FILTERS,
  targetFilters
});

export const setFilterOrderBy = orderBy => ({
  type: SET_FILTER_ORDER_BY,
  orderBy
});

export const setFilterOrderDir = orderDir => ({
  type: SET_FILTER_ORDER_DIR,
  orderDir
});
