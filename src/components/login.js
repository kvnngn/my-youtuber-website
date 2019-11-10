import React from 'react';
import './login.css';
import PropTypes from 'prop-types';
import AuthService from './AuthService';


class Login extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.goToRegister = this.goToRegister.bind(this);
    this.goToForgotPassword = this.goToForgotPassword.bind(this);
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
    const { email, password } = this.state;
    e.preventDefault();
    try {
      this.Auth
        .login(email, password)
        .then(() => {
          history.replace('/');
        })
        .catch(() => {
          /* eslint-disable no-alert */
          alert('Identifiants incorrect, veillez réesayer.');
          /* eslint-enable no-alert */
        });
    } catch (err) {
      /* eslint-disable no-alert */
      alert('Erreur: Veuillez remplir tous les champs');
      /* eslint-enable no-alert */
    }
  }

  goToRegister() {
    const { history } = this.props;
    history.replace('/register');
  }

  goToForgotPassword() {
    const { history } = this.props;
    history.replace('/forgotPassword');
  }

  render() {
    return (
      <div className="center">
        <div className="card">
          <h1>Connexion</h1>
          <form onSubmit={this.handleFormSubmit}>
            <input
              className="form-item"
              type="text"
              placeholder="Email"
              name="email"
              onChange={this.handleChange}
            />
            <input
              className="form-item"
              type="password"
              placeholder="Mot de Passe"
              name="password"
              onChange={this.handleChange}
            />
            <input className="form-submit" type="submit" value="Se connecter" />
          </form>
          <br />
          <form onSubmit={this.goToRegister}>
            <input
              className="form-submit"
              type="submit"
              value="Créer un compte"
            />
          </form>
          <br />
          <form onSubmit={this.goToForgotPassword}>
            <input
              className="form-submit"
              type="submit"
              value="Mot de passe oublié ?"
            />
          </form>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.string.isRequired,
};

export default Login;
