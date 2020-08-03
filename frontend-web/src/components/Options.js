import React from 'react';
import './Options.css'


class Options extends React.Component {
  render() {
    const {cb} = this.props;
    return (
      <div className={'ButtonParent'}>
        <button onClick={() => cb('start')} className={'green'}>Start</button>
        {/*<button onClick={() => cb('reset')} className={'red'}>Reset</button>*/}
        {/*<button onClick={() => cb('pause')} className={'blue'}>Pause</button>*/}
        <button onClick={() => cb('emergency')} className={'red'}>Emergency Vehicle</button>
        <button onClick={() => cb('pothole')} className={'green'}>Test Pothole</button>
        <button onClick={() => cb('crash')} className={'red'}>Test Crash</button>
        <button onClick={() => cb('vicinity')} className={'blue'}>Test Vicinity</button>
      </div>
    );
  }
}

export default Options;

