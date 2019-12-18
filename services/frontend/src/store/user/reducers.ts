import { UserState, UserActionTypes, SIGNIN, SIGNOUT } from './types';
const initialState: UserState = {
  isSignedIn: false
}

export const userReducer = (
  state = initialState,
  action: UserActionTypes) => {
  switch (action.type) {
    case SIGNIN:
      state = {
        ...state,
        isSignedIn: true
      }
      break;

    case SIGNOUT:
      state = {
        ...state,
        isSignedIn: false
      }
      break;
  }
  return state;
}