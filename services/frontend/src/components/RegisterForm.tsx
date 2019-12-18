import React, { Component, FormEvent, ChangeEvent } from 'react';
import { Redirect } from 'react-router-dom';

type FormProps = {
  isSignedIn: Boolean
}

type FormState = {
  email: string,
  password: string,
  passwordRepeat: string,
  username: string,
  [key: string]: string
}
class RegisterForm extends Component<FormProps, FormState> {
  constructor(props: FormProps) {
    super(props);
    this.state = {
      email: '',
      password: '',
      username: '',
      passwordRepeat: ''
    }
    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    console.log(event);
  }

  handleFormChange(event: ChangeEvent<HTMLInputElement>): void {
    const newState: FormState = this.state;
    newState[event.target.name] = event.target.value;
    this.setState(newState);
  }

  render() {
    if (this.props.isSignedIn) {
      return <Redirect to='/' />
    }
    return (
      <div className="container">
        <div className="columns">
          <div className="column">
            <h1 className='title'>Register</h1>
            <hr /> <br />
            <form onSubmit={(event) => this.handleFormSubmit(event)}>
              <div className="field">
                <label className="label">DisplayName</label>
                <div className="control has-icons-left has-icons-right">
                  <input
                    name="username"
                    className="input"
                    type="text"
                    placeholder="Enter DisplayName"
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
                <label className="label">Repeat Password</label>
                <div className="control has-icons-left has-icons-right">
                  <input
                    name="passwordRepeat"
                    className="input"
                    type="password"
                    placeholder="Repeat Password"
                    required
                    value={this.state.passwordRepeat}
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
                <label className="label">Location</label>
                <div className="control">
                  <div className="select">
                    <select>
                      <option>Select dropdown</option>
                      <option>With options</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="field">
                <div className="control">
                  <label className="checkbox">
                    <input type="checkbox" />
                    I agree to the <a href="#">terms and conditions</a>
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
        </div >
      </div >
    )
  }

}

export default RegisterForm;