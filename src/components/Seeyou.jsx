import React, { Component } from "react";

class Seeyou extends Component {
    render() {
        return (
            <div style={{ marginRight: "50px" }}>
                <center><img src="./assets/images/SeeYou.svg" alt="seeyou" style={{ width: "483px", height: "246px" }} /></center>
                <div><br/>
                    <center><h1>See you again!</h1></center>
                    <center><p style={{ width: "298px", height: "19px", fontFamily: "Roboto", textColor: "B8BBC6" }}>Thank You for your cooperation</p></center>
                    <br /><br /><br />
                    <center><p style={{ width: "375px", height: "56px", fontFamily: "Roboto", textColor: "B8BBC6" }}>Download our App to save time on your next visit </p></center>

                </div>
                <footer style={{ backgroundColor: "Yellow" }}>
                    <center><p style={{ width: "375px", height: "56px", fontFamily: "Roboto", textColor: "B8BBC6", placeContent: "center" }}> Download App </p></center>
                </footer>
            </div>
        );
    }
}
export default Seeyou;