import React from 'react'
import { Row, Col, Container, Stack } from 'react-bootstrap'
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
            <Stack direction='horizontal' gap={2}>
                <Select options={difficultyOptions} onChange={getInfo} />
                <Select options={typeOptions} onChange={getInfo} />
                <button onClick={props.startGame}>Start Game</button>
            </Stack>
        </>
    )
}

export default StartScreen;