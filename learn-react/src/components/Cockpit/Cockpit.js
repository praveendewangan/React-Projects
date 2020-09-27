import React from 'react';
import classes from './Cockpit.css'

const cockpit = (props) => {
    
    let butClass = "";
    if(props.showPersons) {
        butClass = classes.blackGrey;
    }
    const assignedClasses = [];
    if(props.persons.length <= 2) {
      assignedClasses.push(classes.red);
    }
    return(<div>
            <h1 className={assignedClasses.join(" ")}>{props.title} </h1>
            <button 
            className={butClass}
            onClick={props.clicked}>Click Here</button>
        </div>);
}

export default cockpit;