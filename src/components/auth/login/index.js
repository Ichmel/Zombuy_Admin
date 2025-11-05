import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import { NotificationManager } from 'react-notifications';
import Loader from '../../loader';
import { GetUserLogin } from '../../services';
export default class Signin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: null,
            password: null,
            formErrors: {
                email: "",
                password: "",
                role:'',
            },
            showPassword: false,
        };
    }
    handleChangeUser(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    

    
  handleSubmit = async (event) => {
    event.preventDefault();
    let { email, password , role} = this.state;
    let data = { email: email, password: password, role:role };
    
      let user = await GetUserLogin.getUserLogin(data);
      console.log('login',user)
      if (user) {
        NotificationManager.success("success", "Login");
        await GetUserLogin.authenticate(user.token,email,role);
        this.setState({ redirectToReferrer: true }); 
      } else {
        NotificationManager.error("Please check your email & password", "Input Error");
      }
    
  };

  
  togglePasswordVisibility = () => {
    this.setState((prevState) => ({
      showPassword: !prevState.showPassword,
    }));
  };

    
    render() {
        if (this.state.redirectToReferrer || localStorage.getItem('token')) {
            return (<Redirect to={'/admin'} />)
        }
        let { email, password, isloaded, showPassword, role } = this.state;
     
        return (
            <div className="bg-sign">
                <div id="layoutAuthentication">
                    <div id="layoutAuthentication_content">
                        <main>
                            <div className="container">
                                {
                                    isloaded ? <Loader />:''
                                }
                                <div className="row justify-content-center">
                                    <div className="col-lg-5">
                                        <div className="card shadow-lg border-0 rounded-lg mt-5">
                                            <div className="card-header card-sign-header">
                                                <h3 className="text-center font-weight-light my-4">Login</h3>
                                            </div>
                                            <div className="card-body">
                                                <form>
                                                    <div className="form-group">
                                                        <label className="form-label" htmlFor="inputEmailAddress">Email*</label>
                                                        <input className="form-control py-3" id="inputEmailAddress" type="email" placeholder="Enter email address" name="email" value={email} onChange={(e) => this.handleChangeUser(e)} />
                                                    </div>
                                                    <div className="form-group">
                                                        <label className="form-label" htmlFor="inputPassword">Role*</label>
                                                        <input className="form-control py-3" id="inputRole"  type="text"  placeholder="Enter password" name="role" value={role} onChange={(e) => this.handleChangeUser(e)} />
                                                    </div>
                                                    <div className="form-group">
                                                        <label className="form-label" htmlFor="inputPassword">Password*</label>
                                                        <input className="form-control py-3" id="inputPassword"  type={showPassword ? "text" : "password"} placeholder="Enter password" name="password" value={password} onChange={(e) => this.handleChangeUser(e)} />
                                                    </div>
                                                   
                                                    <div className="form-group">
                                                        <div className="custom-control custom-checkbox">
                                                            <input className="custom-control-input" id="rememberPasswordCheck" type="checkbox" />
                                                            <label className="custom-control-label" htmlFor="rememberPasswordCheck"   onClick={this.togglePasswordVisibility }>Remember password</label>
                                                        </div>
                                                    </div>
                                                    <div className="form-group d-flex align-items-center justify-content-between mt-4 mb-0" onClick={this.handleSubmit}>
                                                        <a className="btn btn-sign hover-btn">Login</a>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        );
    }
}


