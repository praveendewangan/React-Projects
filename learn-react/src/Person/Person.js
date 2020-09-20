import React from "react";
import classes from './Person.css';
// import styled from "styled-components";
// import Radium from "radium";

// const StyledDiv = styled.div`
//     width:60%;
//     margin: 16px auto;
//     box-shadow: 0 0px 20px 2px #d6d3d3;
//     padding: 16px;
//     text-align: center;
//     background: white;

//     @media (min-width: 500px) : {
//         width : '450px'
//     }
//     `
const person = (props) => {
    // const style = {
    //     '@media (min-width: 500px)' : {
    //         width : '450px'
    //     }
    // }
    return (
    // <div className="Person" style={style}>
    // <StyledDiv>
    <div className={classes.Person}>
        <p onClick={props.click}>I'm a {props.name}</p>
        <p>{props.children} </p>
        <input className= {classes.input} type="text" onChange={props.changed} value={props.name}/>
    </div>
    // </StyledDiv>
    );
}

// export default Radium(person);
export default person;