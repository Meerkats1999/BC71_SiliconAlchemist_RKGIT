import React from 'react';
import './Options.css'


class Options extends React.Component{
    render(){
        const {cb} = this.props;
        return(
            <div className={'ButtonParent'}>
                <button onClick={()=>cb('start')} className={'green'}>Start</button>
                <button onClick={()=>cb('reset')} className={'red'}>Reset</button>
                <button onClick={()=>cb('pause')} className={'blue'}>Pause</button>  
            </div>
        );
    }
}
export default Options;

