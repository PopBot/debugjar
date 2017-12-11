import React from "react";
import firebase from "firebase/";
import { Link } from "react-router-dom";
import constants from "./constants";
import "./Generate.css";


export default class Generate extends React.Component {
    constructor(props) {
        super(props);
    }
    likePost() {
        /* Access the chirp in the firebase and add this user's name */
        var postLikeRef = firebase.database().ref('posts/' + this.props.postKey + '/likes');

        //toggle logic
        var userId = firebase.auth().currentUser.uid
        var likeList = this.props.post.likes || {};
        if (likeList && likeList[userId]) { //in likes list already
            likeList[userId] = null; //remove
        }
        else { //add my like
            likeList[userId] = true; //just make it true so we have a key
        }

        postLikeRef.set(likeList) //update the likes!
    }


    render() {

        var likeFlag = false;
        var likeCount = 0; //count likes
        if (this.props.post.likes) {
            likeCount = Object.keys(this.props.post.likes).length;
            if (this.props.post.likes[firebase.auth().currentUser.uid])
                likeFlag = true;
        }

        function timeConverter(UNIX_timestamp) {
            var a = new Date(UNIX_timestamp);
            var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            var year = a.getFullYear();
            var month = months[a.getMonth()];
            var date = a.getDate();
            var hour = a.getHours();
            if (hour === 0) {
                hour = 12;
                var ampm = 'am';
            } else if (hour > 12) {
                hour = hour - 12;
                var ampm = 'pm';
            } else {
                var ampm = 'am';
            }
            var min = a.getMinutes();
            if (min < 10) {
                min = '0' + min;
            }
            var sec = a.getSeconds();
            var time = hour + ':' + min + ' ' + ampm + ' ' + month + ' ' + date + ', ' + year;
            return time;
        }


        // return (

        //     <div className="container text-left" id="postDetails">
        //         <div className="row">
        //             <div className="col-9 title">
        //                 <h4>{this.props.post.title}</h4>
        //                 <p><strong>User:</strong> <Link to={"/viewprofile/:" + this.props.post.userId}>{this.props.post.name}</Link></p>
        //             </div>
        //             <div className="col-3 text-right">
        //                 <h4><span className="price">{this.props.post.price}</span> Credits</h4><img src="/Bug_Token.png" width="30px" height="30px" />
        //             </div>
        //         </div>
        //         <div>
        //             <p><strong>Info:</strong> {this.props.post.description}</p>
        //         </div>
        //         <div className="row">
        //             <div className="col-9">
        //                 <p><strong>Tags: </strong>
        //                     {
        //                         (this.props.post.tags) ?
        //                             this.props.post.tags.map(function (tag, index) {
        //                                 return (<span key={index}><Link to={"/searchAllTags/:"+tag}><button className="btn btn-success">{tag} </button></Link></span>)
        //                             })
        //                             :
        //                             undefined
        //                     }</p>
        //             </div>
        //             <div className="col-3 text-right">
        //                 <Link to={"/viewpost/:" + this.props.postKey}><button className="btn btn-success">Learn More</button></Link>
        //             </div>
        //         </div>
        //         <div className="likes">
        //             {/* className={'fa fa-thumbs-o-up ' + (likeFlag ? 'user-liked' : '') */}
        //             <i className={'fa fa-thumbs-o-up ' + (likeFlag ? 'user-liked' : '')} aria-label="like" onClick={() => this.likePost()} ></i>
        //             <span>{/*space*/} {likeCount} People are working on this</span>

        //         </div><br />
        //         <div className="timestamp">
        //             <p><strong>Posted:</strong> {timeConverter(this.props.post.createdAt)}</p>
        //         </div>

        //     </div>
        // )
        return (
            <div>
                <div className="container" id="_postArea">
                    <div className="col">

                        <div className="row justify-content-between">
                            <div className="d-flex" id="_title">
                                <h3>{this.props.post.title}</h3>
                            </div>
                            <div className="d-flex" id="_price">
                                <h3><span className="mr-1 text-danger">{this.props.post.price}</span> Credits</h3><img src="../Bug_Token.png" width="30px" height="30px" className="ml-1" />
                            </div>
                        </div>

                        <div className="row">
                            <div className="d-flex" id="_userID">
                                <p><strong>User: </strong><Link to={"/viewprofile/:" + this.props.post.userId}>{this.props.post.name}</Link></p>
                            </div>
                        </div>

                        <div className="row">
                            <div className="d-flex" id="_description">
                                <p><strong>Info: </strong>{this.props.post.description}</p>
                            </div>
                        </div>

                        <div className="row justify-content-between">
                            <div className="d-flex" id="_tags">
                                <p><strong>Tags: </strong>
                                    {
                                        (this.props.post.tags) ?
                                            this.props.post.tags.map(function (tag, index) {
                                                return (<span key={index}><Link to={"/searchAllTags/:" + tag}><button className="btn btn-success">{tag} </button></Link></span>)
                                            })
                                            :
                                            undefined
                                    }</p>
                            </div>
                            <div className="d-flex" id="_learnMoreBut">
                                <Link to={"/viewpost/:" + this.props.postKey}><button className="btn btn-success">Learn More</button></Link>
                            </div>
                        </div>

                        <div className="row">
                            <div className="d-flex" id="_peopleWorking">
                                <i className={'fa fa-user-circle ' + (likeFlag ? 'user-liked' : '')} aria-label="like" onClick={() => this.likePost()} ></i>
                                <span className="ml-1">{/*space*/} {likeCount} People are working on this</span>
                            </div>
                        </div>

                        <div className="row">
                            <div className="d-flex" id="_timestamp">
                                <p><strong>Posted: </strong> {timeConverter(this.props.post.createdAt)}</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}