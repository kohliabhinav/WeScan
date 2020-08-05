import React, { Component } from 'react';
import OtpInput from 'react-otp-input';
import { Breadcrumb, BreadcrumbItem, Button, Label, Row, Col } from 'reactstrap'
import { Link } from 'react-router-dom'
import { Control, Form, Errors } from 'react-redux-form'



class Verify extends Component {
    state = {
        otp: '',
    };
     


    handleChange = otp => this.setState({ otp });

    render() {
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb style={{
                        marginLeft: '70px'
                    }}>
                        <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Contact Us</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h2 style={{ fontFamily: "Roboto", marginLeft: '40px',fontSize: "28", width: "174", height: "37", letterSpacing: "38", textDecorationColor: 'black', fontWeight:"100px" }}> Verify your Phone</h2>
                    </div>
                </div>
                <div style={{
                    marginLeft: '40px'
                }}>
                    <p style={{ fontFamily: "Roboto", fontSize: "16", width: "190", height: "21", letterSpacing: "38", textDecorationColor: 'black' }}>Code sent to 00000</p>
                    <div style={{ width: "296", height: "56", fontSize: '2rem' }}>
                    <OtpInput id="VerificationCode" style={{ width: "296", height: "56"}}
                        onChange={this.handleChange}
                        numInputs={6}
                        separator={<span>-</span>}
                    />
                    </div><br />
                    

                <a href="#" style={{ fontFamily: "Roboto", fontSize: "16", width: "88", height: "21", letterSpacing: "38" }}>Resend OTP</a><br /><br />
                    <div>
                    
                <Row className="form-group">
                    
                        <Button type="submit" onClick="codeverify();" color="secondary" style={{ borderRadius: '100px', width: '250px', height: '56px' }}>
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
