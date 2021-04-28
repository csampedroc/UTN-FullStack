import React from 'react';
import {
  BrowserRouter as Router,
  Link, Route, Switch
} from "react-router-dom";
import './App.css';
import Generos from './components/Generos';
import Inicio from './components/Inicio';
import Libros from './components/Libros';
import Personas from './components/Personas';

function App() {

  const padding = {
    padding: 5
  }

  return (
    <Router>
      <div>
        <Link style={padding} to="/">Inicio</Link>
        <Link style={padding} to="/libros">Libros</Link>
        <Link style={padding} to="/personas">Personas</Link>
        <Link style={padding} to="/generos">Generos</Link>
      </div>

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
