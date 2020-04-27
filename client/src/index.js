import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes';

const App = Routes;

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
