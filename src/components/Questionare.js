import { nanoid } from "nanoid";
import { Button, ButtonGroup, Alert } from "react-bootstrap";
import Question from "./Question";

const Questionare = (props) => {
    const correctPercentage = parseInt((props.score * 100) / props.questions.length)
    const scoreAlert = (
        <>
            <Alert className='mt-2' >
                <Alert.Heading>
                    Quiz Complete!
                </Alert.Heading>
                <hr ref={props.scoreAlertRef} />
                <p>You have correctly choosen <b>{props.score}</b> out of <b>{props.questions.length}</b> answers</p>
                <p>Meaning, you got <b>{correctPercentage}%</b> of the quiz right!</p>
            </Alert>
        </>
    )

    return (
        <div style={{ width: '45vw', margin: 'auto auto' }} className="mt-4">
            {
                props.questions.map(
                    (question, index) => {
                        return (
                            <>
                                <Question
                                    key={nanoid()}
                                    questionData={question}
                                    handleClick={props.handleClick}
                                    disabled={props.quizDisabled}
                                />
                                {index !== props.questions.length - 1 && <hr />}
                            </>
                        )
                    })
            }
            {
                !props.gameOver.current ?
                    <ButtonGroup className='d-flex justify-content-center mt-2' >
                        <Button
                            variant='success'
                            onClick={props.handleSubmit}
                            disabled={!props.maySubmit}
                        >
                            Submit Answers
                        </Button>
                        <Button
                            variant='danger'
                            onClick={props.handleClear}
                        >
                            Clear Answers
                        </Button>
                    </ButtonGroup> :
                    <ButtonGroup className='d-flex justify-content-center mt-2' >
                        <Button
                            variant='outline-success'
                            onClick={props.handleSubmit}
                            disabled={!props.maySubmit}
                        >
                            Back To Start
                        </Button>
                        <Button
                            variant='outline-primary'
                            onClick={props.handleClear}
                        >
                            Restart
                        </Button>
                    </ButtonGroup>

            }
            {props.gameOver.current && scoreAlert}
        </div>
    );
}

export default Questionare;