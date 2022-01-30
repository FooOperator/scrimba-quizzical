import { Form } from "react-bootstrap";
import React from 'react'
import { nanoid } from "nanoid";

const Answer = ({answerData, disabled, questionData, handleClick}) => {
    const getClassNameForAnswer = () => {
        const className = 'btn '
        if (disabled) {
            return answerData.isCorrect ? className + 'btn-success' : className +  'btn-danger'
        }
        return className + 'btn-primary'
    }
    

    return (
        <div>
            <Form.Check
                id={`${answerData.answer}-radio`}

            >
                <Form.Check.Label className={getClassNameForAnswer()}>
                    {answerData.answer}
                    <Form.Check.Input
                        style={{ visibility: 'hidden' }}
                        name={`${questionData.question}-group`}
                        type={'radio'}
                        onClick={(event) => handleClick(event, answerData.id, questionData.id)}
                        disabled={disabled}
                    />
                </Form.Check.Label>
            </Form.Check>

        </div>

    )
}

export default Answer;