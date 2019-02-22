import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Cheesy2 from './Cheesey2.webp';
import Iron from './iron.jpg';

let mockData1 = {
    name : 'Cheese',
    traits : 'none',
    picture : Cheesy2,
    headshot : Cheesy2,
    owner : 'none'
}

let mockData2 = {
    name : 'Iron',
    traits : 'none',
    picture : Iron,
    headshot : Iron,
    owner : 'none'
}

let mockData3 = {
    name : 'Iron2',
    traits : 'none',
    picture : Iron,
    headshot : Iron,
    owner : 'none'
}

let mockData4= {
    name : 'Iron3',
    traits : 'none',
    picture : Iron,
    headshot : Iron,
    owner : 'none'
}

let mockData5 = {
    name : 'Cheese',
    traits : 'none',
    picture : Cheesy2,
    headshot : Cheesy2,
    owner : 'none'
}

let mockData6 = {
    name : 'Iron',
    traits : 'none',
    picture : Iron,
    headshot : Iron,
    owner : 'none'
}

let mockData7 = {
    name : 'Iron2',
    traits : 'none',
    picture : Iron,
    headshot : Iron,
    owner : 'none'
}

let mockData8= {
    name : 'Iron3',
    traits : 'none',
    picture : Iron,
    headshot : Iron,
    owner : 'none'
}

let mockArray = [];
let mockArray2 = []
mockArray.push(mockData1);
mockArray.push(mockData2);
mockArray.push(mockData3);
mockArray.push(mockData4);
mockArray.push(mockData5);
mockArray.push(mockData6);
mockArray.push(mockData7);
mockArray.push(mockData8);


for (var item of mockArray) {
    mockArray2.push(item);
}
ReactDOM.render(<App itemList={mockArray}/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
