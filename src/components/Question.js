import { nanoid } from "nanoid";

const Question = ({ question, handleCheck }) => {
    const shuffledAnswers = [...question.incorrect_answers, question.correct_answer]

    function shuffleArray() {
        for (let i = shuffledAnswers.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledAnswers[i], shuffledAnswers[j]] = [shuffledAnswers[j], shuffledAnswers[i]];
        }
    }

    shuffleArray()

    return (
        <div>
            <h2>{question.question}</h2>
            {
                <ul>
                    {
                        shuffledAnswers.map(answer =>
                            <Answer
                                id={nanoid()}
                                answer={answer}
                                name={`${question.question}-group`}
                                handleCheck={handleCheck}
                            />
                        )
                    }
                </ul>
            }
        </div>

    )
}

const Answer = (props) => {
    return (
        <li>
            <input type='radio' id={props.id} name={props.name} onChange={(event) => props.handleCheck(event, props.id)} />
            <label htmlFor={props.id}>{props.answer}</label>
        </li>
    )
}

export default Question;