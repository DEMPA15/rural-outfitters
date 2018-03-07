import React, { Component } from 'react';
import './Login.css'
import Header from '../Header/Header'

class Login extends Component {
    render(){
        return (
            <div>
                <Header/>
                <div className="login-form">
                    <form >
                    <p>SIGN IN</p>
                        <div>
                            <label>Email</label>
                            <br/>
                            <input type="text"/>
                        </div>
                        <br/>
                        <div>
                            <label>Password</label>
                            <br/>
                            <input type="password"/>
                        </div>
                        <button type="submit">Sign In</button>
                        <hr/>
                    </form>
                    <button className="sign-up-button">Create An Account</button>
                </div>
            </div>
        )
    }
}
export default Login;