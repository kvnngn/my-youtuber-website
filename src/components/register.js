import React from 'react'
import './register.css'
import AuthService from "./AuthService";

class Register extends React.Component {
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
                    <h1>Register</h1>
                    <form onSubmit={this.handleFormSubmit}>
                        <input className="form-item" type="text" placeholder="Nickname goes here..." name="nickname" onChange={this.handleChange}/>
                        <input className="form-item" type="text" placeholder="Email goes here..." name="email" onChange={this.handleChange}/>
                        <input className="form-item" type="text" placeholder="Firstname goes here..." name="firstname" onChange={this.handleChange}/>
                        <input className="form-item" type="text" placeholder="Lastname goes here..." name="lastname" onChange={this.handleChange}/>
                        <input className="form-item" type="password" placeholder="Password goes here..." name="password" onChange={this.handleChange}/>
                        <input className="form-submit" type="submit" value="Submit"/>
                    </form>
                    <br/>
                    <form onSubmit={this.goToLogin}>
                        <input className="form-submit" type="submit" value="Return"/>
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
        this.Auth.register(this.state.nickname, this.state.email, this.state.firstname, this.state.lastname, this.state.password)
            .then(res => {
                this.props.history.replace('/login');
                alert("Your account was created");
            }).catch(err =>{
                alert(err);
            })
    }
    goToLogin() {
        this.props.history.replace('/login');
    }
}

export default Register;
