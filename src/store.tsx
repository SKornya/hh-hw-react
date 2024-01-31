import { applyMiddleware, createStore } from 'redux';
import { thunk } from 'redux-thunk';
import { reducer } from './model/model';
// import { asyncActionsMiddleware } from './model/middleware';

const store = createStore(reducer, {}, applyMiddleware(thunk));

export type RootState = ReturnType<typeof store.getState>;

export default store;
