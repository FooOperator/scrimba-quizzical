import { Form } from "react-bootstrap";
import React from 'react'
import { nanoid } from "nanoid";
const Answer = (props) => {

    return (
        <div>
            <Form.Check
                id={`${props.answerId}-radio`}
                variant={props.clicked ? 'primary' : 'secondary'}
            >
                <Form.Check.Label className="btn btn-primary">
                    {props.answer}
                    <Form.Check.Input
                        style={{ visibility: 'hidden' }}
                        name={`${props.question}-group`}
                        type={'radio'}
                        onClick={(event) => props.handleClick(event, props.answerId, props.questionId)}
                    />
                </Form.Check.Label>
            </Form.Check>

        </div>

    )
}

export default Answer;