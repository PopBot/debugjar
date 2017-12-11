// Import packages and dependencies here
import React, { Component } from 'react';
import { HashRouter as Router, Redirect, Switch, Route, Link } from 'react-router-dom';
import '../App.css';


export default class TermsOfServiceView extends React.Component {
    
        render() {
            return (
                <div className="container">
                    <h1>Terms of Service</h1>
                    <div className="bodyText">
                        <p>This agreement is between the User and DebugJar.</p>
                        <p>DebugJar is not responsible for the actions of its users. Any harm done to a user, monetary problem, or issue of incorrect code is up to the two user parties to resolve. DebubJar is merely a commerce platform for users to conduct business on.</p>
                        <p>Users are responsible for contacting developers to debug their programs and payment on another platform.</p>
                    </div>
                    <img src="./debug-code.jpg" width="640px" />
                    <p>As always, be safe online!</p>
                </div>
            );
        }
    }