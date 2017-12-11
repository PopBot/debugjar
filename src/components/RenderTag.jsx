import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebase from 'firebase/app';
import RenderPosts from "./RenderPosts"
import CreateNewPost from "./CreateNewPost"
import NumCreditsRemaining from "./CreditsRemaining";
import constants from "./constants"
import Generate from "./Generate"


export default class RenderTag extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tagData: [],
            postList: []
        }
    }

    componentDidMount() {
        let urlTagName = this.props.match.params.tagName;
        let sliceTagName = urlTagName.slice(1);
        let data = firebase.database().ref('tags/' + sliceTagName);
        var self = this;
        data.on("value", (snapshot) => {
            var tagArray = [];
            snapshot.forEach(function (child) {
                var questionsWithTag = child.key;
                tagArray.push(questionsWithTag);
            })
            this.setState({ tagData: tagArray })
        });

        var postsRef = firebase.database().ref('posts')
        postsRef.on('value', (snapshot) => {
            var postArray = [];
            snapshot.forEach(function (child) {
                if (self.state.tagData.includes(child.key)) {
                    var questionPosted = child.val();
                    questionPosted.key = child.key;
                    postArray.push(questionPosted);
                }
            });
            this.setState({ postList: postArray })
        })

    }


    componentWillUnmount() {
        firebase.database().ref('posts').off();
        firebase.database().ref('tags').off();
        firebase.database().ref('profile').off();
    }

    render() {
        let urlTagName = this.props.match.params.tagName;
        let sliceTagName = urlTagName.slice(1);
        var listOfAllPosts = this.state.postList.map((post) => {
            console.log("hello")
            return <Generate post={post}
                postKey={post.key} />
        });
        // return (<div key = "listOfTags">{listOfAllPosts}</div>);
        return (
            <div className="container col-8">
                <h3>Showing posts for <strong>{sliceTagName}</strong></h3>
                {listOfAllPosts}
            </div>
        );
    }
}