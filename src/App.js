import StartScreen from "./components/StartScreen";
import React from 'react'
import Question from "./components/Question";
import Questionare from "./components/Questionare";
import { nanoid } from "nanoid";

function App() {
  const [isRunning, setIsRunning] = React.useState(false)
  const [questions, setQuestions] = React.useState({})

  React.useEffect(() => {
    fetch('https://opentdb.com/api.php?amount=10')
      .then(res => res.json())
      .then(data => setQuestions(data.results.map(item =>
      (
        {
          ...item,
          id: nanoid()
        }
      )
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

  function handleCheck(event, id) {
    console.log(id)
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
            handleCheck={handleCheck}
          />
      }
    </div>
  );
}

export default App;
