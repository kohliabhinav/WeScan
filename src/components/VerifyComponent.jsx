import React, { Component } from 'react';
import OtpInput from 'react-otp-input';
import { Button, Row } from 'reactstrap'
import './style.css';
import 'font-awesome/css/font-awesome.min.css';



class Verify extends Component {
    state = {
        otp: '',
    };
     


    handleChange = otp => this.setState({ otp });

    render() {
        return (
            <div className="container" style={{
                padding: "60px"
            }}><br/><br/>
                <div className="row">
                    <center><div className="col-12">
                        <h2 style={{ fontFamily: "Roboto", fontSize: "28", width: "174", height: "37", letterSpacing: "38", textDecorationColor: 'black', fontWeight: "100px" }}> Verify your Phone</h2>
                        <p style={{ fontFamily: "Roboto", fontSize: "16", width: "190", height: "21", letterSpacing: "38", textDecorationColor: 'black' }}>Code sent to 00000</p>
                    </div></center>
                </div>
                <div><br/><br/>
                    
                    <div style={{ width: "296", height: "1000", fontSize: '42px' }}>
                    <OtpInput id="VerificationCode" style={{ width: "296", height: "56"}}
                        onChange={this.handleChange}
                        numInputs={6}
                        separator={<span>.</span>}
                    />
                    </div><br /><br/>
                    

                    <a href="#" style={{
                        fontFamily: "Roboto", fontSize: "16", width: "88", height: "21", letterSpacing: "38", marginLeft:"95px"
                    }}>Resend OTP</a><br /><br />
                    <div>
                    
                        

                            <button style={{ borderRadius: '100px', backgroundColor: 'yellow', width: "300px", height: "70px" }} type="submit" className="button" value="SEND OTP" ><span style={{ color: "black", textAlign:"center" }}>VERIFY</span></button>
                            

                    

                        
                    </div>
                </div>
            </div>



        );
    }
    }

export default Verify;
