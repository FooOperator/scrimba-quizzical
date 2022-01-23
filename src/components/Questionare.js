import { nanoid } from "nanoid";
import { Button, ButtonGroup } from "react-bootstrap";
import Question from "./Question";

const Questionare = (props) => {

    return (
        <div style={{ width: '45vw', margin: 'auto auto' }} className="mt-4">
            {props.questions.map(question => <Question question={question} handleClick={props.handleClick} key={nanoid()} />)}
            <ButtonGroup className='d-flex justify-content-center' >
                <Button
                    variant='success'
                    onClick={props.handleSubmit}
                    disabled={!props.maySubmit}
                >Submit Answers</Button>
                <Button
                    variant='danger'
                    onClick={props.handleClear}
                >Clear Answers</Button>
            </ButtonGroup>
        </div>
    );
}

export default Questionare;