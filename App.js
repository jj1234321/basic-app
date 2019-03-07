import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';
import ResultsSection from './ResultsSection';
import HeadshotResult from './HeadshotResult';
import { spring, AnimatedRoute } from 'react-router-transition';
import Overview from './Overview';
import Designer from './Designer';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchedItemsList: []
    }
  }

  initialProps = this.props.itemList;
  searchCompleted = (searchResultItems) => {
    this.setState({ searchedItemsList: searchResultItems });
  }

  componentDidMount() {
  }

  searchFunctionAvailable = (searchFunc) => {
    this.searchFunctionByTrait = searchFunc;
  }

  searchFunctionByTrait;

  //Should have itemList in props. 
  render() {

    // we need to map the `scale` prop we define below
    // to the transform style property
    function mapStyles(styles) {
      return {
        opacity: styles.opacity,
        transform: `scale(${styles.scale})`,
      };
    }

    // wrap the `spring` helper to use a bouncy config
    function bounce(val) {
      return spring(val, {
        stiffness: 330,
        damping: 22,
      });
    }

    // child matches will...
    const bounceTransition = {
      // start in a transparent, upscaled state
      atEnter: {
        opacity: 0,
        scale: 1.2,
      },
      // leave in a transparent, downscaled state
      atLeave: {
        opacity: bounce(0),
        scale: bounce(0.8),
      },
      // and rest at an opaque, normally-scaled state
      atActive: {
        opacity: bounce(1),
        scale: bounce(1),
      },
    };

    const Overview2 = () => (
      <div>
        <Overview />
      </div>
    )

    const Designer2 = () => (
      <div>
        <Designer />
      </div>
    )

    const Roster = ({ match }) => (
      <div>
        <h2>Roster</h2>
        <ResultsSection key={"roster"} match={match} mainSection={true} makeSearchFunctionAvailable={(searchFunc) => this.searchFunctionAvailable(searchFunc)} searchCompletedFunc={(searchResultItems) => this.searchCompleted(searchResultItems)} haveSearched={this.state.searchedItemsList.length > 0 ? true : false} items={this.state.searchedItemsList.length > 0 ? this.state.searchedItemsList : this.props.itemList} />
      </div>
    )

    const Owners2 = ({ match }) => (
      <div>
        <h2>Owners</h2>
        <ResultsSection key={"owners"} match={match} makeSearchFunctionAvailable={(searchFunc) => this.searchFunctionAvailable(searchFunc)} searchCompletedFunc={(searchResultItems) => this.searchCompleted(searchResultItems)} haveSearched={this.state.searchedItemsList.length > 0 ? true : false} items={this.props.ownerList} />
      </div>
    )

    const Topic = ({ match }) => (
      <div>
        <h3>{match.params.topicId}</h3>
      </div>
    )

    //For the linking lists.
    let fetchCurrentObj = (itemName) => {
      for (let newItem of this.props.itemList) {
        if (newItem.name == itemName) {
          return newItem;
        }
      }
    }

    //For the linking lists.
    let fetchCurrentObjOwner = (itemName) => {
      for (let newItem of this.props.ownerList) {
        if (newItem.name == itemName) {
          return newItem;
        }
      }
    }

    let resultPages = []
    let x = 0;


    for (let item of this.props.ownerList) {
      x = x + 1;
      let currentLink = `/${item.name}`;

      let getLeftLink = (item) => {
        let leftLink = null;
        let correctObj = fetchCurrentObjOwner(item);
        let x = this.props.ownerList.lastIndexOf(correctObj);
        if (this.props.ownerList[x - 1]) {
          leftLink = `/${this.props.ownerList[x - 1].name}`;
        }
        return leftLink;
      }

      let getRightLink = (item) => {
        let rightLink = null;
        let correctObj = fetchCurrentObjOwner(item);
        let x = this.props.ownerList.lastIndexOf(correctObj);
        if (this.props.ownerList[x + 1]) {
          rightLink = `/${this.props.ownerList[x + 1].name}`;
        }
        return rightLink;
      }

      resultPages.push(<AnimatedRoute
        atEnter={bounceTransition.atEnter}
        atLeave={bounceTransition.atLeave}
        atActive={bounceTransition.atActive}
        mapStyles={mapStyles}
        className="route-wrapper" path={currentLink} component={() => <HeadshotResult item={item} searchBySingleTrait={(traitNameAndValue) => this.searchFunctionByTrait(traitNameAndValue)} leftLink={(item) => getLeftLink(item)} rightLink={(item) => getRightLink(item)} />} />);
    }

    for (let owner of this.props.ownerList) {
      let itemList = [];
      if (owner.items[0]) {
        if (owner.items[0].name) {
          for (let ownedItem of owner.items) {
            itemList.push(ownedItem);
          }
          owner.items = <ResultsSection makeSearchFunctionAvailable={(searchFunc) => this.searchFunctionAvailable(searchFunc)} searchCompletedFunc={(searchResultItems) => this.searchCompleted(searchResultItems)} haveSearched={this.state.searchedItemsList.length > 0 ? true : false} items={itemList} />
        }

      }
    }

    for (let item of this.props.itemList) {
      x = x + 1;
      let currentLink = `/${item.name}`;

      let getLeftLink = (item) => {
        let leftLink = null;
        let correctObj = fetchCurrentObj(item);
        let x = this.props.itemList.lastIndexOf(correctObj);
        if (this.state.searchedItemsList.length > 0) {
          x = this.state.searchedItemsList.lastIndexOf(correctObj);
          if (this.state.searchedItemsList[x - 1]) {
            leftLink = `/${this.state.searchedItemsList[x - 1].name}`;
          }
        } else {
          if (this.props.itemList[x - 1]) {
            leftLink = `/${this.props.itemList[x - 1].name}`;
          }
        }
        return leftLink;
      }

      let getRightLink = (item) => {
        let rightLink = null;
        let correctObj = fetchCurrentObj(item);
        let x = this.props.itemList.lastIndexOf(correctObj);
        if (this.state.searchedItemsList.length > 0) {
          x = this.state.searchedItemsList.lastIndexOf(correctObj);
          if (this.state.searchedItemsList[x + 1]) {
            rightLink = `/${this.state.searchedItemsList[x + 1].name}`;
          }
        } else {
          if (this.props.itemList[x + 1]) {
            rightLink = `/${this.props.itemList[x + 1].name}`;
          }
        }
        return rightLink;
      }

      resultPages.push(<AnimatedRoute
        atEnter={bounceTransition.atEnter}
        atLeave={bounceTransition.atLeave}
        atActive={bounceTransition.atActive}
        mapStyles={mapStyles}
        className="route-wrapper" path={currentLink} component={() => <HeadshotResult item={item} searchBySingleTrait={(traitNameAndValue) => this.searchFunctionByTrait(traitNameAndValue)} leftLink={(item) => getLeftLink(item)} rightLink={(item) => getRightLink(item)} />} />);
    }

    return (

      <div className="App">
        <Router>
          <div className="App">
            <header className="App-header">
              <button className="basic-button"><Link to="/" style={{ textDecoration: 'none' }}>Overview</Link></button>
              <button className="basic-button"><Link to="/roster" id="roster-link" style={{ textDecoration: 'none' }}>Roster</Link></button>
              <button className="basic-button"><Link to="/designer" style={{ textDecoration: 'none' }}>Designer</Link></button>
              <button className="basic-button"><Link to="/owners" style={{ textDecoration: 'none' }}>Owners</Link></button>

            </header>
            <div id="main" className="App-body">
              <div id="route-list">
                <AnimatedRoute
                  atEnter={bounceTransition.atEnter}
                  atLeave={bounceTransition.atLeave}
                  atActive={bounceTransition.atActive}
                  mapStyles={mapStyles}
                  className="route-wrapper" exact path="/" component={Overview2} />
                <AnimatedRoute
                  atEnter={bounceTransition.atEnter}
                  atLeave={bounceTransition.atLeave}
                  atActive={bounceTransition.atActive}
                  mapStyles={mapStyles}
                  className="route-wrapper" path="/roster" component={Roster} />
                <AnimatedRoute
                  atEnter={bounceTransition.atEnter}
                  atLeave={bounceTransition.atLeave}
                  atActive={bounceTransition.atActive}
                  mapStyles={mapStyles}
                  className="route-wrapper" path="/designer" component={Designer2} />
                <AnimatedRoute
                  atEnter={bounceTransition.atEnter}
                  atLeave={bounceTransition.atLeave}
                  atActive={bounceTransition.atActive}
                  mapStyles={mapStyles}
                  className="route-wrapper" path="/owners" component={Owners2} />

                {resultPages}
              </div>
            </div>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
