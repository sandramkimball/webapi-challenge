import React, {useState, useEffect} from 'react';
import ActionCard from './ActionCard';
import axios from 'axios';

const Card = props => {
    const[actions, setActions] = useState([]);

    useEffect(()=> {
        axios.get('http://localhost:4000/api/actions/')
        .then(res=> {
            setActions(res.data);
        })
    }, [actions.length]);

    return(
        <div className='Card'>
            <h4>{props.name}</h4>
            <p>{props.description}</p>
            {actions.map(action=> (
                <ActionCard key={action.id} description={action.description}/>
            ))}

        </div>
    )

}

export default Card;