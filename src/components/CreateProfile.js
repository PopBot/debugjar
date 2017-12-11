import React from "react";
import firebase from "firebase/app";
import constants from "./constants";

export default class CreateProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name:"",
            bio:"",
            uid: "",
            personalwebsite: "",
            linkedin: "",
            email:"",
            credit: 0
        };
    }

    uploadProfile(evt){
        evt.preventDefault();
        if(this.state.bio === ''){
            this.setState({errorMessage: "Bio field cannot be empty"});            
        }
        if(this.state.personalwebsite === ''){
            this.setState({errorMessage: "Please enter the URL of your website"});            
        }
        if(this.state.linkedin === ''){
            this.setState({errorMessage: "Please enter the URL of your Linkedin"});            
        }
        else{
            var user = firebase.auth().currentUser;            
            var profileRef = firebase.database().ref('profile/' + user.uid);
            var newProfile = {
                name : user.displayName,
                bio : this.state.bio,
                uid : user.uid,
                personalwebsite : this.state.personalwebsite,
                linkedin : this.state.linkedin,
                email: user.email,
                credit: 10,
                photoURL: user.photoURL
            };
            // var userPromise = profileRef.set(newProfile);
            // return Promise(userPromise);
            profileRef.set(newProfile).then(response => this.props.history.push(constants.routes.allpost))
            .catch(e => this.setState({errorMessage: e.message}));
        }

    }

    render(){
        return(
            <div className="container">
                <form onSubmit={evt => this.uploadProfile(evt)}>
                    <div className="form-group">
                        <input id="Bio" type="text" className="form-control" placeholder="Enter your bio"
                            value={this.state.title}
                            onInput={evt => this.setState({ bio: evt.target.value })} />
                    </div>
                    <div className="form-group">
                        <input id="Website" type="text" className="form-control" placeholder="Enter URL for your personal website"
                            value={this.state.description}
                            onInput={evt => this.setState({ personalwebsite: evt.target.value })} />
                    </div>
                    <div className="form-group">
                        <input id="Linkedin" type="text" className="form-control" placeholder="Enter URL for Linkedin profile"
                            value={this.state.price}
                            onInput={evt => this.setState({ linkedin: evt.target.value })} />
                    </div>

                    <div className="form-group">
                        <button type="submit" className="btn btn-success" onClick={evt => this.uploadProfile(evt)}>
                            Create Profile!
                        </button>
                    </div>
                </form>
            </div>
        )
    }
    
}
    