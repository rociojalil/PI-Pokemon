import './App.css';
import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Landing from './components/Landing/Landing';
import Home from './components/Home/Home';

function App() {
  return (

      <React.Fragment>

        <BrowserRouter>

          <Route exact path="/" component={Landing}/>
          <Route path="/home" component={Home}/>

        </BrowserRouter>


      </React.Fragment>
  );
}

export default App;
