import { Dispatch } from 'react';

export type UsersState = {
  name: string;
};

export const UsersActionType = {
  setName: 'setName',
};

export type UsersActionType =
  typeof UsersActionType[keyof typeof UsersActionType];
export type UsersAction = { type: UsersActionType; payload?: any };

declare module 'react-redux' {
  interface DefaultRootState {
    users: UsersState;
  }
  export function useDispatch<TDispatch = Dispatch<UsersAction>>(): TDispatch;
}
