import React from 'react'
import './forgotPassword.css'
import AuthService from "./AuthService";

class Login extends React.Component {
    constructor() {
        super();
        this.handleChange = this.handleChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.goToLogin = this.goToLogin.bind(this);
        this.Auth = new AuthService();
    }

    componentDidMount() {
        if (this.Auth.loggedIn())
            this.props.history.replace('/')
    }

    render() {
        return(
            <div className="center">
                <div className="card">
                    <h1>Forgot Password</h1>
                    <form onSubmit={this.handleFormSubmit}>
                        <input className="form-item" type="text" placeholder="Email" name="email" onChange={this.handleChange}/>
                        <input className="form-submit" type="submit" value="Envoyer"/>
                    </form>
                    <br/>
                    <form onSubmit={this.goToLogin}>
                        <input className="form-submit" type="submit" value="Retour"/>
                    </form>
                </div>
            </div>
        )
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleFormSubmit(e) {
        e.preventDefault();
        try {
            this.Auth.forgotPassword(this.state.email)
                .then(res => {
                    this.props.history.replace('/');
                    alert("An email was send");
                }).catch(err => {
                alert(err);
            })
        }catch (e) {
            alert("Erreur: Veuillez remplir votre mail")
        }
    }
    goToLogin() {
        this.props.history.replace('/login');
    }
}

export default Login;
