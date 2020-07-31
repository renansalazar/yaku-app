import React from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Dashboard from './pages/Dashboard'
import Reporte from './pages/Reporte'

function App() {
  return (
    <BrowserRouter>
      <Switch>
          <Route exact path='/' component={Dashboard}/>
          <Route path='/reporte' component={Reporte}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
