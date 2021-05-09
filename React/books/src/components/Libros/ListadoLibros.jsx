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
            const response = await axios.get(endpoint);   
            if (response.status === 200) {
                setList(response.data);
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
            console.log('error ', e.message)
        }
    }

    const devolverLibro = async(idLibro) => {
        try {
            await axios.put('http://localhost:3333/libro/devolver/'+ idLibro,null)
            setShow(true);
            setMensaje('Libro devuelto correctamente');            
            fetchBooks();
        } catch (e) {
            console.log('error ', e.message);
        }
    }

    const booksList = list.map((books) => 
              
        <Card bg="bg-light" className="mb-3 animate__animated animate__fadeIn" style={ { maxWidth: 400 } }>
            <Card.Header><h5>{ books.nombre }</h5></Card.Header>
            <Card.Body>
                <Card.Text>{ books.descripcion }</Card.Text>
                { books.persona_id === null 
                        ? <p><Badge pill variant="success">Estado: Disponible</Badge></p>
                        : <p><Badge pill variant="danger">Estado: Prestado</Badge></p>  
                }                   
                <div>                    
                    <Link to={ `/libros/editar/${ books.id }` }><Button variant="primary" size="sm">Editar</Button></Link>
                    <Link onClick={() => eliminarLibro(books.id) }><Button variant="danger" size="sm">Eliminar</Button></Link>
                    { books.persona_id === null 
                        ? <Link to={ `/libros/prestar/${ books.id }` }><Button variant="info" size="sm">Prestar</Button></Link>
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


        </>    

    )
}
