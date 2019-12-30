import React, { Component, FormEvent, ChangeEvent, OptionHTMLAttributes, SelectHTMLAttributes } from 'react';
import axios from "axios";
import { Redirect } from 'react-router-dom';

type FormProps = {
  isSignedIn: Boolean
}
type LocationNameIdPair = {
  id: string,
  name: string
}
type FormState = {
  email: string,
  password: string,
  passwordRepeat: string,
  username: string,
  countries: Array<LocationNameIdPair>,
  states: Array<LocationNameIdPair>,
  cities: Array<LocationNameIdPair>,
  country_value: string,
  state_value: string,
  city_value: string,
  [key: string]: any
}
class RegisterForm extends Component<FormProps, FormState> {
  constructor(props: FormProps) {
    super(props);
    this.state = {
      email: '',
      password: '',
      username: '',
      passwordRepeat: '',
      countries: [],
      states: [],
      cities: [],
      country_value: '-- select a country --',
      state_value: '-- select a state --',
      city_value: '-- select a city --'
    }
    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleCountrySelect = this.handleCountrySelect.bind(this);
    this.handleStateSelect = this.handleStateSelect.bind(this);
    this.handleCitySelect = this.handleCitySelect.bind(this);
  }

  componentDidMount(): void {
    // get all tha available countries in our database
    // insert them in the country select
    const cityUrl: string = `${process.env.REACT_APP_USERS_URL}/location/countries`;
    axios.get(cityUrl)
      .then(res => {
        this.setState({ countries: res.data.data });
      }).catch(err => {
        console.log(err);
      });
  }

  handleFormSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    // TODO: valdicate every field in the form before submit

    // const registerUrl = `${process.env.REACT_APP_USERS_URL}/auth/register`
    // const data = {
    //   displayname: this.state.username,
    //   email: this.state.email,
    //   password: this.state.password,
    //   city_id: this.state.city_value
    // }
    // axios.post(registerUrl, data)
    //   .then(res => {
    //     console.log(res);
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
  }

  handleFormChange(event: ChangeEvent<HTMLInputElement>): void {
    const newState: FormState = this.state;
    newState[event.target.name] = event.target.value;
    this.setState(newState);
  }

  handleCountrySelect(event: ChangeEvent<HTMLSelectElement>): void {
    // two way binding country_value
    const country_value = event.target.value;
    this.setState({ country_value: event.target.value });

    // clear out all the cities, states
    this.setState({
      cities: [],
      states: [],
      state_value: '-- select a state --',
      city_value: '-- select a city --'
    });

    // get all the states by the selected country id
    let stateUrl = `${process.env.REACT_APP_USERS_URL}/location/states/?country_id=${country_value}`;
    axios.get(stateUrl)
      .then(res => {
        this.setState({ states: res.data.data });
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleStateSelect(event: ChangeEvent<HTMLSelectElement>): void {
    // two way binding state_value
    const state_value = event.target.value;
    this.setState({ state_value: state_value });

    // clear out all the cities
    this.setState({ cities: [], city_value: '-- select a city --' });

    // get all the cities by the selected state id
    let cityUrl = `${process.env.REACT_APP_USERS_URL}/location/cities/?state_id=${state_value}`;
    axios.get(cityUrl)
      .then(res => {
        this.setState({ cities: res.data.data });
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleCitySelect(event: ChangeEvent<HTMLSelectElement>): void {
    // two way binding city_value
    this.setState({ city_value: event.target.value });
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
            <h1 className='title'>Register</h1>
            <hr />
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
                    <select onChange={this.handleCountrySelect} id="country_select" value={this.state.country_value}>
                      <option disabled > -- select a country -- </option>
                      {this.state.countries.map((country: LocationNameIdPair) => {
                        return <option key={country.id} value={country.id}>{country.name}</option>
                      })}
                    </select>
                  </div>
                  <div className="select">
                    <select onChange={this.handleStateSelect} id="state_select" value={this.state.state_value}>
                      <option disabled > -- select a state -- </option>
                      {this.state.states.map((state: LocationNameIdPair) => {
                        return <option key={state.id} value={state.id}>{state.name}</option>
                      })}
                    </select>
                  </div>
                  <div className="select">
                    <select onChange={this.handleCitySelect} id="city_select" value={this.state.city_value}>
                      <option disabled > -- select a city -- </option>
                      {this.state.cities.map((city: LocationNameIdPair) => {
                        return <option key={city.id} value={city.id}>{city.name}</option>
                      })}
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
          <div className="column is-3" />
        </div >
      </div >
    )
  }

}

export default RegisterForm;