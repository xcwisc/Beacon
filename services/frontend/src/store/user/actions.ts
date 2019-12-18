import { SIGNIN, SIGNOUT, UserActionTypes } from "./types";

export const signInAction = (): UserActionTypes => {
  return {
    type: SIGNIN
  };
}

export const signOutAction = (): UserActionTypes => {
  return {
    type: SIGNOUT
  };
}