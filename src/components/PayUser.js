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

export default class PayForSolving extends React.Component {
    constructor(props) {
        supr(props);
        this.state = {

        }
    }

    
}