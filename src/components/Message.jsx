import React from "react";
import "./RequestCard.css";
import firebase from "firebase/app";
import md5 from "blueimp-md5";
import { HashRouter as Router, Redirect, Switch, Route, Link } from 'react-router-dom';
import constants from "../components/constants";
import NewMessageInput from "./NewMessageInput";
import MessageList from "./MessageList";
// Import Admin SDK
import "firebase/auth";
import "firebase/database";

export default class Message extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            postId: "",
            profile: "",
            postData: "",
            comment: ""
        }
    }

    componentDidMount() {
        var postRef = firebase.database().ref("/posts");
        console.log(postRef);
        var profileRef = firebase.database().ref("/profile");
        console.log(profileRef);

        console.log(this.props.postData);
        console.log(this.props.userAuthProfile);
        var user = firebase.auth().currentUser;
        console.log(user);
        var uid = user.uid;
        console.log(uid);

    }

    componentWillUnmount() {

    }

    payNow() {
        let message = this.props.messageSnapshot.val();
        console.log(message.author.uid);
        var messageObject = firebase.database().ref("/profile/" + message.author.uid);
        console.log(messageObject);

    }

    render() {
        let message = this.props.messageSnapshot.val();
        console.log(message.author.uid);
        var messageObject = firebase.database().ref("/profile/" + message.author.uid);
        console.log(messageObject);
        var messageUserId = message.author.uid;
        console.log(messageUserId);
        var user = firebase.auth().currentUser;
        console.log(user);
        var uid = user.uid;
        console.log(uid);


        return (
            <div className="container">
                <hr />
                <div className="row d-flex">
                    <div className="messageCard">
                        <form>
                            <div className="form-group d-flex">
                                <div className="d-flex">
                                    <img src={message.author.photoURL} alt="user profile image" width="100px" height="100px" />
                                </div>

                                <div className="d-flex row-md-auto flex-column pl-3 p-2 border border-dark">
                                    <div className="container">
                                        <div className="row">
                                        </div>
                                    </div>
                                    <h4 className="d-flex text-center"><Link to={"/viewprofile/:" + message.author.uid}>{message.author.displayName}</Link></h4>
                                    <p className="d-flex">{message.body}</p>

                                    {
                                    (messageUserId !== uid) ?
                                        <button id="payBUtton" className="btn btn-secondary" disabled={messageUserId !== uid}>Pay User</button> :
                                        <Link to={constants.routes.allpost}><button id="payButton" className="btn btn-secondary" onClick={evt => this.payNow(evt)} disabled={messageUserId !== uid}>Pay User</button></Link>
                                    }
                                    
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}