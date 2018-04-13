import {
  SET_TARGET,
  SET_ORDER_BY,
  SET_ORDER_DIR
} from '../actions';

const initialState = {
  orderBy: 'voteScore',
  orderDir: 'new',
  target: 'post'
}

const Filter = (state = initialState, action) => {
  switch (action.type) {
    case SET_TARGET:
      return { ...state, target: action.target };
    case SET_ORDER_BY:
      return { ...state, orderBy: action.orderBy };
    case SET_ORDER_DIR:
      return { ...state, orderDir: action.orderDir };
    default:
      return state;
  }
};

export default Filter;
