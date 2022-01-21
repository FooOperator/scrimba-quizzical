import { Button } from "react-bootstrap";
import React from 'react'
const Answer = (props) => {

    return (
        <Button
            variant={props.clicked ? 'primary' : 'secondary'}
            onClick={(event) => props.handleClick(event, props.id)}
            className={`border ${props.clicked ? 'border-secondary' : 'border-dark'} border-3 rounded`}
        >
            {props.answer}
        </Button>
    )
}

export default Answer;