import React from 'react';
import './style.css';
import { baseUrl } from '../shared/baseUrl'
import { Redirect } from "react-router-dom"
import 'font-awesome/css/font-awesome.min.css';
import { Loading } from './LoadingComponent';
import firebase from "../firebase"
import { InputGroup } from 'reactstrap';

class UserLoginForm extends React.Component {
    constructor() {
        super();
        this.state = {
            fields: {},
            errors: {},
            isFormValidated: false,
            isMobileNumberValidated: false,
            isNameValidated: false,
            responseError: null,
            loading: false,
            successMessage: null,
        }

        this.handleChange = this.handleChange.bind(this);
        this.loginSubAdmin = this.loginSubAdmin.bind(this);
        this.skipOtpAndVerify = this.skipOtpAndVerify.bind(this);

    };


    handleChange(e) {
        let fields = this.state.fields;
        fields[e.target.name] = e.target.value;
        this.setState({
            fields
        });

        e.target.name === "name" ? this.validateUserName() : this.validateMobileNumber()

    }

    loginSubAdmin(e) {
        e.preventDefault();
        if (this.validateForm()) {
            this.setState({ loading: true, responseError : null,successMessage : null });
            this.checkIfTokenExpired() ? this.refreshToken() : this.login()
        }

    }


    validateUserName() {
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        if (!fields["name"]) {
            formIsValid = false;
            errors["name"] = "*Please enter your name.";
        }

        if (typeof fields["name"] !== "undefined") {
            if (!fields["name"].match(/^[a-zA-Z ]*$/)) {
                formIsValid = false;
                errors["name"] = "*Please enter alphabet characters only.";
            }
        }

        this.setState({ isNameValidated: formIsValid });

        this.setState({ isFormValidated: this.state.isMobileNumberValidated && formIsValid });

        this.setState({
            errors: errors
        });
        return formIsValid;
    }


    validateMobileNumber() {
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        if (!fields["phoneNumber"]) {
            formIsValid = false;
            errors["phoneNumber"] = "*Please enter your mobile no.";
        }

        if (typeof fields["phoneNumber"] !== "undefined") {
            if (!fields["phoneNumber"].match(/^[0-9]{10}$/)) {
                formIsValid = false;
                errors["phoneNumber"] = "*Please enter valid mobile no.";
            }
        }

        this.setState({ isMobileNumberValidated: formIsValid })


        this.setState({
            errors: errors,
            isFormValidated: this.state.isNameValidated && formIsValid
        });

        return formIsValid;
    }

    validateForm() {

        let isValid = this.validateUserName() && this.validateMobileNumber()
        return isValid;
    }


    checkIfTokenExpired() {
        var tokenTime = parseInt(localStorage.getItem('tokenTime'))

        if (tokenTime) return false

        return ((new Date().getTime() - tokenTime) > 60 * 60 * 1000)
    }


    refreshToken() {
        this.generateAndStoreIdToken()
    }



    generateAndStoreIdToken(redirectState) {

        var self = this;

        firebase.auth().signInWithCustomToken(localStorage.getItem('authToken')).then(result => {

            firebase.auth().currentUser.getIdToken(true).then(function (idToken) {
                localStorage.setItem('tokenTime', new Date().getTime())
                localStorage.setItem('token', idToken)
                redirectState ? self.setState({ redirect: redirectState }) : self.login()
            }).catch(function (error) {
                console.log('error in generating token ' + error)
                self.setState({ responseError: 'Unable to Login. Please try again!' })
            });
        }).catch(error => {
            self.setState({ loading: false })
            console.log('error in generating token ' + error)
            self.setError('Unable to Login. Please try again!')
        })


    }


    doReCaptchaVerify() {
        window.appVerifier = new firebase.auth.RecaptchaVerifier(
            "recaptcha-container",
            {
                size: "invisible"
            }
        );


        window.appVerifier.render().then(function (widgetId) {
            window.recaptchaWidgetId = widgetId;
        });

    }


