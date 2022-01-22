import StartScreen from "./components/StartScreen";
import React from 'react'
import Question from "./components/Question";
import Questionare from "./components/Questionare";
import { nanoid } from "nanoid";

function App() {
  const [isRunning, setIsRunning] = React.useState(false)
  const [questions, setQuestions] = React.useState({})
  const [indexOfSelectedAnswers, setIndexOfSelectedAnswers] = React.useState()

  const quizOptions = {
    numberOfQuestions: 5,
    category: 9,
    difficulty: '',
    type: '',
    encoding: '',
  }

  const quizUrl = `https://opentdb.com/api.php?amount=${quizOptions.numberOfQuestions ? `${quizOptions.numberOfQuestions}` : `1`}${quizOptions.category ? `&category=${quizOptions.category}` : ``}${quizOptions.difficulty ? `&difficulty=${quizOptions.difficulty}` : ``}${quizOptions.type ? `&type=${quizOptions.type}` : ``}`


  React.useEffect(() => {
    console.log(quizUrl)
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

    setIndexOfSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answerId
    }))

    console.log(indexOfSelectedAnswers)
  }

  return (
    <div className="App">
      {
        !isRunning ?
          <StartScreen startGame={startGame} /> :
          <Questionare
            questions={questions}
            handleSubmit={handleSubmit}
            handleClear={handleClear}
            handleClick={handleClick}
          />
      }
    </div>
  );
}

export default App;
