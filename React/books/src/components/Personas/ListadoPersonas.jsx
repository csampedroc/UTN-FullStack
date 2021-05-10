import axios from 'axios';
import React, { useState } from 'react';
import { Accordion, Alert, Button, Card, CardColumns } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function ListadoPersonas() {
    const [list, setList] = useState([]);
    const [error, setError] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [show, setShow] = useState(false);        

    const endpoint = 'http://localhost:3333/persona'

    const fetchPersonas = async () => {

        try {                

            const responseLibros = await axios.get('http://localhost:3333/libro/');
            const listadoLibros = responseLibros.data; 

            const response = await axios.get(endpoint);   

            if (response.status === 200) {

                const listadoCompleto = response.data.map(persona => {
                    const librosPersona = listadoLibros.filter(libro => libro.persona_id === persona.id);
                    const listado = JSON.parse(JSON.stringify(persona));
                    listado.libro = librosPersona
                    return listado
                });    
                setList(listadoCompleto);  
                setError('');

            }
        } catch (e) {
            setError(`Error: Fetch failure ${endpoint}`);
            setShow(true);
        }

    }

    React.useEffect(() => {        
        fetchPersonas();
    },[]);

    console.log(list);

    const eliminarPersona = async(idPersona) => {

        try {
            await axios.delete('http://localhost:3333/persona/'+ idPersona)
            setShow(true);
            setMensaje('Persona eliminada correctamente');
            fetchPersonas();
        } catch (e) {
            setError('Error eliminando Persona ' + e.message );
            setMensaje('')
            setShow(true);
        }
    }

    const renderizadoLibros = (librosAsociados) => {        
        return (
            <div>
                {librosAsociados.map(libro => {return(<Card.Text>{libro.nombre}</Card.Text>)})}
            </div>
        )
    }    

    const personasList = list.map((personas) => 
        
        <Card bg="bg-light" className="mb-3 animate__animated animate__fadeIn" style={ { maxWidth: 400 } }>
            <Card.Header><h5> Persona # { personas.id }</h5></Card.Header>
            <Card.Body>
                <Card.Text><strong>Nombre:</strong> { personas.nombre } { personas.apellido }  </Card.Text>
                <Card.Text><strong>Email:</strong> { personas.email }</Card.Text>                
                <small className="text-muted">Alias: { personas.alias }</small>
                <Accordion defaultActiveKey="1">
                <Card>
                    <Card.Header>
                    <Accordion.Toggle as={Button} variant="link" eventKey="0">
                        Libros Prestados ({ personas.libro.length  })
                    </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="0">
                    <Card.Body>
                        { renderizadoLibros(personas.libro) } 
                    </Card.Body>
                    </Accordion.Collapse>
                </Card>
                </Accordion>
                <div>                    
                    <Link to={ `/personas/editar/${ personas.id }` }><Button variant="primary" size="sm">Editar</Button></Link>
                    <Link onClick={() => eliminarPersona(personas.id) }><Button variant="danger" size="sm">Eliminar</Button></Link>
                </div>              
            </Card.Body>
        </Card>        

    );
    
    return (
        
        <> 
           {
               show && error
               ? <Alert variant="danger" onClose={() => setShow(false)} dismissible><h5>{ error }</h5></Alert>
               : ''
           }

           {
               show && mensaje
               ? <Alert variant="success" onClose={() => setShow(false)} dismissible><h5>{ mensaje }</h5></Alert>
               : ''
           }

           <CardColumns>
               { personasList }
           </CardColumns>

            <>
                <Link to={ "/personas/agregar" }><Button variant="success" size="lg" block>Agregar</Button></Link>            
            </>

        </>    

    )
}
