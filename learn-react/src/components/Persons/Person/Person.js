import React, { Component } from "react";
import classes from './Person.css';
import Aux from '../../../hoc/Auxilliary';
import withClass from '../../../hoc/withClass';
import PropTypes from 'prop-type';
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
            // <div className={classes.Person}>
            // <React.Fragment>
            <Aux>
                <p onClick={this.props.click}>I'm a {this.props.name}</p>
                <p>{this.props.children} </p>
                <input className= {classes.input} type="text" 
                onChange={this.props.changed} value={this.props.name}/>
            </Aux>
            // </React.Fragment>
            // </div>
        );
    }
}

Person.propTypes = {
    click : PropTypes.func,
    name : PropTypes.string,
    age : PropTypes.number,
    changed : PropTypes.fun
};

export default withClass(Person,classes.Person);