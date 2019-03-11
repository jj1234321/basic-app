import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import ReactDOM from 'react-dom';
import './Headshot.css';

class Headshot extends Component {
    //Should have item in props.
    render() {

        let name = this.props.item.name
        window.setTimeout(function () {
            let nameBox = document.getElementById("name-box-" + name);
            let nameElement = document.getElementById("name-" + name);
            if (nameBox && nameElement) {
                nameElement.classList.remove('invisible');
                nameBox.classList.remove('invisible');

            }
        }, 500);
        var inactive = '';
        if(this.props.item.inactive){
            inactive = "-inactive";
        }

        return (
            <span className={"headshot"+inactive}>
                <span id={"name-box-" + this.props.item.name} className="name-box invisible">
                    <span id={"name-" + this.props.item.name} className="name-focus invisible">
                        {this.props.item.name}
                    </span>
                </span>
                <img className={"image-box"+inactive} id="imgFull" src={this.props.item.headshot} />

            </span>

        );
    }
}

export default Headshot; 