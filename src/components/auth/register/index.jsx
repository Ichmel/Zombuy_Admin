import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import { GetUserLogin } from '../../services';
export default class Register extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            firstName: "", lastName: "", phoneNo: "", address: "", email: "", password: "",role:'',
            redirectToReferrer: false,  showPassword: false,
        }
    }
    handleChangeUser(e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    handleSubmit = async (event) => {
        event.preventDefault();
        const{ firstName, lastName, phoneNo, address, email, password,role } = this.state;
        let data = { firstName: firstName, lastName: lastName, phoneNo: phoneNo, address: address, email, password,role:role };
        let user = await GetUserLogin.getUserRegister(data);
        if (user) {
           
            window.location.reload();
        }

    }

    
  togglePasswordVisibility = () => {
    this.setState((prevState) => ({
      showPassword: !prevState.showPassword,
    }));
  };


    render() {
       
 let {  showPassword } = this.state;
        return (
            <div className="bg-sign">
                <div id="layoutAuthentication">
                    <div id="layoutAuthentication_content">
                        <main>
                            <div className="container">
                                <div className="row justify-content-center">
                                    <div className="col-lg-5">
                                        <div className="card shadow-lg border-0 rounded-lg mt-5 mb-5">
                                            <div className="card-header card-sign-header">
                                                <h3 className="text-center font-weight-light my-4">Register</h3>
                                            </div>
                                            <div className="card-body ">
                                                <form>
                                                    <div className="form-group">
                                                        <label className="form-label">Prenom*</label>
                                                        <input className="form-control py-3" type="text" placeholder="Enter firstname" name="firstName" value={this.state.firstName} onChange={(e) => this.handleChangeUser(e)} />
                                                    </div>
                                                    <div className="form-group">
                                                        <label className="form-label" >Nom*</label>
                                                        <input className="form-control py-3"  type="text" placeholder="Enter lastName" name="lastName" value={this.state.lastName} onChange={(e) => this.handleChangeUser(e)} />
                                                    </div>
                                                    <div className="form-group">
                                                        <label className="form-label">Contact*</label>
                                                        <input className="form-control py-3" type="number" placeholder="Enter phone" name="phoneNo" value={this.state.phoneNo} onChange={(e) => this.handleChangeUser(e)} />
                                                    </div>
                                                    <div className="form-group">
                                                        <label className="form-label" >Adresse*</label>
                                                        <input className="form-control py-3"  type="text" placeholder="Enter address" name="address" value={this.state.address} onChange={(e) => this.handleChangeUser(e)} />
                                                    </div>
                                                    <div className="form-group">
                                                        <label className="form-label" >Role*</label>
                                                        <input className="form-control py-3"  type="text" placeholder="Enter role" name="role" value={this.state.role} onChange={(e) => this.handleChangeUser(e)} />
                                                    </div>
                                                    <div className="form-group">
                                                        <label className="form-label">Email*</label>
                                                        <input className="form-control py-3" type="email" placeholder="Enter email address" name="email" value={this.state.email} onChange={(e) => this.handleChangeUser(e)} />
                                                    </div>
                                                    <div className="form-group">
                                                        <label className="form-label" >Password*</label>
                                                        <input className="form-control py-3" type={showPassword ? "text" : "password"}  placeholder="Enter password" name="password" value={this.state.password} onChange={(e) => this.handleChangeUser(e)} />
                                                    </div>

                                                    <div className="form-group">
                                                        <div className="custom-control custom-checkbox">
                                                            <input className="custom-control-input" id="rememberPasswordCheck" type="checkbox" />
                                                            <label className="custom-control-label" htmlFor="rememberPasswordCheck"   onClick={this.togglePasswordVisibility }>Remember password</label>
                                                        </div>
                                                    </div>

                                                    <div className="form-group d-flex align-items-center justify-content-between mt-4 mb-0" onClick={this.handleSubmit}>
                                                        <a className="btn btn-sign hover-btn">Submit</a>
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