import React from 'react';
import './register.css';
import PropTypes from 'prop-types';
import AuthService from './AuthService';

class Register extends React.Component {
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
    const {
      nickname, email, firstname, lastname, password,
    } = this.state;
    const { history } = this.props;
    e.preventDefault();
    try {
      this.Auth
        .register(
          nickname,
          email,
          firstname,
          lastname,
          password,
        )
        .then(() => {
          history.replace('/login');
          /* eslint-disable no-alert */
          alert(
            'Votre compte a été crée. Vous pouvez désormais vous connecter.',
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
      alert('Erreur: Veuillez remplir tous les champs');
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
          <h1>Inscription</h1>
          <form onSubmit={this.handleFormSubmit}>
            <input
              className="form-item"
              type="text"
              placeholder="Pseudo"
              name="nickname"
              onChange={this.handleChange}
            />
            <input
              className="form-item"
              type="text"
              placeholder="Adresse mail"
              name="email"
              onChange={this.handleChange}
            />
            <input
              className="form-item"
              type="text"
              placeholder="Prénom"
              name="firstname"
              onChange={this.handleChange}
            />
            <input
              className="form-item"
              type="text"
              placeholder="Nom"
              name="lastname"
              onChange={this.handleChange}
            />
            <input
              className="form-item"
              type="password"
              placeholder="Mot de passe"
              name="password"
              onChange={this.handleChange}
            />
            <input className="form-submit" type="submit" value="M'inscrire" />
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

Register.propTypes = {
  history: PropTypes.string.isRequired,
};

export default Register;
