import React from "react";
import { Link } from "react-router-dom";
import firebase from 'firebase/app';
import constants from "./constants";
import md5 from "blueimp-md5";

export default class Signup extends React.Component {

    constructor(props) {
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

    handleSignUp(evt) {
        evt.preventDefault();
        if (this.state.password !== this.state.confirm) {
            this.setState({ errorMessage: "passwords do not match" });
        }
        else if (this.state.displayName === "") {
            this.setState({ errorMessage: "you must make a display name" });
        }
        else {
            var hashGrav = md5(this.state.email); 
            var gravUrl = "https://www.gravatar.com/avatar/"+hashGrav+"?s=100&r=r&d=retro";
            console.log(gravUrl)
            firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
                .then(user => {
                    return user.updateProfile({
                        displayName: this.state.displayName,
                        photoURL: gravUrl
                    });
                }).then(response => this.props.history.push(constants.routes.createprofile))
                .catch(e => this.setState({ errorMessage: e.message }));
        }
    }

    componentDidMount() {
        this.authUnsub = firebase.auth().onAuthStateChanged(user => {
            this.setState({ currentUser: user });
        });
    }

    componentWillUnmount() {
        this.authUnsub();
    }


    render() {

        let formStyles = {
            display: "flex"
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
                    <div class="container" >
                        <div className="row container">
                            <div className="container col-lg-6 col-md-12" style={formStyles}>
                                <form className="centeredAuth">
                                    <h2 className="text-danger"> Sign Up Now </h2>
                                    <div className="form-group">
                                        <label for="exampleInputEmail1">Email address</label>
                                        <input type="email" className="form-control" onInput={evt => this.setState({ email: evt.target.value })} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                                    </div>
                                    <div className="form-group">
                                        <label for="exampleInputPassword1">Password</label>
                                        <input type="password" className="form-control" onInput={evt => this.setState({ password: evt.target.value })} id="exampleInputPassword1" placeholder="Password" />
                                        <input type="password" className="form-control" onInput={evt => this.setState({ confirm: evt.target.value })} id="exampleInputPassword1" placeholder="Re-type password" />
                                    </div>
                                    <div className="form-group">
                                        <label for="exampleFormControlTextarea1">Display Name</label>
                                        <input type="text" className="form-control" onInput={evt => this.setState({ displayName: evt.target.value })} id="exampleFormControlTextarea1" placeholder="Display Name"/>
                                    </div>
                                    <Link to={constants.routes.createprofile}><button type="submit" disabled={this.state.working} onClick={evt => this.handleSignUp(evt)} className="btn btn-success">Submit</button></Link>
                                </form>
                            </div>


                        </div>

                    </div>
                </section>







            </div>
        );
    }

}
