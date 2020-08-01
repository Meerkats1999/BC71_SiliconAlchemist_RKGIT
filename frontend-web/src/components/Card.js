import React, {Component} from 'react';
import './Card.css';

const card=(props)=>{
    const {time,state} = props;
    return(
        <div className="body">
        <div className="card">
            <div className="container">
                <h4><b>Simulation Data</b></h4>
                <p>Simulation Status: {state}</p>
                <p>Simulation Time: {time}</p>
            </div>
        </div>
        </div>
        
    
    );

}

export default card;