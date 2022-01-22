import React from "react";
import { nanoid } from "nanoid";
import { ButtonGroup, Card } from "react-bootstrap";
import Answer from './Answer'

const Question = ({ question: data, handleClick }) => {
    const shuffledAnswers = data.answers

    return (
        <Card>
            <Card.Body>
                <Card.Title>
                    {data.question}
                </Card.Title>
                {
                    <ButtonGroup className='mb-2 d-flex justify-content-center'>

                        {
                            shuffledAnswers.map(answer =>
                                <Answer
                                    answerId={answer.id}
                                    questionId={data.id}
                                    answer={answer.answer}
                                    question={data.question}
                                    name={`${data.question}-group`}
                                    handleClick={handleClick}
                                />
                            )
                        }
                    </ButtonGroup>

                }
            </Card.Body>
        </Card>

    )
}

export default Question;