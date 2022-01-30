import StartScreen from "./components/StartScreen";
import React, { useState, useEffect, useRef } from 'react'
import Questionare from "./components/Questionare";
import { nanoid } from "nanoid";

function App() {
  const shouldFetch = useRef(false)
  const shouldDisplayAlert = useRef(false)

  const [score, setScore] = useState(0)
  const [quizDisabled, setQuizDisabled] = useState(true)
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
    function fetchQuizData() {
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
    }
    if (shouldFetch.current) {
      fetchQuizData()
      console.log('fetched')
    }
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

  useEffect(() => {
    setMaySubmit(prev => {
      return selectedAnswers.find(answer => answer.selectedAnswerId === '') ? false : true
    })
  }, [selectedAnswers])

  function startGame() {
    setIsRunning(true)
    setQuizDisabled(false)
    shouldFetch.current = true
  }

  function handleSubmit() {

    function getScore(score, curr) {
      if (curr.selectedAnswerId === curr.correctAnswerId) {
        return score + 1
      }
      return score
    }

    let res = selectedAnswers.reduce((score, curr) => getScore(score, curr), 0)
    // console.log(`${res} out of ${questions.length}`)
    setScore(res)
    // console.log(Object.entries(selectedAnswers))
    shouldDisplayAlert.current = true
    setQuizDisabled(true)
    console.log(quizDisabled)
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

    // console.log(`${questionId} in index ${questionIndex}`)
    // console.log(`${selectedAnswerId} in index ${answerIndex}`)

    setSelectedAnswers(prev => prev.map(item =>
      item.questionId === questionId ? { ...item, selectedAnswerId: selectedAnswerId } : item
    ))
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
            displayAlert={shouldDisplayAlert}
            score={score}
            disabled={quizDisabled}
          />
      }

    </div>
  );
}

export default App;
