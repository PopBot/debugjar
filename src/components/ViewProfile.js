import React from "react";
import firebase from "firebase/";
import {Link} from "react-router-dom";
import constants from "./constants";

export default class RenderProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            postData: "",
        }
    }
    
    componentWillMount() {
        let profileKey = this.props.match.params.userId;
        console.log(profileKey);
        let sliceProfileKey = profileKey.slice(1);
        let data = firebase.database().ref('profile/' + sliceProfileKey);
        console.log(data);
        data.on("value", (snapshot) => {
            this.setState({postData: snapshot.val()});
        })
        this.authUnsub = firebase.auth().onAuthStateChanged(user => {
            this.setState({authenticated: user != null});
        });
    }

    componentWillUnmount() {
        this.setState({postData: ""});
    }

    render() {

        return (
           
            <div className="container">
                <div className="bodyText">
                    <h1>{this.state.postData.name}</h1>
                    <img src={this.state.postData.photoURL} />
                    <p><strong>Website:   </strong> {this.state.postData.personalwebsite}</p>
                    <p><strong>LinkedIn Profile:   </strong> {this.state.postData.linkedin}</p>
                    <p><strong>Email:   </strong> {this.state.postData.email}</p>
                    <p><strong>Bio:</strong></p>
                    <p>{this.state.postData.bio}</p>
                </div>  
            </div>
        )
    }
}