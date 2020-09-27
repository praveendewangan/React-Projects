import React, { Component } from 'react';
import classes from './App.css';
// import Person from '../components/Persons/Person/Person';
// import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit'

class App extends Component {
  
  constructor(props) {
    super(props);
    console.log("[ App.js ] constructor");
  }
  state = {
    persons : [
      {name:"Praveen"},
      {name:"Abhay"},
      {name:"Dorami"}
    ],
    userName : "Raj"
  }

  static getDerivedStateFromProps(props,state) {
    console.log("[ App.js ] getDerivedStateFromProps");
    console.log("state => ",state);
    console.log("props => ",props);
    return state;
  }

  // componentWillMount() {
  //   console.log("[ App.js ] componentWillMount");
  // }

  componentDidMount() {
    console.log("[ App.js ] componentDidMount");
  }
  shouldComponentUpdate(nextProps,nextState) {
    console.log("[ App.js ] shouldComponentUpdate");
    console.log("nextState => ",nextState);
    console.log("nextProps => ",nextProps);
    return true;
  }  
  componentDidUpdate(prevProps,prevState,snapshot){
    console.log("[ App.js ] componentDidUpdate");
    console.log("prevState => ",prevState);
    console.log("prevProps => ",prevProps);
    console.log("snapshot => ",snapshot);
  }

  switchNameHandler = (newName) => {
    console.log("event calling");
    this.setState({persons: [
        {id:"id1",name:newName},
        {id:"id2",name:"Abhay"},
        {id:"id3",name:"Dorami"}
      ],
      showPersons : false
    })
  }

  nameChangeHandler = (event,id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    })
    const person = Object.assign({},this.state.persons[personIndex]);
    person.name = event.target.value;
    const persons = [...this.state.persons];
    persons[personIndex] = person;
    this.setState( {persons: persons} )
  }

  userNameChangeHandler = (event) => {
    this.setState({userName:event.target.value})
  }
  
  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({showPersons:!doesShow});
  }
  deletePersonHandler = (personIndex) => {
    const persons = this.state.persons;
    persons.splice(personIndex,1);
    this.setState({persons:persons});
  }
  render(props) {
    console.log("[ App.js ] render");
    let persons = null;
    if(this.state.showPersons) {
      persons = 
        <Persons 
          persons={this.state.persons}
          clicked={this.deletePersonHandler}
          changed={this.nameChangeHandler}/>;
    }
    return (
        <div className={classes.App}>
          <Cockpit 
          showPersons={this.state.showPersons}
          persons={this.state.persons}
          clicked={this.togglePersonsHandler}
          title={this.props.appTitle}/>
          {persons}
      </div>
    );
  }
}

export default App;
