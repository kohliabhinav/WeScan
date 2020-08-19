import React, { Component } from "react";

class Seeyou extends Component {
    render() {
        return (
            <div style={{ paddingTop: "120px" }}>
                <center><img src="./assets/images/SeeYou.svg" alt="seeyou" style={{ width: "350px", height: "240px" }} /></center>
                <div><br />
                    <center><h1 style={{ fontSize: "28px", fontFamily: "Roboto" }}><b>See you again!</b></h1></center>
                    <center><p style={{ width: "298px", height: "19px", fontFamily: "Roboto", textColor: "B8BBC6", fontSize: "20px", color: "#b8bbc6"  }}>Thank You for your cooperation</p></center>
                    <center><p style={{ width: "298px", height: "19px", fontFamily: "Roboto", textColor: "B8BBC6", fontSize: "16px" }}>Please show the screen in check-out point</p></center>

                </div>
            </div>
                
        );
    }
}
export default Seeyou;