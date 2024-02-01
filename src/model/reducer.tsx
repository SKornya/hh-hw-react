import { combineReducers } from 'redux';
import { reviewerReducer } from './reviewer';
import { settingsReducer } from './settings';
import { errorReducer } from './error';

const reducer = combineReducers({
  reviewer: reviewerReducer,
  settings: settingsReducer,
  error: errorReducer,
});

export default reducer;
