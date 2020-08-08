import React, { Component } from 'react';
import Main from './components/MainComponent'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'
import 'bootstrap-social/bootstrap-social.css'
import './App.css'
import {BrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux';
import { ConfigureStore } from './redux/configureStore'
import firebase from "./firebase"
    ;
const store = ConfigureStore();

class App extends Component {
    setUpRecaptura = () => {
        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
            'size': 'invisible',
            'callback': function (response) {
                // reCAPTCHA solved, allow signInWithPhoneNumber.
                this.onSignInSubmit();
            }
        });
    }
    onSignInSubmit = (event) => {
        this.setUpRecaptura();
        event.preventDefault();
        var phoneNumber = "+917898548242";
        var appVerifier = window.recaptchaVerifier;
        firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
            .then(function (confirmationResult) {
                // SMS sent. Prompt user to type the code from the message, then sign the
                // user in with confirmationResult.confirm(code).
                window.confirmationResult = confirmationResult;
                var code = window.prompt("Enter OTP");
                confirmationResult.confirm(code).then(function (result) {
                    // User signed in successfully.
                    // var user = result.user;
                    console.log("User is signed in")
                    // ...
                }).catch(function (error) {
                    // User couldn't sign in (bad verification code?)
                    // ...
                });
            }).catch(function (error) {
                // Error; SMS not sent
                // ...
            });
    }
  render() {
    return(
    <Provider store={store}>
    <BrowserRouter>
                <Main />
    </BrowserRouter>
    </Provider>
    )
  }
}

export default App;

