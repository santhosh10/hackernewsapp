import React from 'react';
import App, { loadData } from '../components/app';

export default  [
    {
        loadData,
        path: '/',
        component: App,
        exact: true
    }
];