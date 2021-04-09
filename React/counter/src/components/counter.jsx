import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

export default function Counter() {

    const counter = useSelector((state) => state.number);
    const dispatch = useDispatch();

    return (
        <div>
            <h1>Counter React-Redux</h1>
            <h3>{ counter }</h3>
            <div>
                <button className="increment" onClick={() => dispatch({ type: 'INCREMENT' })}>+</button>
                <button className="decrement" onClick={() => dispatch({ type: 'DECREMENT' })}>-</button>
                <button className="reset" onClick={() => dispatch({ type: 'RESET' })}>Reset</button>
            </div>
        </div>
    );
}

