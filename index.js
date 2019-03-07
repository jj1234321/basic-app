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
    organization: 'Dairy',
    picture : Cheesy2,
    headshot : Cheesy2,
    owner : 'James'
}

let mockData2 = {
    name : 'Iron',
    traits : 'none',
    organization: "Metal",
    picture : Iron,
    headshot : Iron,
    owner : 'none'
}

let mockData3 = {
    name : 'Iron2',
    traits : 'none',
    organization: "Metal",
    picture : Iron,
    headshot : Iron,
    owner : 'James'
}

let mockData4= {
    name : 'Iron3',
    traits : 'none',
    organization: "Metal",
    picture : Iron,
    headshot : Iron,
    owner : 'none'
}

let mockData5 = {
    name : 'Cheese2',
    traits : 'none',
    organization: 'Dairy',
    picture : Cheesy2,
    headshot : Cheesy2,
    owner : 'James'
}

let mockData6 = {
    name : 'Iron5',
    traits : 'none',
    organization: "Metal",
    picture : Iron,
    headshot : Iron,
    owner : 'none'
}

let mockData7 = {
    name : 'Iron6',
    traits : 'none',
    organization: "Metal",
    picture : Iron,
    headshot : Iron,
    owner : 'James'
}

let mockData8= {
    name : 'Iron7',
    traits : 'none',
    organization: "Metal",
    picture : Iron,
    headshot : Iron,
    owner : 'Zero'
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

let getOwnerInArray = (owners, item) => {
    return owners.map(function(owner){
    if(owner.name == item.owner){
        return owner;
    }
})

}

let mockOwnerData1 = {
    name : 'James',
    items: []
}

let ownerArray = [];
mockArray.forEach(function(item) {
    let currentPresence = getOwnerInArray(ownerArray, item);
    let dataToAddTo;
    //Fetch the owner from the map results.
    for(let ownerInArray of currentPresence){
        if(ownerInArray){
            dataToAddTo = ownerInArray;
            break;
        }
    }
    //If owner not in map results, add owner. 
    if(!dataToAddTo) {
        dataToAddTo = {
            name: item.owner,
            items: []
        }
        ownerArray.push(dataToAddTo);
    }
    //Put link inside of owner. 
    dataToAddTo.items.push(item);
    if(!dataToAddTo.picture){
        dataToAddTo.picture = item.picture;
        dataToAddTo.headshot = item.headshot;
    }
})

for (var item of mockArray) {
    mockArray2.push(item);
}
ReactDOM.render(<App itemList={mockArray} ownerList={ownerArray}/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
