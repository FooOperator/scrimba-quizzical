import React from "react";
import { nanoid } from "nanoid";
import { Form, Card } from "react-bootstrap";
import Answer from './Answer'

const Question = ({ questionData, handleClick, disabled }) => {
    const shuffledAnswers = questionData.answers
    const answersArray = questionData.answers.map(answer => answer.id)
    console.log(`For question ${questionData.id}`)
    console.log(answersArray)
    
    return (
        <Card className="bg-dark border-0">
            <Card.Body>
                <Card.Title className='text-center'>
                    {questionData.question}
                </Card.Title>
                {
                    <Form className='mb-2 d-flex justify-content-center'>
                        {
                            shuffledAnswers.map(answerData => {
                                return <Answer
                                    key={nanoid()}
                                    name={`${questionData.question}-group`}
                                    answerData={answerData}
                                    questionData={questionData}
                                    disabled={disabled}
                                    handleClick={handleClick}
                                />
                            })
                        }
                    </Form>

                }
            </Card.Body>
        </Card>
    )
}

export default Question;