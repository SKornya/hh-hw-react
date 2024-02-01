import { applyMiddleware, createStore } from 'redux';
import { thunk } from 'redux-thunk';
import reducer from './model/reducer';

const store = createStore(reducer, {}, applyMiddleware(thunk));

export type RootState = ReturnType<typeof store.getState>;

export default store;
