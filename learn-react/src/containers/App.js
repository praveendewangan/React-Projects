import React, { Component } from 'react';
import classes from './App.css';
// import Person from '../components/Persons/Person/Person';
// import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit'
import withClass from '../hoc/withClass';
import Aux from '../hoc/Auxilliary';
import AuthContext from '../context/auth-context';
class App extends Component {
  
  constructor(props) {
    super(props);
    console.log("[ App.js ] constructor");
  }
  state = {
    persons : [
      {name:"Praveen",id:"p1"},
      {name:"Abhay",id:"p2"},
      {name:"Dorami",id:"p3"}
    ],
    userName : "Raj",
    showCockpit: true,
    changedCounter : 0,
    authenticated : false
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
    this.setState((prevState,props) => {
      return {persons: persons,changedCounter :prevState.changedCounter + 1} 
    })
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

  loginHandler = () => {
    this.setState({authenticated:true});
  }
  render(props) {
    console.log("[ App.js ] render");
    let persons = null;
    if(this.state.showPersons) {
      persons = 
        <Persons 
          persons={this.state.persons}
          clicked={this.deletePersonHandler}
          changed={this.nameChangeHandler}
          isAuthenticated={this.state.authenticated}/>;
    }
    return (
        // <div className={classes.App}>
        // <WithClass classes={classes.App}>
        <Aux>
          <button onClick={()=>{this.setState({showCockpit:false})}}>Remove Cockpit</button>
          <AuthContext.Provider value={{authenticated : this.state.authenticated,login : this.loginHandler}}>
            { this.state.showCockpit ?
            (<Cockpit 
            showPersons={this.state.showPersons}
            personsLength={this.state.persons.length}
            clicked={this.togglePersonsHandler}
            title={this.props.appTitle}
            // login={this.loginHandler}
            />)
            : null}
            {persons}
          </AuthContext.Provider>
        </Aux>
        // </WithClass>
      // </div>
    );
  }
}

export default withClass(App,classes.App);
