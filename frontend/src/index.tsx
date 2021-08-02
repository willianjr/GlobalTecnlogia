import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'

import App from './main/app'
import store from './main/store'




//console.log(process.env.URL_API)
ReactDOM.render(<Provider store={store}><App /></Provider>,
document.getElementById("root"));
