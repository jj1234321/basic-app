import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import ReactDOM from 'react-dom';
import HeadshotListMember from "./HeadshotListMember";
import './ResultsSection.css';

class ResultsSection extends Component {
    //Should have items in props.
    constructor(props) {
        //Passed cameraAccess variable into props.
        //Should have switchPageFunc in props to pass on.
        super(props)
        this.state = {
            itemsToDisplay: [],
            haveSearched: false
        }
    }

    componentDidMount() {
        this.checkFiltered(this.props.items)
    }
    inWords(num) {
        let a = ['', 'one ', 'two ', 'three ', 'four ', 'five ', 'six ', 'seven ', 'eight ', 'nine ', 'ten ', 'eleven ', 'twelve ', 'thirteen ', 'fourteen ', 'fifteen ', 'sixteen ', 'seventeen ', 'eighteen ', 'nineteen '];
        let b = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

        if ((num = num.toString()).length > 9) return 'overflow';
        let n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
        if (!n) return; var str = '';
        str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'crore ' : '';
        str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'lakh ' : '';
        str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'thousand ' : '';
        str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'hundred ' : '';
        str += (n[5] != 0) ? ((str != '') ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) + 'only ' : '';
        return str;
    }
    openNav() {
        if (document.getElementById("mySidenav").style.width == "0px" || !document.getElementById("mySidenav").style.width) {
            document.getElementById("mySidenav").style.width = "50vw";
        } else {
            document.getElementById("mySidenav").style.width = "0px";
        }
    }

    checkFiltered = (itemsToFilterThrough, filterNamesAndValues, contentToSearch) => {
        let filterResults = [];
        if(contentToSearch){
            for (var filter of filterNamesAndValues){
                for(var item of itemsToFilterThrough){
                    for(var trait in item){
                        if(trait == filter[0]){
                            if(item[trait]== filter[1]){
                                filterResults.push(item);
                                if(!this.state.haveSearched){
                                    this.setState({haveSearched : true});
                                }
                            }
                        }
                    }
                }
            }
        } else{
            for (var item of itemsToFilterThrough) {
                filterResults.push(item);
                this.setState({haveSearched : false});
            }

        }
        this.setState({itemsToDisplay: filterResults});
    }

    performFilter = (e) => {
        //e.preventDefault();
    }

    handleFilter = (event) => {
        event.preventDefault();
        let filterNamesAndValues = [];
        let contentToSearch = false;
        for (var fieldToSearch of event.currentTarget) {
            if (fieldToSearch.type == "text") {
                filterNamesAndValues.push([fieldToSearch.name, fieldToSearch.value]);
                if(fieldToSearch.value){
                    contentToSearch = true;
                }
            }
        }
        this.checkFiltered(this.props.items, filterNamesAndValues, contentToSearch)
        return false;
    }

    clearSearch = (event) => {
        for(var fieldToClear of document.getElementsByClassName("filter-input")){
            fieldToClear.value = "";
        }
    }

    closeNav() {
        document.getElementById("mySidenav").style.width = "0px";
    }
    render() {
        let x = 0;
        let listPreppedForRender = [];

        listPreppedForRender.push(
            <div id="mobile-menu" className="mobile-menu">
                <div id="mySidenav" class="sidenav">
                    <a href="javascript:void(0)" class="closebtn" onClick={() => this.closeNav()}>&times;</a>
                    <span class="filter-header" id="search">Filter</span>
                    <form onSubmit={(event) => this.handleFilter(event)} autoComplete="off" id="filter-form">
                        <span class="filter-text">Name</span><br />
                        <input class="filter-input" type="text" name="name" /><br />
                        <span class="filter-text" >Role</span><br />
                        <input class="filter-input" type="text" name="role" />
                        <span class="filter-text" >Owner</span><br />
                        <input class="filter-input" type="text" name="owner" /><br />
                        <br />
                        <input className="filter-button" type="submit" value="Submit" />
                        {this.state.haveSearched ? <input className="filter-button" type="submit" value="Cancel Search" onClick={(event) => this.clearSearch(event)}/> : ''}
                    </form>
                </div>
                <span style={{ fontSize: '30px', cursor: 'pointer' }} onClick={() => this.openNav()}>&#9776;</span>
            </div>
        )

        if (this.state.itemsToDisplay.length > 0) {
            for (var item of this.state.itemsToDisplay) {
                x = x + 1;
                listPreppedForRender.push(<span className="headshot-box"><HeadshotListMember match={this.props.match} item={item} key={this.inWords(x)} /></span>);
            }
        }

        return listPreppedForRender;
    }
}

export default ResultsSection; 