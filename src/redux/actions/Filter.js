export const SET_TARGET = 'SET_TARGET';
export const SET_ORDER_BY = 'SET_ORDER_BY';
export const SET_ORDER_DIR = 'SET_ORDER_DIR';

export const setTargetFilter = target => ({
  type: SET_TARGET,
  target
});

export const setOrderByFilter = orderBy => ({
  type: SET_ORDER_BY,
  orderBy
});

export const setOrderDirFilter = orderDir => ({
  type: SET_ORDER_DIR,
  orderDir
});
