import StartScreen from "./components/StartScreen";
import React, { useState, useEffect } from 'react'
import Question from "./components/Question";
import Questionare from "./components/Questionare";
import { nanoid } from "nanoid";

function App() {
  const [isRunning, setIsRunning] = useState(false)
  const [maySubmit, setMaySubmit] = useState(false)
  const [questions, setQuestions] = useState({})
  const [indexOfSelectedAnswers, setIndexOfSelectedAnswers] = useState({})
  const [quizOptions, setQuizOptions] = useState({
    numberOfQuestions: 10,
    category: 9,
    difficulty: '',
    type: '',
    encoding: '',
  })
  const [quizUrl, setQuizUrl] = useState(
    `https://opentdb.com/api.php?amount=${quizOptions.numberOfQuestions}`
  )


  useEffect(() => {
    fetch(quizUrl)
      .then(res => res.json())
      .then(data => setQuestions(data.results.map(item => {
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
          })),
        }
      }
      )))
    console.log(questions)
  }, [!isRunning])

  function startGame() {
    setIsRunning(true)
  }

  function handleSubmit() {
    console.log('answers submitted')
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

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  function handleClick(event, answerId, questionId) {
    console.clear()
    // console.log(`id: ${answerId}`)
    // console.log(`question: ${questionId}`)
    const index = questions.findIndex(question => question.id === questionId)
    // console.log(`index of question in questions array: ${index}`)
    const { isCorrect } = questions[index].answers.find(answer => answer.id === answerId)
    // console.log(`is this answer correct?\n${isCorrect}`)
    const length = Object.keys(indexOfSelectedAnswers).length

    setIndexOfSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answerId
    }))
    setMaySubmit(prev => {
      if (length === quizOptions.numberOfQuestions) {
        return true
      } else {
        return prev
      }
    })
    console.log(maySubmit)
    console.log(length)
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
            handleClick={handleClick}
            maySubmit={maySubmit}
          />
      }
    </div>
  );
}

export default App;
