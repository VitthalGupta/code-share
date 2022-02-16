import React from 'react';
import { BrowserRouter , Switch, Route } from 'react-router-dom';
import './App.css';
import main from './components/main';

const Routing = () => {
  return(
    <Switch>
      <Route exact={true} path='/' component={main} />
    </Switch>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routing />
    </BrowserRouter>
  );
}

export default App;