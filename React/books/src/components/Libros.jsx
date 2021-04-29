import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Libros() {
    
    const [list, setList] = useState([]);
    const [error, setError] = useState('');

    const endpoint = 'http://localhost:3333/libro'


    useEffect(() => {

        const fetchBooks = async () => {

            try {                
                const response = await axios.get(endpoint);   
                if (response.status === 200) {
                    setList(response.data);
                }
            } catch (e) {
                setError(`Error: Fetch failure ${endpoint}`);
            }

        }
        fetchBooks();
    },[]);

    const booksList = list.map((books) => 
              
        <div className="card bg-light mb-3 animate__animated animate__fadeIn" style={ { maxWidth: 400 } }>
            <div class="card-header">
                <h5>{ books.nombre }</h5>
            </div>
            <div className="card-body">
                <p className="card-text">{ books.descripcion }</p>
                <div>                    
                    <Link className="badge badge-primary" to={ `./hero/${ books.id }` }>
                        Editar
                    </Link>
                    <Link className="badge badge-danger" to={ `./hero/${ books.id }` }>
                        Eliminar
                    </Link>
                    <Link className="badge badge-success" to={ `./hero/${ books.id }` }>
                        Devolver
                    </Link>     
                    <Link className="badge badge-info" to={ `./hero/${ books.id }` }>
                        Prestar
                    </Link>                                           
                </div>
            </div>
        </div>
    );

    return (
        
        <> 
           <h3> { error } </h3>

           <div className="card-columns">
               { booksList }
           </div>


        </>    

    )
}
