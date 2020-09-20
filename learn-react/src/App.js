import React, { Component } from 'react';
import classes from './App.css';
// import Radium,{ StyleRoot } from 'radium';
// import styled from "styled-components";
import Person from './Person/Person';
// import './Person/Person.css';
// import UserInput from './UserInput/UserInput';
// import UserOutut from './UserOutput/UserOutput';

// const StyledButton = styled.button`  
//   background-color : ${props => props.alt ? '#2d292b' : '#0c76e4'};
//   font : inherit;
//   color : #b6cee6;
//   border : 0px solid blue;
//   box-shadow : 0px 0px 3px 1px #bbafaf;
//   outline : none;
//   padding: 8px;
//   cursor: pointer;

//   &:hover {
//     background-color : #E91E63;
//   }
// `;

class App extends Component {
  
  state = {
    persons : [
      {name:"Praveen"},
      {name:"Abhay"},
      {name:"Dorami"}
    ],
    userName : "Raj"
  }

  switchNameHandler = (newName) => {
    console.log("event calling");
    // DON'T USE THIS : this.state.persons[0].name = "Nilam";
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
    // const person = {
    //   ...this.state.persons[personIndex]
    // };
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
    // const style = {
    //   backgroundColor : "#0c76e4",
    //   font : "inherit",
    //   color : "#b6cee6",
    //   border : "0px solid blue",
    //   boxShadow : "0px 0px 3px 1px #bbafaf",
    //   outline : "none",
    //   padding: "8px",
    //   cursor: "pointer",
    //   ":hover" : {
    //     backgroundColor : "#E91E63"
    //   }
    // }
    
    let butClass = "";
    let persons = null;
    if(this.state.showPersons) {
      persons = (
      <div>
        {this.state.persons.map((persons,index) => {
            return <Person 
            name={persons.name} 
            click={() => this.deletePersonHandler(index)} 
            key={persons.id} 
            changed={(event) => this.nameChangeHandler(event,persons.id)}/>
        })}
      </div>
      )
      // style.backgroundColor = "#2d292b";
      // style[':hover'] = {
      //   backgroundColor : "#063463"
      // }
      butClass = classes.blackGrey;
    }
    const assignedClasses = [];
    if(this.state.persons.length <= 2) {
      assignedClasses.push(classes.red);
    }
    return (
      // <StyleRoot>
        <div className={classes.App}>
        <h1 className={assignedClasses.join(" ")}>Hii, I'm  @Doremon </h1>
        {/* <button 
          className="button"
          style={style}
          onClick={() => this.switchNameHandler("Nilam")}>Click Here</button> */}
          {/* <StyledButton alt={this.state.showPersons}
          onClick={this.togglePersonsHandler}>Click Here
          </StyledButton> */}
          <button 
          className={butClass}
          // style={style}
          onClick={this.togglePersonsHandler}>Click Here</button>
          {persons}
        {/* <UserInput changed={this.userNameChangeHandler} cuurentName={this.state.userName}/>
        <UserOutut userName={this.state.userName}/>
        <UserOutut userName={this.state.userName}/>
        <UserOutut userName={this.state.userName}/> */}
      </div>
      // </StyleRoot> */
    );
    //return React.createElement('div',{className:"App"},React.createElement('h1',null,'Hi, I\'m @Doremon'));
  }
}

export default App;
// export default Radium(App);
