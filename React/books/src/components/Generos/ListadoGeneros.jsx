import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Accordion, Alert, Button, Card, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function ListadoGeneros() {

    const [list, setList] = useState([]);
    const [error, setError] = useState('');
    const [show, setShow] = useState(false);    
    const [mensaje, setMensaje] = useState('');        

    const endpoint = 'http://localhost:3333/categoria'

    const fetchGeneros = async () => {

        try {                

            const responseLibros = await axios.get('http://localhost:3333/libro/');
            const listadoLibros = responseLibros.data; 

            const response = await axios.get(endpoint);   

            if (response.status === 200) {

                const listadoCompleto = response.data.map(categoria => {
                    const librosGenero = listadoLibros.filter(libro => libro.categoria_id === categoria.id);
                    const listado = JSON.parse(JSON.stringify(categoria));
                    listado.libro = librosGenero
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

    useEffect(() => {        
        fetchGeneros();
    },[]);

    const eliminarGenero = async(idGenero) => {

        try {
            await axios.delete('http://localhost:3333/categoria/'+ idGenero)
            setShow(true);
            setMensaje('Genero eliminado correctamente');
            fetchGeneros();
        } catch (e) {
            setError('Error eliminando Genero ' + e.message );
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


    const generosList = list.map((generos) =>

        <tr>
            <td>
                <Accordion defaultActiveKey="1">
                    <Card>
                        <Card.Header>
                        <Accordion.Toggle as={Button} variant="link" eventKey="0">
                            { generos.nombre } ({ generos.libro.length  })
                        </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="0">
                        <Card.Body>
                            { renderizadoLibros(generos.libro) } 
                        </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>                
            </td>
            <td><Link to={ `/generos/editar/${ generos.id }` }><Button variant="primary" size="sm">Editar</Button></Link></td>
            <td><Link onClick={() => eliminarGenero(generos.id) }><Button variant="danger" size="sm">Eliminar</Button></Link></td>    
        </tr>

    )

    return (
        <div>

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
            <Table striped bordered hover>

                <thead>
                    <tr>
                        <th>Genero</th>
                        <th>Accion</th>                        
                        <th>Accion</th>                        
                    </tr>
                </thead>

                <tbody>
                    { generosList }
                </tbody>

            </Table>

            <>
                <Link to={ "/generos/agregar" }><Button variant="success" size="lg" block>Agregar</Button></Link>            
            </>

        </div>
    )
}
