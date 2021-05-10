import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AltaGeneros from './components/Generos/AltaGeneros';
import EditarGeneros from './components/Generos/EditarGeneros';
import ListadoGeneros from './components/Generos/ListadoGeneros';
import Inicio from './components/Inicio';
import AltaLibros from './components/Libros/AltaLibros';
import EditarLibros from './components/Libros/EditarLibros';
import ListadoLibros from './components/Libros/ListadoLibros';
import PrestarLibros from './components/Libros/PrestarLibros';
import AltaPersonas from './components/Personas/AltaPersonas';
import EditarPersonas from './components/Personas/EditarPersonas';
import ListadoPersonas from './components/Personas/ListadoPersonas';

function App() {

  return (

    <Router>

      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/">Books</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/">Inicio</Nav.Link>
          <Nav.Link href="/libros">Libros</Nav.Link>
          <Nav.Link href="/personas">Personas</Nav.Link>
          <Nav.Link href="/generos">Generos</Nav.Link>
        </Nav>
      </Navbar>

      <Switch>
        <Route exact path="/" component={Inicio} />
        <Route exact path="/libros" component={ListadoLibros} />
        <Route exact path="/libros/agregar" component={AltaLibros} />
        <Route exact path="/libros/editar/:id" component={EditarLibros} />
        <Route exact path="/libros/prestar/:id" component={PrestarLibros} />
        <Route exact path="/personas" component={ListadoPersonas} />
        <Route exact path="/personas/agregar" component={AltaPersonas} />
        <Route exact path="/personas/editar/:id" component={EditarPersonas} />
        <Route exact path="/generos" component={ListadoGeneros} />
        <Route exact path="/generos/agregar" component={AltaGeneros} />
        <Route exact path="/generos/editar/:id" component={EditarGeneros} />
      </Switch>

    </Router>
  )
}

export default App;
