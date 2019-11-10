import React, { Component } from 'react';
import PropTypes from 'prop-types';
import logo from './logo.svg';
import './App.css';
import AuthService from './components/AuthService';

const Auth = new AuthService();

class App extends Component {
  handleLogout() {
    Auth.logout();
    const { history } = this.props;
    history.replace('/login');
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>
            Welcome
          </h2>
        </div>
        <p className="App-intro">
          <button type="button" className="form-submit" onClick={this.handleLogout.bind(this)}>Logout</button>
        </p>
      </div>
    );
  }
}

App.propTypes = {
  history: PropTypes.string.isRequired,
};

export default App;