    login(toSkipOtp) {

        var self = this;

        this.doReCaptchaVerify()
        const appVerifier = window.appVerifier

        var value = this.state.fields.phoneNumber


        var postData = {
            "phoneNumber": this.state.fields.phoneNumber,
            "name": this.state.fields.name,
            "userType": "Normal",
            "skipOtp": toSkipOtp
        }
        fetch(baseUrl + '/user/login',
            {
                method: 'POST',
                body: JSON.stringify(postData),
                headers: {
                    'Content-Type': 'application/json'
                }

            }).then(response => {
                response.json().then((data) => {

                    if (response.ok) {
                        localStorage.setItem('authToken', data.token)
                        self.generateAndStoreIdToken('/confirm')
                    }
                    else if (response.status === 422) { self.sendOtp(appVerifier, value) }

                    else self.setError(data.message)


                });
            }, error => {
                this.setState({ loading: false, responseError: error.message });

            })

            .catch(error => {
                this.setState({ loading: false, responseError: 'Unable to Login. Please try again!' });
                console.log('Post comments ', error.message);

            });


    }


    setError(message) {
        this.setState({ loading: false, responseError: message })
    }


    skipOtpAndVerify(event) {
        event.preventDefault();

        if (this.validateForm()) {
            this.setState({ loading: true });
            this.checkIfTokenExpired() ? this.refreshToken(true) : this.login(true)
        }
    }


    sendOtp(appVerifier, number) {
        const phoneNumber = "+91" + number;
        var self = this;

        firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
            .then(function (confirmationResult) {

                window.confirmationResult = confirmationResult
                self.setState({ redirect: '/verify', loading: false, successMessage: 'Otp Sent Successfully!' });


            }).catch(function (error) {
                console.log('error' + error)
                window.appVerifier.reset(window.recaptchaWidgetId);
                self.setError('Unable to Send OTP!')
            });
    }




    render() {

        if (this.state.redirect) {
            var name = this.state.fields.name;
            var phone = this.state.fields.phoneNumber;
            let fields = {};
            fields["name"] = "";
            fields["phoneNumber"] = "";
            this.setState({ fields: fields });
            return <Redirect to={{
                pathname: this.state.redirect,
                state: { name: name, phone: phone }
            }} />

        } else {
            return (
                <section>
                    <div class="alert alert-danger alert-dismissible fade show" role="alert"
                        style={{ visibility: this.state.responseError === null ? "hidden" : "visible" }}>{this.state.responseError}</div>

                    <div class="alert alert-success alert-dismissible fade show" role="alert"
                        style={{ visibility: this.state.successMessage === null ? "hidden" : "visible", marginTop: "0px" }} >{this.state.successMessage}</div>

                    <div id="main-registration-container">


                        <center><div id="register" style={{ visibility: this.state.loading ? 'hidden' : 'visible' }}>

                            <h1><b>Please Enter</b></h1><br /><br />
                            <form method="post" name="userRegistrationForm" onSubmit={this.loginSubAdmin} >

                                <input type="text" className="form-control" name="name" fontSize="16px" placeholder="&#xF007;&nbsp;&nbsp;Full Name" value={this.state.fields.name} onChange={this.handleChange} />
                                <p className="errorMsg" style={{ textAlign: "left", marginLeft: "0.5em", marginTop: "0.5em" }}>{this.state.errors.name}</p><br />

                                <input type="text" class="form-control" id="inputError" name="phoneNumber" placeholder="&#xF007;&nbsp;&nbsp;Phone Number" value={this.state.fields.phoneNumber} onChange={this.handleChange} />

                                <div className="errorMsg" style={{ textAlign: "left", marginLeft: "0.5em", marginTop: "0.5em" }}>{this.state.errors.phoneNumber}</div><br /><br />


                                <div id="recaptcha-container"></div>
                                <button style={{ background: this.state.isFormValidated ? "rgb(255,248,0)" : "rgba(1, 5, 38, 0.05)" }} type="submit"
                                    className="button" value="SEND OTP" disabled={!this.state.isFormValidated}>
                                    <span class="buttonText" style={{ color: this.state.isFormValidated ? "rgba(1,5,38,1.0)" : "rgba(1, 5, 38, 0.5)" }}><b>SEND OTP</b></span></button>
                            </form>


                        </div></center>
                        {this.state.loading && Loading('Signing in...')}
                    </div>
                </section>
            );
        }
    }


}


export default UserLoginForm;