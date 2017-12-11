import React from "react";
import "./RequestCard.css";
import firebase from "firebase/app";
import md5 from "blueimp-md5";
import { HashRouter as Router, Redirect, Switch, Route, Link } from 'react-router-dom';
import constants from "../components/constants";
import NewMessageInput from "./NewMessageInput";
import MessageList from "./MessageList";
// Import Admin SDK
import "firebase/auth";
import "firebase/database";

export default class RequestCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            postData: "",
            comment: "",
            price: 0,
            profile: ""
        }
    }

    componentDidMount() {
        let urlPostKey = this.props.match.params.postKey;
        let slicePostKey = urlPostKey.slice(1);
        let data = firebase.database().ref('posts/' + slicePostKey);
        data.on("value", (snapshot) => {
            this.setState({
                postData: snapshot.val(),
                price: snapshot.val().price
            });
        });
        var user = firebase.auth().currentUser;
        var profileRef = firebase.database().ref('profile/' + user.uid)
        profileRef.on('value', (snapshot) => {
            this.setState({
                profile: snapshot.val()
            });
        });

        var userAuthProfile = profileRef;
        console.log(userAuthProfile);
    }

    componentWillUnmount() {
        this.setState({ postData: "" });
    }

    closeQuestion() {
        let postObjectRef = this.props.match.params.postKey;
        console.log("Post Object Ref " + postObjectRef);
        console.log(postObjectRef);
        let slicePostKey = postObjectRef.slice(1);
        console.log("Slice Post Key " + slicePostKey);
        console.log(slicePostKey);
        let postObject = firebase.database().ref('posts/' + slicePostKey);
        postObject.on("value", (snapshot) => {
            this.setState({ postData: snapshot.val().comments });
            console.log(snapshot.val().comments);
        })

        // postObject.update({
        //     "display": 'false'
        // });
        console.log(postObject);


        let commentsOnPost = firebase.database().ref("posts/" + slicePostKey + "/comments/");
        commentsOnPost.on("value", (snapshot) => {
            this.setState({ postData: snapshot.val() });
        });
        console.log(commentsOnPost);
    }

    hideQuestion() {
        let postObjectRef = this.props.match.params.postKey;
        console.log("Post Object Ref " + postObjectRef);
        console.log(postObjectRef);
        let slicePostKey = postObjectRef.slice(1);
        console.log("Slice Post Key " + slicePostKey);
        console.log(slicePostKey);
        let postObject = firebase.database().ref('posts/' + slicePostKey);
        postObject.on("value", (snapshot) => {
            this.setState({ postData: snapshot.val() });
        })
        console.log("Final Object: " + postObject);
        console.log(postObject);
        postObject.update({
            "display": 'false'
        });
        console.log(postObject);


        let commentsOnPost = firebase.database().ref("posts/" + slicePostKey + "/comments/");
        commentsOnPost.on("value", (snapshot) => {
            this.setState({ postData: snapshot.val() });
        });
        console.log(commentsOnPost);

        var user = firebase.auth().currentUser;
        var profileRef = firebase.database().ref('profile/' + user.uid);
        this.state.profile.credit = this.state.profile.credit + parseInt(this.state.price);
        profileRef.update(this.state.profile);
    }

    render() {
        let urlPostKey = this.props.match.params.postKey;
        let slicePostKey = urlPostKey.slice(1);
        let commentRef = firebase.database().ref("posts/" + slicePostKey + "/comments/");

        var questionUserId = this.state.postData.userId; // ID of the user who posted the question
        console.log("QUID " + questionUserId);
        var user = firebase.auth().currentUser;
        console.log(user);
        var uid = user.uid;
        console.log(uid);

        // let postObjectRef = this.props.match.params.postKey;
        // console.log("Post Object Ref " + postObjectRef);
        // console.log(postObjectRef);
        // let slicePostKey = postObjectRef.slice(1);
        // console.log("Slice Post Key " + slicePostKey);
        // console.log(slicePostKey);
        // let postObject = firebase.database().ref('posts/' + slicePostKey);
        // postObject.on("value", (snapshot) => {
        //     this.setState({ postData: snapshot.val().comments });
        //     console.log(snapshot.val().comments);
        // });

        // var myDiv = document.getElementById("myDiv");
        // var selectList = document.createElement("select");
        // selectList.id = "mySelect";

        // for (var key in postObject.comments) {
        //     var option = document.createElement("option");
        //     option.value = postObject.comments.val().comments.author.uid;
        //     option.text = postObject.comments.val().comments.author.name;
        //     selectList.appendChild(option);
        // }
        // myDiv.appendChild(selectList);


        return (
            <div id="requestCardBox" className="container">
                <div id="orgBox" className="col">

                    <div id="rowTitlePrice" className="row">
                        <div id="priceOffer" className="d-flex ml-auto">Bounty: {this.state.postData.price} Credits <img src="../Bug_Token.png" width="30px" height="30px" className="ml-1" /></div>
                    </div>

                    <div className="row">
                        <div id="userID" className="d-flex">User ID: {this.state.postData.name}</div>
                        <h4 id="descriptionTitle" className="d-flex">Title: {this.state.postData.title}</h4>
                    </div>

                    <div id="bodyOfRequest" className="row mb-3">

                        <div id="descriptionBox" className="d-flex">Description: <br /> {this.state.postData.description}</div>

                        <div id="layerOptions" className="d-flex ml-auto flex-column">

                            <a href={this.state.postData.githublink} target="blank"><button id="viewCode" className="btn btn-primary d-flex mb-4 w-75">Code</button></a>
                            {

                                (questionUserId !== uid) ?
                                    <button id="solveButton" className="btn btn-secondary d-flex w-75"
                                        disabled={questionUserId !== uid}>Close Problem</button> :
                                    <Link to={constants.routes.allpost}><button id="solveButton" className="btn btn-danger d-flex w-75"
                                        onClick={evt => this.hideQuestion(evt)} disabled={questionUserId !== uid}>Close Problem</button>

                                        <div className="form-group" id="dropdown">

                                        </div>
                                    </Link>
                            }
                        </div>
                    </div>

                    <div>
                        <h4 id="tagsId">TAGS</h4>
                    </div>

                    <div id="tagsArea" className="row mb-3">
                        <div id="tagsContainer" className="container">
                            <div id="rowOfTags" className="row justify-content-center">
                                {
                                    (this.state.postData) ?
                                        this.state.postData.tags.map(function (tag, index) {
                                            return (<div className="tag d-flex m-2" key={index}><Link to={"/searchAllTags/:" + tag}><button className="btn btn-success">{tag}</button></Link></div>)
                                        })
                                        :
                                        undefined
                                }
                            </div>
                        </div>
                    </div>

                    <hr />
                    <div className="container" id="messageArea">
                        <NewMessageInput messagesRef={commentRef} />
                        <br />
                        <MessageList messagesRef={commentRef} />
                        <div id="commentsArea" className="mb-3">
                            <div id="commentsContain" className="container">

                            </div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}