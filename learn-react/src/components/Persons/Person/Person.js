import React, { Component } from "react";
import classes from './Person.css';

class Person extends Component {
    // static getDerivedStateFromProps(props,state) {
    //     console.log("[ Person.js ] getDerivedStateFromProps");
    //     console.log("state => ",state);
    //     console.log("props => ",props);
    //     return state;
    //   }
    render () {
        console.log("[ Person.js ] rendering...");
        return (
            <div className={classes.Person}>
                <p onClick={this.props.click}>I'm a {this.props.name}</p>
                <p>{this.props.children} </p>
                <input className= {classes.input} type="text" 
                onChange={this.props.changed} value={this.props.name}/>
            </div>
        );
    }
}

export default Person;