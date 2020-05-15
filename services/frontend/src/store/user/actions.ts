import { SIGNIN, SIGNOUT, UserActionTypes, SignInData } from "./types";

export const signInAction = (data: SignInData): UserActionTypes => {
  console.log(data);
  return {
    type: SIGNIN,
    data: data
  };
}

export const signOutAction = (): UserActionTypes => {
  return {
    type: SIGNOUT
  };
}