import axios from 'axios';
import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

export default function EditarLibros(props) {

    const params = useParams();
    const [form, setForm] = React.useState({
        id: '',
        nombre: '',
        descripcion: '',
        categoria_id:'',
        persona_id: ''
    })    
  
    const buscarLibroPorId = async(idLibro) => {
        try {
            const respuesta = await axios.get('http://localhost:3333/libro/'+idLibro)
            setForm(respuesta.data)
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
        // form 
        e.preventDefault();
        console.log(form);
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
            <Form inline onSubmit={handleSubmit}>
                <Form.Label className="my-1 mr-2">
                    Descripcion
                </Form.Label>
                <Form.Control className="mb-2 mr-sm-2" type="text" name="descripcion" custom value={form.descripcion} onChange={handleChangeDescripcion} />
                <Button type="submit" className="mb-2">
                    Grabar
                </Button>
            </Form>
            {/* <input type="text" name="descripcion" placeholder="descripcion" value={form.descripcion||''} onChange={handleChangeDescripcion}/><br/>             */}
        </div>
    )
}
