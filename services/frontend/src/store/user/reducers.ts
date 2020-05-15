import { UserState, UserActionTypes, SIGNIN, SIGNOUT } from './types';
const initialState: UserState = {
  isSignedIn: false,
  data: {
    username: "",
    city: "",
    country: "",
    state: ""
  }
}

export const userReducer = (
  state = initialState,
  action: UserActionTypes) => {
  switch (action.type) {
    case SIGNIN:
      state = {
        ...state,
        isSignedIn: true,
        data: action.data
      }
      break;

    case SIGNOUT:
      state = {
        ...state,
        isSignedIn: false,
        data: {
          username: "",
          city: "",
          country: "",
          state: ""
        }
      }
      break;
  }
  return state;
}