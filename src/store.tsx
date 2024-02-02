import { applyMiddleware, createStore } from 'redux';
import { useDispatch } from 'react-redux';
import { thunk } from 'redux-thunk';
import reducer from './model/reducer';

const store = createStore(reducer, {}, applyMiddleware(thunk));

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = () =>
  useDispatch<AppDispatch>();

export default store;
