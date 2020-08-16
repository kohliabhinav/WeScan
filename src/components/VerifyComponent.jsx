import React, { Component } from 'react';
import OtpInput from 'react-otp-input';
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
                    <div className="col-12">
                        <center><b><h1 style={{ fontFamily: "Roboto", fontSize: "28px", width: "234px", height: "33px", letterSpacing: "0.56px", textDecorationColor: 'black', fontWeight: "100px" }}> Verify your Phone</h1></b></center>
                        <center><p style={{
                            fontFamily: "Roboto", width: "192px", height: "21px", color: "#b8bbc6", fontSize:"16px"
                        }}>OTP sent to 1234567891</p></center>
                    </div>
                </div>
                <div><br/><br/>

                    <div style={{ width: "296", height: "1000", fontSize: '40px', borderRadius: "5px",color:"#010526" }}>
                        <center><OtpInput id="VerificationCode" style={{ width: "296", height: "56", color: "#010526" }}
                            onChange={this.handleChange} 
                        numInputs={6}
                        separator={<span>&nbsp;</span>}
                    /></center>
                    </div><br /><br/>
                    

                    <center><a href="#" style={{
                        fontFamily: "Roboto", fontSize: "16px", width: "88px", height: "21px", color: "#010526"
                    }}>Resend OTP</a><br /><br /></center>
                    <div>
                    
                        

                        <button style={{ borderRadius: '50px', width: "280px", height: "70px" }} type="submit" className="button" value="SEND OTP" ><span style={{ color: "black", width: "82px", height: "21px", fontFamily: "Roboto", justifyContent: "center", alignItems:"center" }}><b>VERIFY</b></span></button>
                            

                    

                        
                    </div>
                </div>
            </div>



        );
    }
    }

export default Verify;
