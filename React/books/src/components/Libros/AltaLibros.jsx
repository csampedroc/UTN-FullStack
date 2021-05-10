import React from 'react';
import { Button, Form } from 'react-bootstrap';

export default function AltaLibros() {


    const handleSubmit = {
        
    }

    return (

        <div>
            <h1>Agregar</h1>
            <Form inline onSubmit={handleSubmit}>
                <Form.Label className="my-1 mr-2">
                    Nombre
                </Form.Label>
                <Form.Control className="mb-2 mr-sm-2" type="text" name="descripcion" custom />
                <Button type="submit" className="mb-2">
                    Grabar
                </Button>
            </Form>
        </div>
    )
}
