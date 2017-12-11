import React from "react";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

export default class NewMessageInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messageBody: "",
            price: 0
        };
    }

    componentDidMount() {
        // listen for auth change
        this.authUnsub = firebase.auth().onAuthStateChanged(user => {
            this.setState({ authenticated: user != null });
        });
    }

    componentWillUnmount() {
        this.authUnsub();
    }

    handleSubmit(event) {
        let user = firebase.auth().currentUser;
        var username = firebase.auth().currentUser.displayName;
        var idOfThisUser = firebase.auth().currentUser.uid;
        var userObject = firebase.auth().currentUser;

        event.preventDefault();

        let message = {
            body: this.state.messageBody,
            createdAt: firebase.database.ServerValue.TIMESTAMP,
            author: {
                displayName: user.displayName,
                photoURL: user.photoURL,
                uid: user.uid,
                name: username
                // uid: idOfThisUser,
                // objectofUser: userObject,
            }
        };
        console.log(message);

        this.props.messagesRef.push(message)
            .then(() => this.setState({ messageBody: "" }))
            .catch(err => this.setState({ errorMessage: err.message }));
        // this.props.messagesRef.set({
        //     uid: idOfThisUser
        // });
    }
    render() {
        return (
            <form onSubmit={event => this.handleSubmit(event)}>
                {
                    this.state.errorMessage ?
                        <div className="alert alert-danger">{this.state.errorMessage}</div> :
                        undefined
                }
                <input type="text"
                    className="form-control"
                    placeholder="Write a message!"
                    value={this.state.messageBody}
                    onInput={event => this.setState({ messageBody: event.target.value })} />
            </form>
        );
    }
}