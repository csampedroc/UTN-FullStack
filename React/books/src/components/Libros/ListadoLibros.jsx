import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Alert, Badge, Button, Card, CardColumns } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function ListadoLibros() {
    
    const [list, setList] = useState([]);
    const [error, setError] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [show, setShow] = useState(false);        

    const endpoint = 'http://localhost:3333/libro'

    const fetchBooks = async () => {

        try {                
            const responsePersonas = await axios.get('http://localhost:3333/persona/');
            const listadoPersonas = responsePersonas.data; 
            const response = await axios.get(endpoint);   
            
            if (response.status === 200) {

                const listadoCompleto = response.data.map(libro => {
                    const personaLibro = listadoPersonas.find(persona => persona.id === libro.persona_id);
                    const listado = JSON.parse(JSON.stringify(libro));
                    console.log(listado);
                    listado.persona = personaLibro
                        ? personaLibro.alias
                        : '';
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
        fetchBooks();
    },[]);

    const eliminarLibro = async(idLibro) => {

        try {
            await axios.delete('http://localhost:3333/libro/'+ idLibro)
            setShow(true);
            setMensaje('Libro eliminado correctamente');
            fetchBooks();
        } catch (e) {
            setError('Error eliminando Libro ' + e.message );
            setMensaje('')
            setShow(true);
        }
    }

    const devolverLibro = async(idLibro) => {
        try {
            await axios.put('http://localhost:3333/libro/devolver/'+ idLibro, null)
            setShow(true);
            setMensaje('Libro devuelto correctamente');            
            fetchBooks();
        } catch (e) {
            setError('Error devolviendo Libro ' + e.message );
            setMensaje('')
            setShow(true);
        }
    }

    const booksList = list.map((books) => 
        
        <Card bg="bg-light" className="mb-3 animate__animated animate__fadeIn" style={ { maxWidth: 400 } }>
            <Card.Header><h5>{ books.nombre }</h5></Card.Header>
            <Card.Body>
                <Card.Text>{ books.descripcion }</Card.Text>
                { books.persona_id === null 
                        ? <p><Badge pill variant="success">Estado: Disponible</Badge></p>
                        : <p><Badge pill variant="danger">Estado: Prestado</Badge><br/>
                          <small className="text-muted">Prestado a: { books.persona }</small>
                          </p>
                }                   
                <div>                    
                    <Link to={ `/libros/editar/${ books.id }` }><Button variant="primary" size="sm">Editar</Button></Link>
                    <Link onClick={() => eliminarLibro(books.id) }><Button variant="danger" size="sm">Eliminar</Button></Link>
                    { books.persona_id === null 
                        ? <Link to={`/libros/prestar/${ books.id }`}><Button variant="info" size="sm">Prestar</Button></Link>
                        : <Link onClick={() => devolverLibro(books.id) }><Button variant="success" size="sm">Devolver</Button></Link>
                    }   
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
               { booksList }
           </CardColumns>

            <>
                <Link to={ "/libros/agregar" }><Button variant="success" size="lg" block>Agregar</Button></Link>            
            </>

        </>    

    )
}
