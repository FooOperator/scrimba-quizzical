import React from 'react'
import Select from 'react-select'
import { Form, Button, InputGroup, FormControl } from 'react-bootstrap'

const StartScreen = (props) => {
    /*
        category: "Politics"
        correct_answer: "Neville Chamberlain"
        difficulty: "medium"
        incorrect_answers: (3) ['Clement Attlee', 'Winston Churchill', 'Stanley Baldwin']
        question: "Who was the British Prime Minister at the outbreak of the Second World War?"
        type: "multiple"
    */

    const difficultyOptions = [
        { value: 'easy', label: 'Easy', name: 'difficulty' },
        { value: 'medium', label: 'Medium', name: 'difficulty' },
        { value: 'hard', label: 'Hard', name: 'difficulty' },
    ]

    const typeOptions = [
        { value: 'multiple', label: 'Multiple-Choice', name: 'type' },
        { value: 'truefalse', label: 'True / False', name: 'type' },
    ]

    return (
        <>
            <h1>Quizzical</h1>
            <Form>
                <InputGroup>
                    <InputGroup.Text>Number Of Questions</InputGroup.Text>
                    <FormControl name='numberOfQuestions' onChange={(event) => props.handleChange(event)} />
                </InputGroup>
                <Form.Group className="mb-3" controlId="formDifficulty">
                    <Form.Label>Select Difficulty</Form.Label>
                    <Select name="difficulty" options={difficultyOptions} onChange={(event) => props.handleChange(event)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Select Type</Form.Label>
                    <Select name="type" options={typeOptions} onChange={(event) => props.handleChange(event)} />
                </Form.Group>
                <Button variant="primary" onClick={props.startGame}>
                    Start Game
                </Button>
            </Form>
        </>
    )
}

export default StartScreen;