import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import ReactDOM from 'react-dom';
import './Overview.css';

class Overview extends Component {
    //Should have item in props.
    render() {
        return (
            <span className="overview-page-outer">
            <span className="overview-page-inner">
            </span>
            </span>
        );
    }
}

export default Overview;