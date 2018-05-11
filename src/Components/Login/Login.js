import React, { Component } from 'react';
import './Login.css'
import Header from '../Header/Header'
import {Link} from 'react-router-dom'
import axios from 'axios';
class Login extends Component {
    constructor(props){
        super(props)
        this.state = {
            email: "",
            password:"",
        }
        this.handleChange = this.handleChange.bind(this);
    }

    createUserOrLogin(e, login){
        debugger
        e.preventDefault();
        axios.post(`/api/${login}`, {email:this.state.email, password:this.state.password})
            .then((response)=>{
                if(response.data.success){
                    this.props.history.push('/market');
                }else{
                    alert("Yo your password or maybe your email (all though I doubt it) is incorrect")
                }
            })
            .catch((err)=>{
                console.log(err)
            }) 
    }

    handleChange(e){
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    render(){
        return (
            <div>
                <Header/>
                <div className="login-form">
                    <form onSubmit={(event)=>{this.createUserOrLogin(event, 'login')}} >
                    <p>SIGN IN</p>
                        <div>
                            <label>Email</label>
                            <br/>
                            <input name="email" value={this.state.email} onChange={this.handleChange} type="text"/>
                        </div>
                        <br/>
                        <div>
                            <label>Password</label>
                            <br/>
                            <input name="password" value={this.state.password} onChange={this.handleChange} type="password"/>
                        </div>
                        <button type="submit">Sign In</button>
                        <hr/>
                    </form>
                    <button onClick={(event)=>{this.createUserOrLogin(event, 'register')}} className="sign-up-button">Create An Account</button>
                </div>
            </div>
        )
    }
}
export default Login;