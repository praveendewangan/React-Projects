import React, { Component } from 'react';
import Person from './Person/Person'

class Persons extends Component {
    // static getDerivedStateFromProps(props,state) {
    //     console.log("[ Persons.js ] getDerivedStateFromProps");
    //     console.log("state => ",state);
    //     console.log("props => ",props);
    //     return state;
    // }
    // componentWillReceiveProps(props){
    //     console.log("[ Persons.js ] componentWillReceiveProps");
    //     console.log("props => ",props);
    // }
    shouldComponentUpdate(nextProps,nextState) {
        console.log("[ Persons.js ] shouldComponentUpdate");
        console.log("nextState => ",nextState);
        console.log("nextProps => ",nextProps);
        return true;
    }
    getSnapshotBeforeUpdate(prevProps,prevState) {
        console.log("[ Persons.js ] getSnapshotBeforeUpdate");
        console.log("prevState => ",prevState);
        console.log("prevProps => ",prevProps);
        return {message:'snapshot!'};
    }
    componentDidUpdate(prevProps,prevState,snapshot){
        console.log("[ Persons.js ] componentDidUpdate");
        console.log("prevState => ",prevState);
        console.log("prevProps => ",prevProps);
        console.log("snapshot => ",snapshot);
    }
    render (){
        console.log("[ Persons.js ] rendering...");
        return this.props.persons.map((persons,index) => {
            return <Person 
                    name={persons.name} 
                    click={() => this.props.clicked(index)} 
                    key={persons.id}
                    changed={(event) => this.props.changed(event,persons.id)}/>
              
        });
    }
}

export default Persons;
