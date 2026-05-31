import './style.css';

import React from 'react';
import ReactDOM from 'react-dom';
import Application from './Application/Application';
import LandingPage from './Application/UI/components/LandingPage';

const startExperience = () => {
    const ui = document.getElementById('ui');
    if (ui) ReactDOM.unmountComponentAtNode(ui);
    new Application();
};

ReactDOM.render(
    React.createElement(LandingPage, { onEnter: startExperience }),
    document.getElementById('ui')
);
