import {useState} from 'react';

function Button(props) {
    const [counter,setCounter] = useState(1);

    function incrementador(params) {
        setCounter(counter + 1)
    }

    return (
        <>
            <span>{counter}</span>
            <button onClick={incrementador}>{props.title}</button>
            <br/>
        </>
    )
}


export default Button
