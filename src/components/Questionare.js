import { nanoid } from "nanoid";
import { Button, ButtonGroup, Alert} from "react-bootstrap";
import Question from "./Question";

const Questionare = (props) => {
    
    const scoreAlert = (
        <Alert className='mt-1'>
            <Alert.Heading>
                Quiz Complete!
            </Alert.Heading>
            <hr />
            <p>You have correctly choosen <b>{}</b> out of <b>{props.questions.length}</b> answers</p>
            <p>Meaning, you got <b>55%</b> of the quiz right!</p>
        </Alert>
    )

    return (
        <div style={{ width: '45vw', margin: 'auto auto' }} className="mt-4">
            {props.questions.map(question => <Question questionData={question} handleClick={props.handleClick} key={nanoid()} />)}
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
            {props.displayAlert.current && scoreAlert}
        </div>
    );
}

export default Questionare;