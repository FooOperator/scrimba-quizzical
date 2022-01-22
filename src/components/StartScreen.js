import React from 'react'
import { Row, Col, Container, Stack, Form, Button } from 'react-bootstrap'
import Select from 'react-select'

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
        { value: 'easy', label: 'Easy' },
        { value: 'medium', label: 'Medium' },
        { value: 'hard', label: 'Hard' },
    ]

    const typeOptions = [
        { value: 'multiple', label: 'Multiple-Choice' },
        { value: 'truefalse', label: 'True / False' },
    ]

    const getInfo = () => {

    }

    return (
        <>
            <h1>Quizzical</h1>
            <Form>
                <Form.Group className="mb-3" controlId="formDifficulty">
                    <Form.Label>Select Difficulty</Form.Label>
                    <Select options={difficultyOptions} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Select Type</Form.Label>
                    <Select options={typeOptions} />
                </Form.Group>
                <Button variant="primary" onClick={props.startGame}>
                    Start Game
                </Button>
            </Form>
        </>
    )
}

export default StartScreen;