import React, { Component } from 'react';
import OtpInput from 'react-otp-input';
import { Button, Row } from 'reactstrap'



class Verify extends Component {
    state = {
        otp: '',
    };
     


    handleChange = otp => this.setState({ otp });

    render() {
        return (
            <div className="container" style={{
                padding: "50px"
            }}>
                <div className="row">
                    <div className="col-12">
                        <h2 style={{ fontFamily: "Roboto",fontSize: "28", width: "174", height: "37", letterSpacing: "38", textDecorationColor: 'black', fontWeight:"100px" }}> Verify your Phone</h2>
                    </div>
                </div>
                <div><br/><br/>
                    <p style={{ fontFamily: "Roboto", fontSize: "16", width: "190", height: "21", letterSpacing: "38", textDecorationColor: 'black' }}>Code sent to 00000</p>
                    <div style={{ width: "296", height: "56", fontSize: '2rem' }}>
                    <OtpInput id="VerificationCode" style={{ width: "296", height: "56"}}
                        onChange={this.handleChange}
                        numInputs={6}
                        separator={<span>-</span>}
                    />
                    </div><br /><br/>
                    

                <a href="#" style={{ fontFamily: "Roboto", fontSize: "16", width: "88", height: "21", letterSpacing: "38" }}>Resend OTP</a><br /><br />
                    <div><br/>
                    
                <Row className="form-group">
                    
                            <Button type="submit" href="./Confirm" onClick="codeverify();" color="secondary" style={{ marginLeft:"10px" ,borderRadius: '100px', width: '285px', height: '56px' }}>
                            VERIFY
                            </Button>

                    

                        </Row>
                    </div>
                </div>
            </div>



        );
    }
    }

export default Verify;
