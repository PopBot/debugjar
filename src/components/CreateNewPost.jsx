import React from "react";
import firebase from "firebase/app";
import { HashRouter as Router, Redirect, Switch, Route, Link } from 'react-router-dom';
import constants from "../components/constants";
import "firebase/auth";
import "firebase/database";

export default class SendPost extends React.Component {
    constructor(props) {
        super(props);
        var user = firebase.auth().currentUser;

        this.state = {
            title: '',
            description: '',
            profile: {},
            price: 0,
            uploadFile: '',
            tags: [],
            name: '',
            githublink: '',
            display: 'true',
        }
        var profileRef = firebase.database().ref('profile/' + user.uid)
        profileRef.on('value', (snapshot) => {
            var prof = snapshot.val();
            this.setState({ profile: snapshot.val() });
        })
    }
    uploadMessage(event) {
        event.preventDefault();
        var newProfile;
        //make sure all the required fields are filled
        var user = firebase.auth().currentUser;
        var username = firebase.auth().currentUser.displayName;
        var profileRef = firebase.database().ref('profile/' + user.uid)
        var prof;
        profileRef.on('value', (snapshot) => {
            prof = snapshot.val();
        });

        if (this.state.price > prof.credit) {
            this.setState({ errorMessage: "Not Enough Credits!" });
        }
        if (this.state.tags.length === 0) {
            this.setState({ errorMessage: "Please add a tag" });
        }
        else if (this.state.title !== '' && this.state.description !== '' && this.state.price !== '') {
            var postsRef = firebase.database().ref('posts');
            var user = firebase.auth().currentUser;
            //if using another direcotry in firebase, move the user details to a different array
            var userKey = user.uid;

            this.state.tags = this.state.tags.split(',').map(function (item) {
                return item.trim().toLowerCase();
            });

            var newPost = {
                title: this.state.title,
                description: this.state.description,
                userId: userKey,
                profile: this.state.profile,
                price: this.state.price,
                uploadFile: this.state.uploadFile,
                tags: this.state.tags,
                createdAt: firebase.database.ServerValue.TIMESTAMP,
                name: username,
                githublink: this.state.githublink,
                display: 'true',
            };

            prof.credit = prof.credit - this.state.price;
            profileRef.update(prof);

            var pushKey = postsRef.push().getKey();
            postsRef.child(pushKey).set(newPost);
            this.addPostToAllTags(newPost, pushKey);
            postsRef
            this.setState({
                title: '',
                description: '',
                price: '',
                githublink: '',
                tags: []
            })
        }


    }
    addPostToAllTags(postToPush, pushKey) {
        this.state.tags.forEach(function (tag) {
            var postsForTagRef = firebase.database().ref("tags/" + tag);
            postsForTagRef.child(pushKey).set(pushKey);
        });
    }
    render() {

        return (
            <div>
                {this.state.errorMessage ?
                    <div className="alert alert-danger">
                        {this.state.errorMessage}
                    </div> :
                    undefined
                }

                <div className="container col-6 text-left">
                    <br />

                    <form onSubmit={evt => this.uploadMessage(evt)}>
                        <fieldset>
                            <legend>Upload your bug!</legend>
                            <div className="form-group">
                                <input id="Title" type="text" className="form-control" placeholder="enter the title"
                                    value={this.state.title}
                                    onInput={evt => this.setState({ title: evt.target.value })} />
                            </div>
                            <div className="form-group">
                                <input id="Description" type="text" className="form-control" placeholder="Give us some details about your problem"
                                    value={this.state.description}
                                    onInput={evt => this.setState({ description: evt.target.value })} />
                            </div>
                            <div className="form-group">
                                <input id="Price" type="number" className="form-control" placeholder="Credits Offered"
                                    value={this.state.price}
                                    onInput={evt => this.setState({ price: evt.target.value })} />
                            </div>
                            <div className="form-group">
                                <input id="GitHubLink" type="text" className="form-control" placeholder="Link to Code on GitHub"
                                    value={this.state.githublink}
                                    onInput={evt => this.setState({ githublink: evt.target.value })} />
                            </div>
                            <div className="form-group">
                                <input id="Programming Language" type="text" className="form-control" placeholder="Languages (separated by comma)"
                                    value={this.state.tags}
                                    onInput={evt => this.setState({ tags: evt.target.value })} />
                            </div>

                            <div className="form-group">
                                <button type="submit" className="btn btn-success" disabled={this.state.title.length === 0 || this.state.price === '' || this.state.tags === ''}>
                                    Upload post!
                            </button>
                            </div>


                        </fieldset>
                    </form>

                </div>
            </div>
        )
    }
}
