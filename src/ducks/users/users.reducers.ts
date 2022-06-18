import { UsersAction, UsersActionType, UsersState } from './users.types';

export const initialState: UsersState = {
  name: '',
};

const reducer = (
  state: UsersState = initialState,
  action: UsersAction,
): UsersState => {
  switch (action.type) {
    case UsersActionType.setName:
      return {
        ...state,
        name: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
