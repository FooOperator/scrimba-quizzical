import { nanoid } from "nanoid";
import { ButtonGroup, Card } from "react-bootstrap";
import Answer from './Answer'

const Question = ({ question, handleClick }) => {
    const shuffledAnswers = [...question.incorrect_answers, question.correct_answer]

    function shuffleArray() {
        for (let i = shuffledAnswers.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledAnswers[i], shuffledAnswers[j]] = [shuffledAnswers[j], shuffledAnswers[i]];
        }
    }

    shuffleArray()

    return (
        <Card>
            <Card.Body>
                <Card.Title>
                    {question.question}
                </Card.Title>
                {
                    <ButtonGroup className='mb-2 d-flex justify-content-center'>

                        {
                            shuffledAnswers.map(answer =>
                                <Answer
                                    id={nanoid()}
                                    answer={answer}
                                    name={`${question.question}-group`}
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