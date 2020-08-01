import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import WebFont from 'webfontloader';


import * as serviceWorker from './serviceWorker';

WebFont.load({
    google: {
        families: ['Titillium Web:300,400,700', 'sans-serif', 'Oswald']
    }
});

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
