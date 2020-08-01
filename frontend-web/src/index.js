import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import WebFont from 'webfontloader';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"


import * as serviceWorker from './serviceWorker';

WebFont.load({
    google: {
        families: ['Titillium Web:300,400,700', 'sans-serif', 'Oswald','Righteous']
    }
});

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
