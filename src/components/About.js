// Import packages and dependencies here
import React, { Component } from 'react';
import { HashRouter as Router, Redirect, Switch, Route, Link } from 'react-router-dom';
import '../App.css';


export default class AboutView extends React.Component {
    
        render() {
            return (
                <div className="container">
                    <h1>About</h1>
                    <p>DebugJar has been created for an INFO 343 project.</p>
                    <h3>The Team</h3><br /><br />
                        <div className="row">
                                <div className="col-6">
                                    <img src="./Jarod.jpg" width="200px" /><br />
                                    <h5>Jarod Wong</h5>
                                        <p><strong>PM</strong></p>
                                </div>
                                <div className="col-6">
                                    <img src="./Nelson.jpg" /><br />
                                    <h5>Nelson Tan</h5>
                                        <p><strong>Back-End Dev</strong></p>
                                </div>
                        </div>
                        <br />
                        <br />
                        <div className="row">
                            <div className="col-6">
                                <img src="./Sid.jpg" /><br />
                                <h5>Sid Nalegave</h5>
                                    <p><strong>Front-End Dev</strong></p>
                            </div>
                            <div className="col-6">
                                <img src="./Jay.jpg" width="200px" /><br />
                                <h5>Jay Krishnasamy</h5>
                                    <p><strong>Front-End Dev</strong></p>
                            </div>
                        </div>
                        <br />
                        <br />
                        <p>Made with <span id="heart">&hearts;</span> in Seattle, WA</p>
                </div>
            );
        }
    }