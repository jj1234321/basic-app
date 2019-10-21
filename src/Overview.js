import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import ReactDOM from 'react-dom';
import './Overview.css';
import { aboutme } from './aboutme.json';
import { experiences } from './experiences.json';
import { resume } from './resume.json';
import { projects } from './projects.json';
import headshot from './headshotimage.jpg';

class Overview extends Component {
    constructor(props) {
        super(props)
    }
    //Should have item in props.
    render() {
    
        let textToDisplay = null;
        if(this.props.coreText == "aboutme"){
            textToDisplay = aboutme;
        }
        if(this.props.coreText == "experiences"){
            textToDisplay = experiences;
        }
        if(this.props.coreText == "resume"){
            textToDisplay = resume;
        }
        if(this.props.coreText == "projects"){
            textToDisplay = projects;
        }
        if(!textToDisplay){
            textToDisplay = "Failed to load"
            console.log(this.props.coreText)
        }
        return (
            <span className="overview-page-outer">
            <span className="overview-page-inner">
            {this.props.coreText == "aboutme" ? <div className="headshot-image"><img src={headshot} width="50%"/></div> : null}
            <br />
            <div className="message-content" >
            {textToDisplay}
            </div>
            </span>
            </span>
        );
    }
}

export default Overview;