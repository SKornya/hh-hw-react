import { applyMiddleware, createStore } from 'redux';
import { reducer } from './model/model';
import { asyncActionsMiddleware } from './model/middleware';

const store = createStore(reducer, {}, applyMiddleware(asyncActionsMiddleware));

export type RootState = ReturnType<typeof store.getState>;

export default store;
