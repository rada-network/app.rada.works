import { createSelector } from 'reselect';
import { UsersState } from './users.types';

////////
// Selectors
////////

const nameSelector = (state: UsersState) => state.name;

////////
// Create selectors
////////

// common
export const getName = createSelector(nameSelector, (name) => name);
