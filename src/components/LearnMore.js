// Import packages and dependencies here
import React, { Component } from 'react';
import { HashRouter as Router, Redirect, Switch, Route, Link } from 'react-router-dom';
import '../App.css';
import constants from "../components/constants";

export default class Guide extends React.Component {
    
        render() {
            return (
                <div className="container">
                    <h1>How It Works Guide</h1>
                    <div className="bodyText">
                        <p>So you've got this big problem with your code...</p>
                        <img src="macbook-code.jpeg" height="426px" width="640px" />
                        <p>It's a pretty big bug...</p>
                        <p>What are you going to do?</p>
                        <p><strong>Answer:</strong> you're going to post it to DebugJar, the world's premier marketplace for debugging code.</p>
                        <p>Its never been easier to have someone debug your code for you.</p>
                        <p>First, create an account on DebugJar.</p>
                        <img src="signup-screenshot.png" />
                        <p>Fill out the profile and make sure you have a <a href="http://en.gravatar.com/" target="blank">Gravatar</a> associated to your email address.</p>
                        <img src="GravatarScreenshot.png" />
                        <p>Then post a bug.</p>
                        <img src="Post-A-Bug.png" />
                        <p>Something unique about DebugJar is that it uses a credit system to facilitate purchases. This way there will be no confusion when working across the world.</p>
                        <p>Users can purchase more credits <Link to={constants.routes.purchasecredit}>here</Link>.</p>
                        <p>After posting a problem, other users submit their respective solution to the bug by posting a comment.</p>
                        <p>The original bug poster has a variety of possible answers to their bug and chooses the best one.</p>
                        <p>They award their bounty of credits to the user whose comment solves the problem most efficiently.</p>
                    </div>
                </div>
            );
        }
    }