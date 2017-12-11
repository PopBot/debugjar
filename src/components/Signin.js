import React, { Component } from 'react';
import { HashRouter as Router, Redirect, Switch, Route, Link } from 'react-router-dom';
import '../App.css';
import firebase from 'firebase/app';
import constants from "./constants";

export default class Signin extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            currentUser: undefined,
            email: "",
            password: "",
            confirm: "",
            displayName: "",
            authenticated: false
        };
      }

      componentDidMount() {
        this.authUnsub = firebase.auth().onAuthStateChanged(user => {
          this.setState({currentUser: user});
        });
      }
    
      componentWillUnmount() {
        this.authUnsub();
      }
      
      handleSignIn(evt) {
	    evt.preventDefault();
        this.setState({working: true});
        console.log(this.props.history)
        console.log(constants.routes.allpost)
	    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
	        .then(() => this.props.history.push(constants.routes.allpost))
	        .then(() => this.setState({errorMessage: undefined}))
            .catch(err => this.setState({errorMessage: err.message}))
            .then(() => this.setState({working: false}))
	        .catch(err => this.setState({errorMessage: err.message}))
    }
    
    render() {
        
                let formStyles = {
                    display:"flex"
                }
                
                return (
                    <div>
        
        {this.state.errorMessage ? 
                  <div className="alert alert-danger">
                    {this.state.errorMessage}
                  </div> :
                  undefined
                }
              
                    <section>
                        <div className="container" >
                        <div className = "row container">
                            <div className="container col-lg-6 col-md-12" style={formStyles}>
                                <form className="centeredAuth">
                                    <h2 className="text-primary"> Log in </h2>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail1">Email address</label>
                                        <input type="email" onInput={evt => this.setState({email: evt.target.value})} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputPassword1">Password</label>
                                        <input type="password" onInput={evt => this.setState({password: evt.target.value})} className="form-control" id="exampleInputPassword1" placeholder="Password"/>
                                    </div>
                                    <button  type="submit" disabled={this.state.working} onClick={evt => this.handleSignIn(evt)} className="btn btn-primary">Submit</button>
                                </form>
                            </div>
        
                        </div>
                        
                        </div>
                    </section>
        
                        
                        
        
                        
        
        
                    </div>
                );
            }

}