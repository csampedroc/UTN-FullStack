import axios from 'axios';
import React from 'react';

export default function PrestarLibros(props) {

    const state = props.data
    const [personas, setPersonas] = React.useState([]);

    const obtenerPersonas = async () => {
        try {
            const respuesta = await axios.get('http://localhost:3333/persona/');
            setPersonas(respuesta.data);
        } catch (e) {}
    };

    React.useEffect(() => {
        obtenerPersonas();
    }, []);


    return (

        <form>
            { state }
            <select name="persona_id">
                <option value="">Seleccione una persona</option>
                {personas.map(unaPersona => (
                    <option value={unaPersona.id}>
                        {unaPersona.nombre} {unaPersona.apellido}
                    </option>
                ))}
            </select>
            <button>Guardar</button>
        </form>

    )
}
