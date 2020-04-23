import "@babel/polyfill";
import React from "react";
import { hydrate } from "react-dom";
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';
import { Provider } from 'react-redux';
import {renderRoutes} from 'react-router-config';
import Routes from '../routes/Routes';

const store = createStore(reducers, window.INITIAL_STATE, applyMiddleware(thunk));

hydrate( 
    <Provider store={store}>
        <BrowserRouter>
            {renderRoutes(Routes)}
        </BrowserRouter>
    </Provider>,
    document.getElementById("root")
);