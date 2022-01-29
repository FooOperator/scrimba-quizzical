import React from "react";
import { nanoid } from "nanoid";
import { Form, Card } from "react-bootstrap";
import Answer from './Answer'

const Question = ({ questionData, handleClick }) => {
    const shuffledAnswers = questionData.answers
    const answersArray = questionData.answers.map(answer => answer.id)
    console.log(`For question ${questionData.id}`)
    console.log(answersArray)
    
    return (
        <Card>
            <Card.Body>
                <Card.Title>
                    {questionData.question}
                </Card.Title>
                {
                    <Form className='mb-2 d-flex justify-content-center'>
                        {
                            shuffledAnswers.map(answer => {
                                return <Answer
                                    key={nanoid()}
                                    answerId={answer.id}
                                    questionId={questionData.id}
                                    answer={answer.answer}
                                    question={questionData.question}
                                    name={`${questionData.question}-group`}
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