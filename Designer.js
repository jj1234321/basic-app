import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import ReactDOM from 'react-dom';
import './Designer.css';
import HeadshotResult from './HeadshotResult';

class Designer extends Component {
    //Should have item in props.

    handleExample = (event) => {
        event.preventDefault();
        let filterNamesAndValues = [];
        let contentToSearch = false;
        let example = {};
        for (var exampleFieldToRender of event.currentTarget) {
            if (exampleFieldToRender.type == "text") {
                if(exampleFieldToRender.value){
                    example[exampleFieldToRender.name.toLowerCase()] = exampleFieldToRender.value;            
                } else{
                    example[exampleFieldToRender.name.toLowerCase()] = 'N/A';            
                
                }
            }
        }

        ReactDOM.render(<HeadshotResult item={example} />, document.getElementById('example'))

        return false;
    }

    render() {
        let propertiesToExemplify = ["Name", "Role", "Owner"];
        let objectsForInformation = [];
        for (var property of propertiesToExemplify) {
            objectsForInformation.push(<div className="example-section"><span className="example-header">{property}: </span><input type="text" className="example-input" name={property} /></div>)
        }

        return (
            <div>
            <span className="designer-page-outer">
                <span className="designer-page-inner">
                    <form onSubmit={(event) => this.handleExample(event)}>
                        {objectsForInformation}
                        <input className="example-button" type="submit" value="Submit" />
                    </form>
                </span>
            </span>

            <div id="example">
            </div>
            </div>
        );
    }
}

export default Designer;