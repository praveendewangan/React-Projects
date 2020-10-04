import React, { useEffect } from 'react';
import classes from './Cockpit.css'

const cockpit = (props) => {
    useEffect(() => {
      console.log("[ Cockpit.js ] useEffect");
      // When component is going to mount
      // const timer = setTimeout(() => {
      //   alert("Saved data on cloud");
      // },1000);
      // When component is going to unmount
      return () => {
        // clearTimeout(timer);
        console.log("[ Cockpit.js ] cleanup work in useEffect");
      };
    },[]);
    // },[props.persons]);
    useEffect(() => {
      console.log("[ Cockpit.js ] 2nd useEffect");
      return () => {
        console.log("[ Cockpit.js ] cleanup work in 2nd useEffect");
      }
    });

    let butClass = "";
    if(props.showPersons) {
        butClass = classes.blackGrey;
    }
    const assignedClasses = [];
    if(props.personsLength <= 2) {
      assignedClasses.push(classes.red);
    }
    return(<div>
            <h1 className={assignedClasses.join(" ")}>{props.title} </h1>
            <button 
            className={butClass}
            onClick={props.clicked}>Click Here</button>
        </div>);
}

export default React.memo(cockpit);