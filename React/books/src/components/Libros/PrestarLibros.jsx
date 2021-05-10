import axios from 'axios';
import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom';


export default function PrestarLibros(props) {

    const params = useParams();
    const [personas, setPersonas] = React.useState([]);
    const [form, setForm] = React.useState({
        id: params.id,
        persona_id: 0
    });    

    const obtenerPersonas = async () => {
        try {
            const respuesta = await axios.get('http://localhost:3333/persona/');
            setPersonas(respuesta.data);
        } catch (e) {}
    };

    React.useEffect(() => {
        obtenerPersonas();
    }, []);


    const handleChangePersona = e => {
        const nuevoState = JSON.parse(JSON.stringify(form));
        nuevoState.persona_id = e.target.value;
        console.log(nuevoState);
        setForm(nuevoState);
    };    

    const handleSubmit = async (e) => {
        // form      
        e.preventDefault();
        try {

            await axios.put('http://localhost:3333/libro/prestar/'+params.id, form);

        } catch (e) {
            console.log(e.message)
        }

        props.history.push('/libros');
    };    


    return (
        <div>           
            <h1>Prestar</h1>
             <Form inline onSubmit={handleSubmit}>
                <Form.Label className="my-1 mr-2">
                    <h5>Persona:</h5>
                </Form.Label>
                <Form.Control as="select" className="my-1 mr-sm-2" custom onChange={handleChangePersona}>
                    <option value="0">Seleccionar persona...</option>
                    {personas.map(unaPersona => (
                        <option value={unaPersona.id}>
                            {unaPersona.nombre} {unaPersona.apellido}
                        </option>
                    ))}
                </Form.Control>
                <Button type="submit" className="my-1">
                    Prestar
                </Button>
            </Form>


        </div>

    )
}
