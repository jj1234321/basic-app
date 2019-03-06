import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import ReactDOM from 'react-dom';
import './HeadshotResult.css';

class HeadshotResult extends Component {

    leftLinkButton;
    rightLinkButton;
    x0 = null;
    unify = (e) => { return e.changedTouches ? e.changedTouches[0] : e};
    lock = (e) => {
        this.x0 = this.unify(e).clientX;
    }
    move = (e) => {
        if(this.x0 || this.x0 === 0){
            let dx = this.unify(e).clientX - this.x0, s = Math.sign(dx);
                //Significant move?
                if(Math.abs(dx) > 50){
                    //Leftmove
                    if(dx > 0){
                        if(this.leftLinkButton){
                            this.leftLinkButton.click();
                        }
                    }
                    //Rightmove
                    if(dx < 0){
                        if(this.rightLinkButton){
                            this.rightLinkButton.click();
                        }

                    }

                }
        }
    }
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
            let container = document.getElementById(this.props.item.name);
            this.leftLinkButton = document.getElementById('leftLink-' + this.props.item.name);
            this.rightLinkButton = document.getElementById('rightLink-' + this.props.item.name);
            
            container.addEventListener('touchstart', this.lock, false);
            container.addEventListener('touchend', this.move, false);
            
            container.addEventListener('mousedown', this.lock, false);
            container.addEventListener('mouseup', this.move, false);
        
    }

    funcForTraitSearch = (filter, value) =>{
        //Mount roster.
        let docLink = document.getElementById("roster-link");
        docLink.click()
        
        setTimeout(() => {
        this.props.searchBySingleTrait([[filter, value]]);
        }, 100);
    }

    componentWillUnmount(){
        let container = document.getElementById(this.props.item.name);
        container.removeEventListener('touchstart', this.lock);
        container.removeEventListener('touchend', this.move);
        container.removeEventListener('mousedown', this.lock);
        container.removeEventListener('mouseup', this.move);
    }
    //Should have item in props.
    render() {
        let leftLinkButton = null;
        let rightLinkButton = null;
        if(this.props.leftLink(this.props.item.name)){
            leftLinkButton = <Link id={"leftLink-"+this.props.item.name} to={this.props.leftLink(this.props.item.name)} style={{ textDecoration: 'none' }}><div className="link-container left-link"></div><div className="left-link side-link"></div></Link>;
            }
        if(this.props.rightLink(this.props.item.name)){
            rightLinkButton = <Link id={"rightLink-"+this.props.item.name} to={this.props.rightLink(this.props.item.name)} style={{ textDecoration: 'none' }}><div className="link-container right-link"></div><div className="right-link side-link"></div></Link>
        }
        return (
            <div className="result-page" id={this.props.item.name}>
                <div className="inner-information">
                    <img src={this.props.item.picture} id={"img-" + this.props.item.name} className="relevant-image-vertical">
                    </img>
                    <br />
                    <div className="text-field">
                        <div className="info-field">
                            <br />
                            <span style={{'display': 'inherit'}}>Name: </span> <span style={{'display': 'inherit', 'cursor': 'pointer'}} onClick={(filter, name) => this.funcForTraitSearch("name", this.props.item.name)} >{this.props.item.name}</span>
                        </div>
                        <div className="info-field">
                            Role: {this.props.item.name}
                        </div>
                    </div>
                </div>
                    {leftLinkButton ? leftLinkButton : null}
                    {rightLinkButton ? rightLinkButton : null}
</div>
        );
    }
}

export default HeadshotResult; 