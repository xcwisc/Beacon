import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav className="navbar" role="navigation" aria-label="main navigation">
    <div className="navbar-brand">
      <a className="navbar-item" href="https://bulma.io">
        <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28" />
      </a>

      <a role="button" className="navbar-toggle navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample"
        onClick={() => {
          const toggle: Element = document.querySelector(".navbar-toggle") as Element;
          const menu: Element = document.querySelector(".navbar-menu") as Element;
          toggle.classList.toggle("is-active");
          menu.classList.toggle("is-active");
        }}>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div className="navbar-menu">
      <div className="navbar-start">
        <a className="navbar-item">
          Home
      </a>

        <a className="navbar-item">
          Documentation
      </a>

        <div className="navbar-item has-dropdown is-hoverable">
          <a className="navbar-link">
            More
        </a>

          <div className="navbar-dropdown">
            <a className="navbar-item">
              About
          </a>
            <a className="navbar-item">
              Jobs
          </a>
            <a className="navbar-item">
              Contact
          </a>
            <hr className="navbar-divider" />
            <a className="navbar-item">
              Report an issue
          </a>
          </div>
        </div>
      </div>

      <div className="navbar-end">
        <div className="navbar-item">
          <div className="buttons">
            <Link to='/register'><a className="button is-primary">Register</a></Link>
            <Link to='/login'><a className="button is-light">Login</a></Link>
          </div>
        </div>
      </div>
    </div>
  </nav>
);

export default Navbar;