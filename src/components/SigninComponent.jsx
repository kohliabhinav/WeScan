import React, { Component } from 'react';



class Signin extends Component {

    constructor() {
        super();
        this.state = {
            input: {},
            errors: {}
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        let input = this.state.input;
        input[event.target.name] = event.target.value;

        this.setState({
            input
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        if (this.validate()) {
            console.log(this.state);

            let input = {};
            input["name"] = "";
            input["phone"] = "";
            this.setState({ input: input });

            alert('Response is submited');
        }
    }
    validate() {
        let input = this.state.input;
        let errors = {};
        let isValid = true;

        if (!input["name"]) {
            isValid = false;
            errors["name"] = "Please enter your name.";
        }

        
        if (!input["phone"]) {
            isValid = false;
            errors["phone"] = "Please enter your phone number.";
        }

        if (typeof input["phone"] !== "undefined") {

            var pattern = new RegExp(/^[0-9\b]+$/);
            if (!pattern.test(input["phone"])) {
                isValid = false;
                errors["phone"] = "Please enter only number.";
            } else if (input["phone"].length != 10) {
                isValid = false;
                errors["phone"] = "Please enter valid phone number.";
            }
        }

       

        return isValid;
    }

    
    render() {
        return (
           <center> <div className="container" style={{
                padding: "50px"
            }}><br /><br />



                <h1 style={{ fontFamily: "Roboto", fontSize: "28", width: "174", height: "37", letterSpacing: "38", marginLeft: "20px" }}> Please Enter</h1><br/><br/>


                <form onSubmit={this.handleSubmit}>

                    <div class="form-group">
                        
                        <input style={{
                            width: "290px", height: "56px", fontFamily: "Roboto", fontSize: "16", borderRadius: "6px"
                        }}
                            type="text"
                            name="name"
                            value={this.state.input.name}
                            onChange={this.handleChange}
                            class="form-control"
                            placeholder="Full Name"
                            id="name"
                        />

                        <div className="text-danger">{this.state.errors.name}</div>
                    </div><br/>

                    

                    <div class="form-group">
                        
                        <input style={{
                            width: "290px", height: "56px", borderRadius: "6px", fontFamily: "Roboto", fontSize: "16"
                        }}
                            type="text"
                            name="phone"
                            value={this.state.input.phone}
                            onChange={this.handleChange}
                            class="form-control"
                            placeholder="Mobile Number"
                            id="number" />

                        <div className="text-danger">{this.state.errors.phone}</div>
                    </div><br/>

                  
                    <input type="submit" href="./Confirm" value="Submit" style={{ borderRadius: '100px', height: '56px', width: '290px', marginLeft: "20px" }} class="btn btn-success" />
                </form>
            </div></center>
        );
    }
}

export default Signin;