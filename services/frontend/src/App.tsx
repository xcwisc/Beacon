import * as React from "react";
import Navbar from "./components/layouts/Navbar";

import { AppState } from "./store";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { signInAction, signOutAction } from "./store/user/actions";
import { UserState } from "./store/user/types";
import { Switch, Route } from "react-router-dom";
import RegisterForm from "./components/auth/RegisterForm";
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
      <Switch>
        <Route
          exact
          path="/"
          render={() => (
            <div>
              <p> {props.user.isSignedIn ? "yes" : "no"}</p>
              <div onClick={e => props.signIn()}></div>
              <div onClick={e => props.signOut()}></div>
            </div>
          )}
        ></Route>
        <Route
          exact
          path="/register"
          render={() => <RegisterForm isSignedIn={props.user.isSignedIn} />}
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
  signIn: () => dispatch(signInAction()),
  signOut: () => dispatch(signOutAction())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
