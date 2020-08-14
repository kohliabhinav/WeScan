import React, { Component } from "react";

class Confirm extends Component {
    render() {
        return (
            <div style={{
                paddingTop: "100px"
            }}>
                <center><img src="./assets/images/Awesome.svg" alt="awesome" style={{ width: "420px", height: "246px" }}/></center><br/>
                <div>
                    <center><h1>Awesome!</h1></center>
                    <center><p style={{ width: "188px", height: "24px", fontFamily: "Roboto", textColor: "B8BBC6" }}>You Gained the pass</p></center >
                    <center><p style={{ width: "298px", height: "19px", fontFamily: "Roboto", textColor: "B8BBC6" }}>Please show the screen in check-in point</p></center>
                </div>
            </div>
                
        );
    }
}
export default Confirm;