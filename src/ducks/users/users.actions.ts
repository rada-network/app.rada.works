import { UsersActionType } from './users.types';

// common
export const setNameAction = (name: string) => {
  return {
    type: UsersActionType.setName,
    payload: name,
  };
};
