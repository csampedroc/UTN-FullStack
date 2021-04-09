import { createStore } from 'redux'

const initialState = {

    number: 0,

}

export default createStore((state = initialState, { type }) => {
    switch (type) {

    case 'INCREMENT':
        return { 
            number: state.number + 1,
        };
    case 'DECREMENT':
        return { 
            number: state.number - 1,
        };
    case 'RESET':
        return { 
            number: 0,
        };

    default:
        return state
    }
})


