// Import packages and dependencies here
import React, { Component } from 'react';
import { HashRouter as Router, Redirect, Switch, Route, Link } from 'react-router-dom';
import '../App.css';

export default class FooterView extends React.Component {
    
        render() {
            return (
                <div>
                    <footer class="footer">
                        <div class="container">
                            <span class="text-muted">Place sticky footer content here.</span>
                        </div>
                    </footer>
                </div>
            );
        }
    }