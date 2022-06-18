import { Dispatch } from 'react';
import * as actions from './users.actions';
import { UsersAction } from './users.types';

export const setName = (dispatch: Dispatch<UsersAction>, name: string) => {
  dispatch(actions.setNameAction(name));
};
