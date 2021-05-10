import axios from 'axios';
import React from 'react';
import { Button, Form } from 'react-bootstrap';

export default function AltaGeneros(props) {

    const [form, setForm] = React.useState({
        id: '',
        nombre: ''
    })

    const handleChangeNombre = (e) => {
        const nuevoState = JSON.parse(JSON.stringify(form));
        nuevoState.nombre = e.target.value;
        setForm(nuevoState);
    }    

    const handleSubmit = async(e) => {

        e.preventDefault();
        await axios.post('http://localhost:3333/categoria', form);
        props.history.push('/generos');
    }

    return (
        <div>
            <h1>Agregar</h1>
            <Form inline onSubmit={handleSubmit}>
                <Form.Label className="my-1 mr-2">
                    Nombre
                </Form.Label>
                <Form.Control className="mb-2 mr-sm-2" type="text" name="descripcion" custom value={form.nombre} onChange={handleChangeNombre} />
                <Button type="submit" className="mb-2">
                    Grabar
                </Button>
            </Form>
        </div>
    )
}
