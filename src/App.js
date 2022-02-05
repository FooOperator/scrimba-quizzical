import StartScreen from "./components/StartScreen";
import { Helmet } from 'react-helmet'
import React, { useState, useEffect, useRef } from 'react'
import Questionare from "./components/Questionare";
import { nanoid } from "nanoid";
import { getScore } from './utils'

const initialStates = {
  scoreAlertRef: null,
  shouldFetch: false,
  gameOver: false,
  quizDisabled: true,
  isRunning: false,
  maySubmit: false,
  score: 0,
  quizOptions: {
    numberOfQuestions: 5,
    category: 9,
    difficulty: '',
    type: '',
    encoding: '',
  },
  selectedAnswers: [],
  questions: []
}

function App() {
  const shouldFetch = useRef(initialStates.shouldFetch)
  const gameOver = useRef(initialStates.gameOver)
  const scoreAlertRef = useRef(initialStates.scoreAlertRef)

  const [quizDisabled, setQuizDisabled] = useState(initialStates.quizDisabled)
  const [isRunning, setIsRunning] = useState(initialStates.isRunning)
  const [maySubmit, setMaySubmit] = useState(initialStates.maySubmit)
  const [questions, setQuestions] = useState([])
  const [score, setScore] = useState(initialStates.score)
  const [selectedAnswers, setSelectedAnswers] = useState(initialStates.selectedAnswers)
  const [quizOptions, setQuizOptions] = useState(initialStates.quizOptions)

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
  }, [isRunning, quizUrl])

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

  function scrollToRef(ref) {
    ref.current.scrollIntoView()
  }

  function startGame() {
    setIsRunning(true)
    setQuizDisabled(false)
    shouldFetch.current = true
  }

  function handleSubmit() {
    let res = selectedAnswers.reduce((score, curr) => getScore(score, curr), 0)
    // console.log(`${res} out of ${questions.length}`)
    setScore(res)
    // console.log(Object.entries(selectedAnswers))
    gameOver.current = true
    setQuizDisabled(true)
    // console.log(quizDisabled)
    scrollToRef(scoreAlertRef)
  }

  function handleClear() {
    console.log('answers cleared!')
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

  function resetStates() {
    setIsRunning(initialStates.isRunning)
    setScore(initialStates.score)
    setQuestions(initialStates.questions)
    setSelectedAnswers(initialStates.selectedAnswers)
    setMaySubmit(initialStates.maySubmit)
    gameOver.current = initialStates.gameOver
    shouldFetch.current = initialStates.shouldFetch
  }

  function backToStartScreen() {
    resetStates()
    console.log('back to start screen')
  }

  function quickRestart() {
    resetStates()
    startGame()
    console.log('quick restart')
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
    // setQuestions(prev => prev.map(question =>
    //   question.id === questionId ? {
    //     ...question, answers: question.answers.map(answer =>
    //       answer.id === selectedAnswerId ? { ...answer, selected: true } : answer)
    //   } : question
    // ))
  }

  return (

    <div className="App text-light">
      <>
        <Helmet>
          <style>{'body { background-color: rgb(33,37,41); }'}</style>
        </Helmet>
      </>
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
            backToStartScreen={backToStartScreen}
            quickRestart={quickRestart}
            maySubmit={maySubmit}
            gameOver={gameOver}
            score={score}
            disabled={quizDisabled}
            scoreAlertRef={scoreAlertRef}
          />
      }

    </div>
  );
}

export default App;
