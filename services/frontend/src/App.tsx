import * as React from "react";
import Navbar from "./components/layouts/Navbar";

import { AppState } from "./store/index";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { signInAction, signOutAction } from "./store/user/actions";
import { UserState, SignInData } from "./store/user/types";
import { Switch, Route } from "react-router-dom";
import RegisterForm from "./components/auth/RegisterForm";
import LoginForm from "./components/auth/LoginForm";
import Index from "./components/layouts/Index";

interface AppProps {
  user: UserState;
  signIn: Function;
  signOut: Function;
}

const App: React.FC<AppProps> = props => {
  return (
    <div className="App">
      <Navbar />
      <div>
        <p> {props.user.isSignedIn ? "yes" : "no"}</p>
        <p> {props.user.data.city}</p>
        <p> {props.user.data.country}</p>
        <p> {props.user.data.state}</p>
        <p> {props.user.data.username}</p>
      </div>
      <Switch>
        <Route
          exact
          path="/"
          render={() => (
            <div></div>
          )}
        ></Route>
        <Route
          exact
          path="/register"
          render={() => <RegisterForm isSignedIn={props.user.isSignedIn} />}
        ></Route>
        <Route
          exact
          path="/login"
          render={() => <LoginForm isSignedIn={props.user.isSignedIn} signIn={props.signIn} />}
        ></Route>
        <Route exact path="/users" component={Index} />
      </Switch>
    </div>
  );
};

const mapStateToProps = (state: AppState) => {
  return { user: state.user };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  signIn: (data: SignInData) => dispatch(signInAction(data)),
  signOut: () => dispatch(signOutAction())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
