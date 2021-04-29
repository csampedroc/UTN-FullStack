import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import Generos from './components/Generos';
import Inicio from './components/Inicio';
import Libros from './components/Libros';
import Personas from './components/Personas';

function App() {

  return (
    <Router>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div className="collapse navbar-collapse">
          <div className="navbar-nav">        
            <Link className="nav-item nav-link" to="/">Inicio</Link>
            <Link className="nav-item nav-link" to="/libros">Libros</Link>
            <Link className="nav-item nav-link" to="/personas">Personas</Link>
            <Link className="nav-item nav-link" to="/generos">Generos</Link>
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
