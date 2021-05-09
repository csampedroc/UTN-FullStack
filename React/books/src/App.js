import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import ListadoGeneros from './components/Generos/ListadoGeneros';
import Inicio from './components/Inicio';
import EditarLibros from './components/Libros/EditarLibros';
import ListadoLibros from './components/Libros/ListadoLibros';
import ListadoPersonas from './components/Personas/ListadoPersonas';

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
        <Route exact path="/libros">
          <ListadoLibros />
        </Route>          
        <Route exact path="/libros/editar/:id">
          <EditarLibros />
        </Route>
        <Route exact path="/personas">
          <ListadoPersonas />
        </Route>
        <Route exact path="/generos">
          <ListadoGeneros />
        </Route>
        <Route exact path="/">
          <Inicio />
        </Route>
      </Switch>
    </Router>
  )
}

export default App;
