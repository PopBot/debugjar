// Note: This file should still exist, but it is not the currently used Terms of Service page.
// That page is Terms.js
// This page is used merely to not throw off React from a missing component

// Import packages and dependencies here
import React, { Component } from 'react';
import { HashRouter as Router, Redirect, Switch, Route, Link } from 'react-router-dom';
import '../App.css';


export default class TermsView extends React.Component {
    
        render() {
            return (
                <div className="container">
                    <h1>Terms of Service</h1>
                    <p>This agreement is between the User and DebugJar.</p>
                    <p>DebugJar is not responsible for the actions of its users. Any harm done to a user, monetary problem, or issue of incorrect code is up to the two user parties to resolve. DebubJar is merely a commerce platform for users to conduct business on.</p>
                </div>
            );
        }
    }