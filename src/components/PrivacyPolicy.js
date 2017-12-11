// Import packages and dependencies here
import React, { Component } from 'react';
import { HashRouter as Router, Redirect, Switch, Route, Link } from 'react-router-dom';
import '../App.css';


export default class PrivacyView extends React.Component {
    
        render() {
            return (
                <div className="container">
                    <h1>Privacy Policy</h1>
                    <div className="bodyText">
                        <p>At DebugJar, we take your privacy very seriously. That is why we only collect the data you supply to us.</p>
                        <p>This data includes a user's display name, resume, email, password, profile link, and posts on site.</p>
                        <p>All data is stored in a <a href="https://www.firebase.com" target="_blank">Firebase</a> database.</p>
                    </div>
                    <img src="./hacking.jpg" width="640px" />
                    <p>Happy coding!</p>
                </div>
            );
        }
    }