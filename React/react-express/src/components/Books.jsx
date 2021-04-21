import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function Books() {

    const [list, setList] = useState([]);
    const [error, setError] = useState('');

    const endpoint = 'http://localhost:3333/libros'


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

    const booksList = list.map((books) => <div> {books.id} - {books.descripcion}  </div>);

    return (
        
        <div> 
           <h3> { error } </h3> 
            <div>
                { booksList }
            </div>
        </div>    

    )
}


