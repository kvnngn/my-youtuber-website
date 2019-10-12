import React from 'react'
import './login.css'
import AuthService from "./AuthService";

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
        if (this.Auth.loggedIn())
            this.props.history.replace('/')
    }

    render() {
        return(
            <div className="center">
                <div className="card">
                    <h1>Login</h1>
                    <form onSubmit={this.handleFormSubmit}>
                        <input className="form-item" type="text" placeholder="Email goes here..." name="email" onChange={this.handleChange}/>
                        <input className="form-item" type="password" placeholder="Password goes here..." name="password" onChange={this.handleChange}/>
                        <input className="form-submit" type="submit" value="Submit" />
                    </form>
                    <br/>
                    <form onSubmit={this.goToRegister}>
                        <input className="form-submit" type="submit" value="Create Account"/>
                    </form>
                    <br />
                    <form onSubmit={this.goToForgotPassword}>
                        <input className="form-submit" type="submit" value="Forgot Password ?"/>
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
            this.Auth.login(this.state.email, this.state.password)
                .then(res => {
                    this.props.history.replace('/');
                }).catch(err => {
                alert(err);
            })
        }catch (e) {
            alert("Error: Please fill all the fields")
        }
    }
    goToRegister() {
        this.props.history.replace('/register');
    }
    goToForgotPassword() {
        this.props.history.replace('/forgotPassword');
    }
}

export default Login;
