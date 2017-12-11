// Import packages and dependencies here
import React, { Component } from 'react';
import { HashRouter as Router, Redirect, Switch, Route, Link } from 'react-router-dom';
import './App.css';

// Import components here
import HomePageView from "./components/HomePage";
import AboutView from "./components/About";
import TermsView from "./components/TermsOfService";
import PrivacyView from "./components/PrivacyPolicy";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import TheJar from "./components/TheJar";
import CreateProfile from "./components/CreateProfile";
import constants from "./components/constants";
import firebase from "firebase/app";
import SendPost from "./components/CreateNewPost";
import TermsOfServiceView from "./components/Terms";
import RequestCard from "./components/RequestCard";
import PurchaseCredits from "./components/Payment";
import RenderProfile from "./components/ViewProfile";
import Guide from "./components/LearnMore";
import NumCreditsRemaining from "./components/CreditsRemaining";
import RenderTag from "./components/RenderTag"


function PrivateRoute ({component: Component, authenticated, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => (authenticated)
        ? <Component {...props} />
        : <Redirect to={{pathname: '/Signin', state: {from: props.location}}} />}
    />
  )
}

function PublicRoute ({component: Component, authenticated, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => (!authenticated)
        ? <Component {...props} />
        : <Redirect to='/jar' />}
    />
  )
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { authenticated: false }
  }

  componentDidMount() {
    //listen for auth change
    this.authUnsub = firebase.auth().onAuthStateChanged(user => {
      this.setState({ authenticated: user != null });
      if(user!=null){
        console.log("user logged in with: ", user.email, "auth: ", this.state.authenticated)
      }
      console.log("auth? ", this.state.authenticated)
    });
  }

  componentWillUnmount() {
    this.authUnsub();
  }

  handleSignOut() {
    this.setState({ errorMessage: undefined });
    firebase.auth().signOut()
      .catch(err => this.setState({ errorMessage: err.message }))
  }


  render() {
    return (
      <div className="App">
          <Router>
            <div>
              {/* Navbar */}
              <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <div className="container">
                  <a className="navbar-brand" href="/home"><img src="./DebugJar_logo.png" height="60px" alt="DebugJar"/></a>
                    <div className="form-inline">
                      
                      {
                    this.state.authenticated ?
                    <div className="sign">
                      <Link to={constants.routes.allpost}><button className="btn btn-success nav-item">Feed</button></Link>
                      <Link to={constants.routes.createpost}><button className="btn btn-warning nav-item">Post Bug</button></Link>
                      <Link to={constants.routes.homepage}><button className="btn btn-danger nav-item" onClick={() => { this.handleSignOut() }}>Log out</button></Link>
                    </div>
                    : 
                    <div className="sign">
                      <Link to={constants.routes.signup}><button type="button" className="btn btn-secondary">Sign Up</button></Link>
                      <Link to={constants.routes.signin}><button type="button" className="btn btn-secondary">Sign In</button></Link>
                    </div>
                  }
                    </div>
                </div>
              </nav>
              <Switch>
                <Route path = {constants.routes.homepage} exact component={HomePageView} />
                <PublicRoute authenticated={this.state.authenticated} path = {constants.routes.signup} exact component={Signup} />
                <PublicRoute authenticated={this.state.authenticated}  path = {constants.routes.signin} exact component={Signin} />
                <PrivateRoute  authenticated={this.state.authenticated} path = {constants.routes.allpost} component={TheJar} />
                <PrivateRoute  authenticated={this.state.authenticated} path = {constants.routes.createprofile} exact component={CreateProfile} />
                <PrivateRoute  authenticated={this.state.authenticated} path = {constants.routes.createpost} exact component={SendPost} />
                <Route path = {constants.routes.about} exact component={AboutView} />
                <Route path = {constants.routes.terms} exact compoenent={TermsView} />
                <Route path = {constants.routes.privacy} exact component={PrivacyView} />
                <Route path = {constants.routes.termsofservice} exact component={TermsOfServiceView} />
                <PrivateRoute  authenticated={this.state.authenticated} path = {constants.routes.viewpost} exact component={RequestCard} />
                <PrivateRoute  authenticated={this.state.authenticated} path = {constants.routes.viewTagData} exact component={RenderTag} />
                <Route path = {constants.routes.purchasecredit} exact component={PurchaseCredits} />
                <PrivateRoute  authenticated={this.state.authenticated} path = {constants.routes.viewprofile} exact component={RenderProfile} />
                <Route path = {constants.routes.learnmore} exact component={Guide} />
                <PrivateRoute  authenticated={this.state.authenticated} path = {constants.routes.creditsremaining} exact component={NumCreditsRemaining} />
                <Redirect to={constants.routes.homepage} />
              </Switch>
              {/* Footer */}
              <footer className="footer footer-fixed-bottom bg-light">
                  <div className="row">
                    <div className="col-3"><Link to={constants.routes.about}>About</Link></div>
                    <div className="col-3"><Link to={constants.routes.purchasecredit}>Purchase Credits</Link></div>
                    <div className="col-3"><Link to={constants.routes.termsofservice}>Terms of Service</Link></div>
                    <div className="col-3"><Link to={constants.routes.privacy}>Privacy Policy</Link></div>
                  </div>
              </footer>
            </div>
          </Router>
      </div>
    );
  }
}

export default App;
