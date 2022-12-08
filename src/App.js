import React from 'react';

import Header from './components/header/header';
import Router from './services/router';
import AppContext from './components/context/app-context';
import {Provider} from 'react-redux';
import {store} from './store';

const App = () => {
  return (
    <Provider store={store}>
      <AppContext>
        <div className="App">
          <Header/>
          <div className="content">
            <Router/>
          </div>
        </div>
      </AppContext>
    </Provider>
  );
};

export default App;
