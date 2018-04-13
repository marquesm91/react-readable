import {
  SET_TARGET_FILTERS,
  SET_FILTER_ORDER_BY,
  SET_FILTER_ORDER_DIR
} from '../actions';

const initialState = {
  orderBy: 'voteScore',
  orderDir: 'new',
  targetFilters: 'post'
}

const Filter = (state = initialState, action) => {
  switch (action.type) {
    case SET_TARGET_FILTERS:
      return { ...state, targetFilters: action.targetFilters };
    case SET_FILTER_ORDER_BY:
      return { ...state, orderBy: action.orderBy };
    case SET_FILTER_ORDER_DIR:
      return { ...state, orderDir: action.orderDir };
    default:
      return state;
  }
};

export default Filter;
