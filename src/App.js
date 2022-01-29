import StartScreen from "./components/StartScreen";
import React, { useState, useEffect, useRef } from 'react'
import Questionare from "./components/Questionare";
import { nanoid } from "nanoid";

var timesItRan = 0
function App() {

  const shouldFetch = useRef(false)
  const displayAlert = useRef(false)

  const [isRunning, setIsRunning] = useState(false)
  const [maySubmit, setMaySubmit] = useState(false)
  const [questions, setQuestions] = useState([])
  const [selectedAnswers, setSelectedAnswers] = useState([])
  const [quizOptions, setQuizOptions] = useState({
    numberOfQuestions: 3,
    category: 9,
    difficulty: '',
    type: '',
    encoding: '',
  })

  const [quizUrl, setQuizUrl] = useState(
    `https://opentdb.com/api.php?amount=${quizOptions.numberOfQuestions}`
  )

  useEffect(() => {
    if (shouldFetch.current) {
      fetch(quizUrl)
        .then(res => res.json())
        .then(data => setQuestions(prev => data.results.map(item => {
          const { correct_answer, incorrect_answers, type, question } = item
          const answers = [...incorrect_answers, correct_answer]

          return {
            id: nanoid(),
            question: question,
            type: type,
            answers: answers.map((answer, i) => ({
              id: nanoid(),
              answer: answer,
              isCorrect: i === answers.length - 1 ? true : false,
              selected: false
            }))
          }
        }
        )))
      console.log('fetched')
    }
    // console.log(questions)
    // timesItRan++
    // console.log(`App.useEffect ran ${timesItRan} times`)
  }, [isRunning])

  useEffect(() => {
    setSelectedAnswers(prev => questions.map(item => {
      const { answers } = item
      const correct_answer = answers.find(answer => answer.isCorrect).id
      return {
        questionId: item.id,
        correctAnswerId: correct_answer,
        selectedAnswerId: ''
      }
    }))
  }, [questions])

  function startGame() {
    setIsRunning(true)
    shouldFetch.current = true
  }

  function handleSubmit() {

    function getScore(score, curr) {
      if (curr.selectedAnswerId === curr.correctAnswerId) {
        return score + 1
      }
      return score
    }

    let score = selectedAnswers.reduce((score, curr) => getScore(score, curr), 0)
    console.log(`${score} out of ${questions.length}`)
    console.log(Object.entries(selectedAnswers))
    displayAlert.current = true
  }

  function handleClear() {
    console.log('answers cleared!')
  }

  function endGame() {
    console.log('game ended')
  }

  function handleChangeOnStartScreen(event) {
    const { name, value, type, checked } = event

    setQuizOptions(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    setQuizUrl(`https://opentdb.com/api.php?amount=${quizOptions.numberOfQuestions ? `${quizOptions.numberOfQuestions}` : `1`}${quizOptions.category ? `&category=${quizOptions.category}` : ``}${quizOptions.difficulty ? `&difficulty=${quizOptions.difficulty}` : ``}${quizOptions.type ? `&type=${quizOptions.type}` : ``}`)
    console.log(quizUrl)
  }

  function handleAnswerClick(event, selectedAnswerId, questionId) {
    console.clear()
    const questionIndex = questions.findIndex(question => question.id === questionId)
    const answerIndex = questions[questionIndex].answers.findIndex(answer => answer.id === selectedAnswerId)

    console.log(`${questionId} in index ${questionIndex}`)
    console.log(`${selectedAnswerId} in index ${answerIndex}`)

    setSelectedAnswers(prev => prev.map(item =>
      item.questionId === questionId ? { ...item, selectedAnswerId: selectedAnswerId } : item
    ))

    const length = Object.keys(selectedAnswers).length
    setMaySubmit(prev => {
      if (length === quizOptions.numberOfQuestions) {
        return true
      } else {
        return prev
      }
    })

    console.log(selectedAnswers)
  }

  return (
    <div className="App">
      {
        !isRunning ?
          <StartScreen
            startGame={startGame}
            handleChange={handleChangeOnStartScreen}
            quizOptions={quizOptions}
          /> :
          <Questionare
            questions={questions}
            handleSubmit={handleSubmit}
            handleClear={handleClear}
            handleClick={handleAnswerClick}
            maySubmit={maySubmit}
            displayAlert={displayAlert}
          />
      }

    </div>
  );
}

export default App;
