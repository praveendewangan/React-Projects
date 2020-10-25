import React from 'react';
import Aux from '../../hoc/Auxiliary';
import classes from './Layout.module.css';
// const { ProgressPlugin } = require("webpack");
import Toolbar from '../Navigation/Toolbar/Toolbar';

const layout = props  => 
        <Aux>
            <Toolbar/>
            <div></div>
            <main className={classes.Content}>
                {props.children}
            </main>
        </Aux>;

export default layout;