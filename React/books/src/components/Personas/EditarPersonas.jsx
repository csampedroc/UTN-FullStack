import axios from 'axios';
import React from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

export default function EditarPersonas(props) {
    const params = useParams();
    const [form, setForm] = React.useState({
        id: '',
        nombre: '',
        apellido: '',
        alias: '',
        email: params.email
    });   

    const buscarPersonaPorId = async(idPersona) => {
        try {
            const respuesta = await axios.get('http://localhost:3333/persona/'+idPersona)
            setForm(respuesta.data)
        } catch(e) {
            console.log(e.message);
        }
    }

    React.useEffect(() => {
        if (!params.id) return;
        buscarPersonaPorId(params.id)
    }, [params])

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

    const handleSubmit = async(e) => {
        // form 
        e.preventDefault();
        console.log(form);
        try {            
            await axios.put('http://localhost:3333/persona/'+params.id, form);
        }catch(e){
            console.log(e.message,'http://localhost:3333/persona/'+ params.id);
        }

        props.history.push('/personas');
    }

    return (
        <div>           
            <h1>Editar</h1>
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
                    <Form.Label column sm={2}>Alias:</Form.Label>
                    <Col sm={10}>
                    <Form.Control type="email" placeholder="Email" value={form.email} readOnly/>
                    </Col>
                </Form.Group>
                <Button type="submit" className="mb-2">
                    Grabar
                </Button>
            </Form>
        </div>
    )
}
