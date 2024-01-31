import { Action, Middleware } from 'redux';

export type AsyncAction<ReturnType, State, BasicAction extends Action> = (
  dispatch: AsyncDispatch<State, BasicAction>,
  getState: () => State
) => ReturnType;

export interface AsyncDispatch<State, BasicAction extends Action> {
  <ReturnType>(
    AsyncAction: AsyncAction<ReturnType, State, BasicAction>
  ): ReturnType;

  <Action extends BasicAction>(action: Action): Action;

  <ReturnType, Action extends BasicAction>(
    action: Action | AsyncAction<ReturnType, State, BasicAction>
  ): Action | ReturnType;
}

export const asyncActionsMiddleware: Middleware<
  AsyncDispatch<any, Action>,
  any,
  AsyncDispatch<any, Action>
> =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    if (typeof action === 'function') {
      return action(dispatch, getState);
    }
    return next(action);
  };
