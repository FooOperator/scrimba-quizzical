import Question from "./Question";

const Questionare = (props) => {
    
    console.log(props.questions)
    
    return (  
        <div>
            {props.questions.map(question => <Question question={question} handleCheck={props.handleCheck}/>)}
            <button onClick={props.handleSubmit}>Submit Answers</button>
            <button onClick={props.handleClear}>Clear Answers</button>
        </div>
    );
}
 
export default Questionare;