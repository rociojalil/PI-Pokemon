import './App.css';
import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Landing from './components/Landing/Landing';
import PokeDetail from './components/PokeDetail/PokeDetail';
import CreatePokemon from './components/CreatePokemon/CreatePokemon';
import Home from './components/Home/Home';

function App() {
  return (

      <React.Fragment>

        <BrowserRouter>

          <Route exact path="/" component={Landing}/>
          <Route path="/home" component={Home}/>
          <Route path='/createPoke' component={CreatePokemon}/>
          <Route path='/pokeId/:id' component={PokeDetail}/>

        </BrowserRouter>


      </React.Fragment>
  );
}

export default App;
