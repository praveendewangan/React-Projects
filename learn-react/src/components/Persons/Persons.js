import React, { PureComponent } from 'react';
import Person from './Person/Person';
class Persons extends PureComponent {
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
    // shouldComponentUpdate(nextProps,nextState) {
    //     console.log("[ Persons.js ] shouldComponentUpdate");
    //     console.log("nextState => ",nextState);
    //     console.log("nextProps => ",nextProps);
    //     if(nextProps.persons !== this.props.persons 
    //         || nextProps.changed !== this.props.changed 
    //         || nextProps.clicked !== this.props.clicked) {
    //         return true;
    //     } else {
    //         return false;
    //     }
    // }
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
    componentWillUnmount() {
        console.log("[ Persons.js ] componentWillUnmount");
    }
    render (){
        console.log("[ Persons.js ] rendering...");
        return this.props.persons.map((persons,index) => {
            console.log("check",persons);
            return <Person 
                    key={persons.id}
                    name={persons.name} 
                    click={() => this.props.clicked(index)} 
                    changed={(event) => this.props.changed(event,persons.id)}
                    // isAuth={this.props.isAuthenticated}
                    />
              
        });
    }
}
export default Persons;
