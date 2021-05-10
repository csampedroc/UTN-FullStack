import axios from 'axios';
import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

export default function EditarGeneros(props) {

    const params = useParams();
    const [form, setForm] = React.useState({
        id: params.id,
        nombre: ''
    })    

    const buscarGeneroPorId = async(idGenero) => {
        try {
            const respuesta = await axios.get('http://localhost:3333/categoria/'+idGenero)
            setForm(respuesta.data)
        } catch(e) {

        }
    }

    React.useEffect(() => {
        if (!params.id) return;
        buscarGeneroPorId(params.id)
    }, [params])

    const handleChangeNombre = (e) => {
        const nuevoState = JSON.parse(JSON.stringify(form));
        nuevoState.nombre = e.target.value;
        setForm(nuevoState);
    }

    const handleSubmit = async(e) => {
        // form 
        e.preventDefault();
        console.log(form);
        try {
            
            await axios.put('http://localhost:3333/categoria/'+params.id, form);
        }catch(e){
            console.log(e.message,'http://localhost:3333/categoria/'+params.id);
        }

        props.history.push('/generos');
    }

    return (
        <div>           
            <h1>Editar</h1>
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
