import React, { Component } from 'react';
import Aux from '../Auxiliary/Auxiliary';
import classes from './Layout.module.css';
// const { ProgressPlugin } = require("webpack");
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'

class Layout extends Component {
    state = {
        showSideDrawer : false
    }
    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer : false});
    }
    sideDrawerToggleHandler = () => {
        this.setState((preState) => {
            return {showSideDrawer : !preState.showSideDrawer}
        });
    }
    render() {
        return (
            <Aux>
                <Toolbar drawerToggleClick={this.sideDrawerToggleHandler}/>
                <SideDrawer
                    
                    open={this.state.showSideDrawer} 
                    closed={this.sideDrawerClosedHandler}/>
                <div></div>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    }
} 

export default Layout;