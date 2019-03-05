import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import ReactDOM from 'react-dom';
import './Designer.css';
import HeadshotResult from './HeadshotResult';

class Designer extends Component {
    constructor(props){
        super(props)
        this.state = {
            preppedCode : "test",
            showCode: false
        }
    }
    //Should have item in props.

    handleExample = (event) => {
        event.preventDefault();
        let filterNamesAndValues = [];
        let contentToSearch = false;
        let newPreppedCode = "{";
        let example = {};
        for (var exampleFieldToRender of event.currentTarget) {
            if (exampleFieldToRender.type == "text") {
                if(exampleFieldToRender.value){
                    const preppedValue = exampleFieldToRender.name.toLowerCase();
                    example[preppedValue] = exampleFieldToRender.value;
                    newPreppedCode = newPreppedCode + `\"${preppedValue}\" : \"${exampleFieldToRender.value}\",\n`;
                } else{
                    const preppedValue = exampleFieldToRender.name.toLowerCase();
                    example[exampleFieldToRender.name.toLowerCase()] = 'N/A';            
                    newPreppedCode = newPreppedCode + `\"${preppedValue}\" : \"N\\A\",\n`;
                }
            }
        }
        newPreppedCode = newPreppedCode.substring(0, newPreppedCode.length - 2);
        newPreppedCode = newPreppedCode + `\n}`
        this.setState({preppedCode: newPreppedCode});

        ReactDOM.render(<HeadshotResult item={example} />, document.getElementById('example'))

        return false;
    }

    selectCode = () => {
        document.getElementById("code-area").focus();
        document.getElementById("code-area").select();
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
                    <button id="display-code" onClick={() => this.setState({showCode : true})} className="basic-button" style={{'display' : this.state.preppedCode ? 'flex' : 'none'}}>Generate Code</button>
                    <textarea readOnly id="code-area" style={{'display' : this.state.showCode ? 'flex' : 'none'}} className="prepped-code" value={this.state.preppedCode}></textarea>
                    <button id="select-text" style={{'display' : this.state.showCode ? 'flex' : 'none'}} className="basic-button" onClick={() => this.selectCode()}>Select Code</button>
                </span>
            </span>

            <div id="example">
            </div>
            </div>
        );
    }
}

export default Designer;