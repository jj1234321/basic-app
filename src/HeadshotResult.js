import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import ReactDOM from 'react-dom';
import './HeadshotResult.css';

class HeadshotResult extends Component {

    componentDidMount() {
        let newImg = document.createElement('img');
        newImg.src = this.props.item.picture;
        console.log(newImg.height);
        console.log(newImg.width);
        console.log(newImg);
        if (newImg.width > newImg.height) {
            let currentImage = document.getElementById('img-' + this.props.item.name);
            currentImage.classList.replace('relevant-image-vertical', 'relevant-image-horizontal');

        }
    }
    //Should have item in props.
    render() {

        return (
            <div className="result-page" id={this.props.item.name}>
                <div className="inner-information">
                    <img src={this.props.item.picture} id={"img-" + this.props.item.name} className="relevant-image-vertical">
                    </img>
                    <br />
                    <div className="text-field">
                        <div className="info-field">
                            <br />
                            Name: {this.props.item.name}
                        </div>
                        <div className="info-field">
                            Role: {this.props.item.name}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default HeadshotResult; 