import React, { Component } from 'react';
import { HashRouter as Router, Redirect, Switch, Route, Link } from 'react-router-dom';
import '../App.css';
import firebase from 'firebase/app';
import RenderPosts from "./RenderPosts";
import CreateNewPost from "./CreateNewPost"
import NumCreditsRemaining from "./CreditsRemaining";
import constants from "./constants"


export default class TheJar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            newPostFlag: false,
            searchTagsFlag: false,
            tags: [],
        }
        this.handleCreate = this.handleCreate.bind(this);
        this.handleSearchTags = this.handleSearchTags.bind(this)

    }

    componentDidMount() {
        var tagArray = [];
        var tagRef = firebase.database().ref("tags/");
        tagRef.on('value', (snapshot) => {
            snapshot.forEach(function (tag) {
                var tagName = tag.key;
                tagArray.push(tagName);
            });
        })
        this.setState({ tags: tagArray });
    }

    handleCreate() {
        this.setState({ newPostFlag: !this.state.newPostFlag });
    }

    handleSearchTags() {
        this.setState({ searchTagsFlag: !this.state.searchTagsFlag });
    }

    render() {
        return (
            <div className="container">
                <br />
                <div className="row">
                    <div className="container">
                        <NumCreditsRemaining />

                        {
                            (this.state.newPostFlag) ?
                                <button className="btn btn-danger d-flex ml-auto mr-auto mt-4" onClick={this.handleCreate}>Cancel</button> :
                                <button className="btn btn-success d-flex ml-auto mr-auto mt-4" onClick={this.handleCreate}>Create New Post</button>
                        }
                    </div>
                </div>
                {
                    this.state.newPostFlag &&
                    <CreateNewPost />   //trying to change the state of newPostFlag in this object through the props I am sending into the create new post object. the upload button on that page should change newPostFlag to false on this object??
                }

                <hr />

                <div className="container">
                    {
                        (this.state.searchTagsFlag) ?
                            <button className="btn btn-danger" onClick={this.handleSearchTags}>Close</button> :
                            <button className="btn btn-success" onClick={this.handleSearchTags}>Search Tags</button>
                    }
                    {
                        this.state.searchTagsFlag &&
                        <RenderTagButtons tags={this.state.tags} />

                    }
                    <RenderPosts />
                </div>


                {/* {
                    (this.state.tags) ?
                        this.state.postData.tags.map(function (tag, index) {
                            return (<button className="btn btn-secondary d-flex m-2" key={index}>{tag}</button>)
                        })
                        :
                        undefined
                } */}

            </div>
        );
    }
}

export class RenderTagButtons extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            tagArray: this.props.tags
        }
    }
    render() {
        console.log("reached render buttons")
        var listOfAllTags = this.props.tags.map((tag) => <Link to={"/searchAllTags/:" + tag}><button className="btn btn-success">{tag}</button></Link>);
        return listOfAllTags;
    }

}

