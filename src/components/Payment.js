// Import packages and dependencies here
import React, { Component } from 'react';
import { HashRouter as Router, Redirect, Switch, Route, Link } from 'react-router-dom';
import '../App.css';


export default class PurchaseCredits extends React.Component {
    constructor(props) {
        super(props);

    }
        
    render() {
        return (
            <div className="container">
                <h1>Purchase More Credits</h1>
                <p>Note: for the purpose of user safety, you cannot actualy spend real money on our site.</p>
                <p>This is merely a mockup of an actual payment system.</p>
                <div className="row">
                    <div className="col-4">
                        <div className="card">
                            <div className="card-header">20 Credits</div>
                            <div className="card-body">
                                <img src="/20_Bugs.png" height="60px" width="120px" className="center-cardImage" /><br />
                                <div className="card-title">$19.99</div>
                                <p>Act now and get 20 Credits for $19.99.</p>
                                <img src="https://www.paypalobjects.com/webstatic/en_US/i/buttons/checkout-logo-large.png" alt="Check out with PayPal" />
                            </div>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="card">
                            <div className="card-header">50 Credits</div>
                            <div className="card-body">
                                <img src="/50_Bugs.png" height="60px" width="120px" className="center-cardImage" /><br />
                                <div className="card-title">$44.99</div>
                                <p>Act now and get 50 Credits for $44.99.</p>
                                <img src="https://www.paypalobjects.com/webstatic/en_US/i/buttons/checkout-logo-large.png" alt="Check out with PayPal" />
                            </div>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="card">
                            <div className="card-header">100 Credits</div>
                            <div className="card-body">
                                <img src="/100_Bugs.png" height="60px" width="120px" className="center-cardImage" /><br />
                                <div className="card-title">$79.99</div>
                                <p>Act now and get 100 Credits for $79.99.</p>
                                <img src="https://www.paypalobjects.com/webstatic/en_US/i/buttons/checkout-logo-large.png" alt="Check out with PayPal" />
                            </div>
                        </div>
                    </div>
                </div>
                <h3>Pay Now</h3>
                    <img className="PayPalButton" src="/Cards.png" width="400px" />
                    <br />
                    <br />
            </div>
        );
    }
}