import axios from 'axios';
import React from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';

export default function AltaLibros(props) {

    const [generos, setGeneros] = React.useState([]);
    const [form, setForm] = React.useState({
        id: '',
        nombre: '',
        descripcion: '',
        categoria_id: '',
        persona_id: null
    });   

    const obtenerGeneros = async () => {
        try {
            const respuesta = await axios.get('http://localhost:3333/categoria/');
            setGeneros(respuesta.data);
        } catch (e) {}
    };

    React.useEffect(() => {
        obtenerGeneros();
    }, []);

    const handleChangeNombre = (e) => {
        const nuevoState = JSON.parse(JSON.stringify(form));
        nuevoState.nombre = e.target.value;
        setForm(nuevoState);
    }


    const handleChangeDescripcion = (e) => {
        const nuevoState = JSON.parse(JSON.stringify(form));
        nuevoState.descripcion = e.target.value;
        setForm(nuevoState);
    }


    const handleChangeCategoria = (e) => {
        // e.target.value
        const nuevoState = JSON.parse(JSON.stringify(form));
        nuevoState.categoria_id = e.target.value;
        setForm(nuevoState);
    }    


    const handleSubmit = async (e) => {

        try {
            await axios.post('http://localhost:3333/libro', form);
        } catch (error) {
            console.log(error.message);            
        }

        props.history.push('/libros');        
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
                <Form.Label column sm={2}>Descripcion:</Form.Label>
                <Col sm={10}>
                <Form.Control type="text" placeholder="Descripcion" value={form.descripcion} onChange={handleChangeDescripcion}/>
                </Col>
            </Form.Group>

            <Form.Group as={Row} name="categoria_id" onChange={handleChangeCategoria}>
                <Form.Label column sm={2}>Genero:</Form.Label>
                <Col sm={10}>
                <Form.Control as="select">
                <option value="0">Seleccionar genero...</option>
                    {generos.map(unGenero => (
                        <option value={unGenero.id}>
                            {unGenero.nombre}
                        </option>
                    ))}
                </Form.Control>
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
