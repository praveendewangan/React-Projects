import React, { Component } from "react";
import classes from './Person.css';
import Aux from '../../../hoc/Auxilliary';
import withClass from '../../../hoc/withClass';
import PropTypes from 'prop-types';
import AuthContext from '../../../context/auth-context';
class Person extends Component {
    // static getDerivedStateFromProps(props,state) {
    //     console.log("[ Person.js ] getDerivedStateFromProps");
    //     console.log("state => ",state);
    //     console.log("props => ",props);
    //     return state;
    //   }
    constructor(props){
        super(props);
        this.inputElementRef = React.createRef();
    }
    static contextType = AuthContext;

    componentDidMount() {
        // this.inputElement.focus();
        this.inputElementRef.current.focus();
        console.log(this.context.authenticated);
    }
    render () {
        console.log("[ Person.js ] rendering...");
        return (
            // <div className={classes.Person}>
            // <React.Fragment>
            <Aux>
                {/* <AuthContext.Consumer> */}
                    {this.context.authenticated ? <p>Authenticated!</p> : <p>Please Log in</p>}
                {/* </AuthContext.Consumer> */}
                <p onClick={this.props.click}>I'm a {this.props.name}</p>
                <p>{this.props.children} </p>
                <input className= {classes.input} type="text"
                // ref={(input) => {this.inputElement = input}}
                ref={this.inputElementRef}
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
    changed : PropTypes.func
};

export default withClass(Person,classes.Person);