import './App.css'
import React from 'react'

export default function PrimerComponente(props) {

    //const element = <h1>Hola {props.name} </h1>;
    // const element = <img src={props.url} alt={props.title} />;

    // return element;
    return (
         <div className="container">
            <img src={props.url} alt={props.title}/>
            <aside>
                <div className="title">{props.title}</div>
                <div className="description">{props.description}</div>
            </aside>

        </div>

)

}
