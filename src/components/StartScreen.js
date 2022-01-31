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
        <div style={{ width: '45vw', margin: 'auto auto' }} className='mt-5' >
            <h1 className='text-center'>Quizzical</h1>
            <Form>
                <Form.Group className="mb-3" controlId="formNumberOfQuestions">
                    <Form.Label>Number Of Questions</Form.Label>
                    <FormControl name='numberOfQuestions' onChange={(event) => props.handleChange(event)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formDifficulty">
                    <Form.Label>Select Difficulty</Form.Label>
                    <Select name="difficulty" options={difficultyOptions} onChange={(event) => props.handleChange(event)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Select Type</Form.Label>
                    <Select name="type" options={typeOptions} onChange={(event) => props.handleChange(event)} />
                </Form.Group>
                <Button className='w-100 mt-5' variant="primary" onClick={props.startGame}>
                    Start Game
                </Button>
            </Form>
        </div>
    )
}

export default StartScreen;