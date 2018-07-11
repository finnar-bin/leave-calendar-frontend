import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import fontawesome from '@fortawesome/fontawesome';
import brands from '@fortawesome/fontawesome-free-brands';
import { faChevronLeft, faChevronRight, faEdit, faCheckCircle, faHourglassHalf } from '@fortawesome/fontawesome-free-solid';
import { faCalendarCheck, faUserCircle } from '@fortawesome/fontawesome-free-regular';

fontawesome.library.add(faChevronLeft, faChevronRight, faCalendarCheck, faEdit, faCheckCircle, faHourglassHalf, faUserCircle);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
