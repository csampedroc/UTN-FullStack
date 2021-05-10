import React from 'react';
import { Container, Jumbotron } from 'react-bootstrap';

export default function Inicio() {
    return (
        <Jumbotron fluid>
        <Container>
            <h1 className="display-4">Where is my books?</h1>
            <p className="lead">Proyecto Integrador Final de la Diplomatura Fullstack UTN.</p>
            <hr className="my-4" />
        </Container>
        </Jumbotron>        

    )
}
