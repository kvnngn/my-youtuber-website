import React from 'react';
import './forgotPassword.css';
import PropTypes from 'prop-types';
import AuthService from './AuthService';

class ForgotPassword extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.goToLogin = this.goToLogin.bind(this);
    this.Auth = new AuthService();
  }

  componentDidMount() {
    const { history } = this.props;
    if (this.Auth.loggedIn()) history.replace('/');
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleFormSubmit(e) {
    const { history } = this.props;
    const { email } = this.state;
    e.preventDefault();
    try {
      this.Auth
        .forgotPassword(email)
        .then(() => {
          history.replace('/');
          /* eslint-disable no-alert */
          alert(
            `Un email a été envoyé à ${
              email
            }avec un nouveau mot de passe`,
          );
          /* eslint-enable no-alert */
        })
        .catch((err) => {
          /* eslint-disable no-alert */
          alert(err);
          /* eslint-enable no-alert */
        });
    } catch (err) {
      /* eslint-disable no-alert */
      alert('Erreur: Veuillez indiquer votre mail');
      /* eslint-enable no-alert */
    }
  }

  goToLogin() {
    const { history } = this.props;
    history.replace('/login');
  }

  render() {
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
}

ForgotPassword.propTypes = {
  history: PropTypes.string.isRequired,
};

export default ForgotPassword;
