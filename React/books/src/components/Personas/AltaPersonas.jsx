import axios from 'axios';
import React from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';

export default function AltaPersonas(props) {

    const [form, setForm] = React.useState({
        id: '',
        nombre: '',
        apellido: '',
        alias: '',
        email: ''
    });   

    const handleChangeNombre = (e) => {
        const nuevoState = JSON.parse(JSON.stringify(form));
        nuevoState.nombre = e.target.value;
        setForm(nuevoState);
    }


    const handleChangeApellido = (e) => {
        const nuevoState = JSON.parse(JSON.stringify(form));
        nuevoState.apellido = e.target.value;
        setForm(nuevoState);
    }


    const handleChangeAlias = (e) => {

        const nuevoState = JSON.parse(JSON.stringify(form));
        nuevoState.alias = e.target.value;
        setForm(nuevoState);
    }    

    const handleChangeEmail = (e) => {

        const nuevoState = JSON.parse(JSON.stringify(form));
        nuevoState.email = e.target.value;
        setForm(nuevoState);
    }    


    const handleSubmit = async (e) => {

        try {
            e.preventDefault();
            await axios.post('http://localhost:3333/persona', form);
        } catch (error) {
            console.log(error.message);            
        }

        props.history.push('/personas');        
    }

    return (

        <div>
            <h1>Agregar</h1>
            <Form onSubmit={handleSubmit}>
            <Form.Group as={Row}>
                <Form.Label column sm={2}>Nombre:</Form.Label>
                <Col sm={10}>
                <Form.Control type="text" placeholder="Nombre" value={form.nombre} onChange={handleChangeNombre} />
                </Col>
            </Form.Group>

            <Form.Group as={Row}>
                <Form.Label column sm={2}>Apellido:</Form.Label>
                <Col sm={10}>
                <Form.Control type="text" placeholder="Descripcion" value={form.apellido} onChange={handleChangeApellido}/>
                </Col>
            </Form.Group>

            <Form.Group as={Row}>
                <Form.Label column sm={2}>Alias:</Form.Label>
                <Col sm={10}>
                <Form.Control type="text" placeholder="Alias" value={form.alias} onChange={handleChangeAlias}/>
                </Col>
            </Form.Group>

            <Form.Group as={Row}>
                <Form.Label column sm={2}>Email:</Form.Label>
                <Col sm={10}>
                <Form.Control type="email" placeholder="Email" value={form.email} onChange={handleChangeEmail}/>
                </Col>
            </Form.Group>

            <Form.Group as={Row}>
                <Col sm={{ span: 10, offset: 2 }}>
                <Button type="submit">Aceptar</Button>
                </Col>
            </Form.Group>
            </Form>
        </div>
    )
}
