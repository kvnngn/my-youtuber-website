import React from 'react';
import './forgotPassword.css';
import AuthService from './AuthService';

class Login extends React.Component {
  constructor () {
    super ();
    this.handleChange = this.handleChange.bind (this);
    this.handleFormSubmit = this.handleFormSubmit.bind (this);
    this.goToLogin = this.goToLogin.bind (this);
    this.Auth = new AuthService ();
  }

  componentDidMount () {
    if (this.Auth.loggedIn ()) this.props.history.replace ('/');
  }

  render () {
    return (
      <div className="center">
        <div className="card">
          <h1>Mot de passe oublié</h1>
          <div> Veuillez indiquer votre email.</div>
          <form onSubmit={this.handleFormSubmit}>
            <input
              className="form-item"
              type="text"
              placeholder="Adresse mail"
              name="email"
              onChange={this.handleChange}
            />
            <input
              className="form-submit"
              type="submit"
              value="Demander un nouveau mot de passe"
            />
          </form>
          <br />
          <form onSubmit={this.goToLogin}>
            <input className="form-submit" type="submit" value="Retour" />
          </form>
        </div>
      </div>
    );
  }

  handleChange (e) {
    this.setState ({
      [e.target.name]: e.target.value,
    });
  }
  handleFormSubmit (e) {
    e.preventDefault ();
    try {
      this.Auth
        .forgotPassword (this.state.email)
        .then (res => {
          this.props.history.replace ('/');
          alert (
            'Un email a été envoyé à ' +
              this.state.email +
              'avec un nouveau mot de passe'
          );
        })
        .catch (err => {
          alert (err);
        });
    } catch (e) {
      alert ('Erreur: Veuillez indiquer votre mail');
    }
  }
  goToLogin () {
    this.props.history.replace ('/login');
  }
}

export default Login;
