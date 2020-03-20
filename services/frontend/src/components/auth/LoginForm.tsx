import React, { Component, FormEvent, ChangeEvent } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

type FormProps = {
  isSignedIn: Boolean
}

type FormState = {
  email: string,
  password: string,
  username: string,
  rememberMe: boolean,
  [key: string]: any
}

class LoginForm extends Component<FormProps, FormState> {
  constructor(props: FormProps) {
    super(props);
    this.state = {
      email: '',
      password: '',
      username: '',
      rememberMe: false,
    }
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleFormChange = this.handleFormChange.bind(this);
  }

  handleFormSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    // TODO: valdicate every field in the form before submit

    const registerUrl = `${process.env.REACT_APP_USERS_URL}/auth/login`
    const data = {
      username: this.state.username,
      password: this.state.password,
      rememberMe: this.state.rememberMe
    }
    axios.post(registerUrl, data)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleFormChange(event: ChangeEvent<HTMLInputElement>): void {
    const newState: FormState = this.state;
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    newState[name] = value;
    this.setState(newState);
  }

  render() {
    if (this.props.isSignedIn) {
      return <Redirect to='/' />
    }
    return (
      <div className="container">
        <div className="columns">
          <div className="column is-3" />
          <div className="column is-6">
            <br />
            <h1 className='title'>Login</h1>
            <hr />
            <form onSubmit={(event) => this.handleFormSubmit(event)}>
              <div className="field">
                <label className="label">UserName</label>
                <div className="control has-icons-left has-icons-right">
                  <input
                    name="username"
                    className="input"
                    type="text"
                    placeholder="Enter UserName"
                    required
                    value={this.state.username}
                    onChange={this.handleFormChange}
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-user"></i>
                  </span>
                  <span className="icon is-small is-right">
                    <i className="fas fa-check"></i>
                  </span>
                </div>
              </div>

              <div className="field">
                <label className="label">Email</label>
                <div className="control has-icons-left has-icons-right">
                  <input
                    name="email"
                    className="input"
                    type="text"
                    placeholder="Enter email"
                    required
                    value={this.state.email}
                    onChange={this.handleFormChange}
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-envelope"></i>
                  </span>
                  <span className="icon is-small is-right">
                    <i className="fas fa-exclamation-triangle"></i>
                  </span>
                </div>
              </div>

              <div className="field">
                <label className="label">Password</label>
                <div className="control has-icons-left has-icons-right">
                  <input
                    name="password"
                    className="input"
                    type="password"
                    placeholder="Enter Password"
                    required
                    value={this.state.password}
                    onChange={this.handleFormChange}
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-key"></i>
                  </span>
                  <span className="icon is-small is-right">
                    <i className="fas fa-exclamation-triangle"></i>
                  </span>
                </div>
              </div>

              <div className="field">
                <div className="control">
                  <label className="checkbox">
                    <input
                      name="rememberMe"
                      type="checkbox"
                      checked={this.state.rememberMe}
                      onChange={this.handleFormChange} />
                    Remember Me
                  </label>
                </div>
              </div>

              <input
                type="submit"
                className="button is-link is-outlined is-medium is-fullwidth"
                value="Submit"
              />
            </form>
          </div >
          <div className="column is-3" />
        </div >
      </div >
    )
  }
}

export default LoginForm;
