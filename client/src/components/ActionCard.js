import React from 'react';

const ActionCard = props => {
    return(
        <div className='action-list'>
            <ul>
                <li>{props.description}</li>
            </ul>
        </div>
    )

}

export default ActionCard;