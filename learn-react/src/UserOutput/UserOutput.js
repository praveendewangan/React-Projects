import React from 'react';

import './UserOutput.css';

const userOutput = (props) => {
    return (
        <div className="UserOutput">
            <p>Username : {props.userName}</p>
            <p>Random second</p>
        </div>
    );
}

export default userOutput;