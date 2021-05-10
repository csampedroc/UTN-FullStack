import axios from 'axios';
import React from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

export default function EditarLibros(props) {

    const params = useParams();
    const [form, setForm] = React.useState({
        id: params.id,
        nombre: params.nombre,
        descripcion: '',
        categoria_id: params.categoria_id,
        persona_id: params.persona_id
    })    
  
    const buscarLibroPorId = async(idLibro) => {
        try {
            const respuesta = await axios.get('http://localhost:3333/libro/'+idLibro)
            setForm(respuesta.data)
            console.log(respuesta.data);
        } catch(e) {
            console.log(e.message);
        }
    }

    React.useEffect(() => {
        if (!params.id) return;
        buscarLibroPorId(params.id);
    }, [params]) 

    const handleChangeDescripcion = (e) => {
        const nuevoState = JSON.parse(JSON.stringify(form));
        nuevoState.descripcion = e.target.value;
        setForm(nuevoState);
    }

    const handleSubmit = async(e) => {

        e.preventDefault();
        try {
            await axios.put('http://localhost:3333/libro/'+params.id, form);
        }catch(e){
            console.log(e.message,'http://localhost:3333/libro/'+params.id);
        }

        props.history.push('/libros');
    }

    return (
        <div>           
            <h1>Editar</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group as={Row}>
                    <Form.Label column sm={2}>Nombre:</Form.Label>
                    <Col sm={10}>
                    <Form.Control type="text" placeholder="Nombre" value={params.id} readOnly/>
                    </Col>
                </Form.Group>                
                <Form.Group as={Row}>
                    <Form.Label column sm={2}>Descripcion:</Form.Label>
                    <Col sm={10}>
                    <Form.Control type="text" placeholder="Descripcion" value={form.descripcion} onChange={handleChangeDescripcion} />
                    </Col>
                </Form.Group>
                <Button type="submit" className="mb-2">
                    Grabar
                </Button>
            </Form>
        </div>
    )
}
