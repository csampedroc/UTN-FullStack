import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import Generos from './components/Generos';
import Inicio from './components/Inicio';
import Libros from './components/Libros';
import Personas from './components/Personas';

function App() {

  return (
    <Router>
      <nav className="navbar is-dark is-spaced">
        <div className="navbar-menu">
          <div className="navbar-start">
            <Link className="navbar-item" to="/">Inicio</Link>
            <Link className="navbar-item" to="/libros">Libros</Link>
            <Link className="navbar-item" to="/personas">Personas</Link>
            <Link className="navbar-item" to="/generos">Generos</Link>
          </div>        
        </div>        
      </nav>

      <Switch>
        <Route path="/libros">
          <Libros />
        </Route>
        <Route path="/personas">
          <Personas />
        </Route>
        <Route path="/generos">
          <Generos />
        </Route>
        <Route path="/">
          <Inicio />
        </Route>
      </Switch>
    </Router>
  )
}

export default App;
