// Import packages and dependencies here
import React, { Component } from 'react';
import { HashRouter as Router, Redirect, Switch, Route, Link } from 'react-router-dom';
import '../App.css';
import firebase from "firebase/app";
import constants from "./constants";
import "firebase/auth";
import "firebase/database";


export default class NumCreditsRemaining extends React.Component {
    constructor(props) {
        super(props);
        var user = firebase.auth().currentUser;
        this.state = {
            postData: ""
        };
    }

    componentDidMount() {
        var user = firebase.auth().currentUser;
        var userId = user.uid;
        var data = firebase.database().ref("profile/" + userId)
        data.on("value", (snapshot) => {
            this.setState({ postData: snapshot.val() });
        })
    }

    componentWillUnmount() {
        this.setState({ postData: "" });
    }

    render() {
        var user = firebase.auth().currentUser;
        var userId = user.uid;
        var userProfile = firebase.database().ref("profile/" + userId)
        var credits = userProfile.credit;
        return (
            <Link to = {constants.routes.purchasecredit}><button className="btn btn-secondary ml-auto mr-auto">{this.state.postData.credit} Credits Remaining <img src="./Bug_Token.png" /></button></Link>
        );
    }
}