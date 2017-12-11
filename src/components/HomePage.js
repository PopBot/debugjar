import React from "react";
import { HashRouter as Router, Redirect, Switch, Route, Link } from 'react-router-dom';
import '../App.css';
import constants from "../components/constants";

export default class HomePageView extends React.Component {

    render() {
        return (
            <div className="container home">
                <div className="jumbotron">
                    <img src="./ladybug.png" width="100px" alt="LadyBug"/>
                    <h2>Have you ever been bitten by the code bug?</h2>
                    <h4>It hurts, but we're here to help</h4>
                    <h6>Ran into a problem with your code? Post it on DebugJar, the world's premier online code-solving marketplace. Have some of the world's most talented developers work to solve your issues.</h6>
                    <Link to={constants.routes.learnmore}><button type="button" class="btn btn-primary">Learn More</button></Link>
                </div>
                <div className="homepageHeader">

                    {/* How posting works */}
                    <h3>Post a Bug: How it works</h3>
                    <div className="row sameSizedColumns">
                        <div className="col-4">
                            <div class="card border-primary">
                                <div class="card-body">
                                    <blockquote class="card-blockquote">
                                        <h5>#1 Post a Bug</h5>
                                        <img src="./arrow-up-icon.png" width="64px" alt="Upload"/>
                                        <p>Running into some trouble? Post a code bug on DebugJar with the price you are willing to pay to solve the bug.</p>
                                    </blockquote>
                                </div>
                            </div>
                        </div>
                        <div className="col-4">
                        <div class="card border-dark">
                            <div class="card-body">
                                <blockquote class="card-blockquote">
                                    <h5>#2 Find a Match</h5>
                                    <img src="./countdown-icon.png" width="64px" alt="Find Match" />
                                    <p>Wait for responses from our qualified developers. Choose the best developer for your problem.</p>
                                </blockquote>
                            </div>
                            </div>
                        </div>
                        <div className="col-4">
                        <div class="card border-warning">
                            <div class="card-body">
                                <blockquote class="card-blockquote">
                                    <h5>#3 Get It Solved</h5>
                                    <img src="./dev-icon.png" width="64px" alt="Code" />
                                    <p>Get your code bug solved and pay the solver. Repeat when needed again. Gee, that was simple!</p>
                                </blockquote>
                            </div>
                            </div>
                        </div>

                    </div>

                    <br />
                    <br />

                    {/* How to answer */}
                    <h3>Solve for Cash: How it works</h3>
                    <div className="row sameSizedColumns">
                        <div className="col-4">
                            <div class="card border-primary">
                                <div class="card-body">
                                    <blockquote class="card-blockquote">
                                        <h5>#1 Find a Bug</h5>
                                        <img src="./caution-icon.png" width="64px" alt="Caution"/>
                                        <p>Search DebugJar for problems to solve. Reach out to the developer in regards to solving it.</p>
                                    </blockquote>
                                </div>
                            </div>
                        </div>
                        <div className="col-4">
                        <div class="card border-dark">
                            <div class="card-body">
                                <blockquote class="card-blockquote">
                                    <h5>#2 Solve It</h5>
                                    <img src="./circlecompass-icon.png" width="64px" alt="Code" />
                                    <p>Fix the bug. Download the file of the bug, and solve it. Send back the fixed code to the uploader.</p>
                                </blockquote>
                            </div>
                            </div>
                        </div>
                        <div className="col-4">
                        <div class="card border-warning">
                            <div class="card-body">
                                <blockquote class="card-blockquote">
                                    <h5>#3 Get Paid</h5>
                                    <img src="./creditcard-icon.png" width="64px" alt="Credit Card" />
                                    <p>After the bug uploader reviews your code, accept payment from them. Repeat. Gee, that was simple!</p>
                                </blockquote>
                            </div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        );
    }
}