import { stat } from 'fs';
import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import gameFinished from './components/gameFinished';

function App() {

  // Total Number of Rounds in Quiz
  const TotalRounds = 10;

  // Declare React state
  const [state, setState] = React.useState({
    round: 1,
    num1: 1,
    num2: 2,
    ans: "",
    score: 0
  });

  // Update the input field what ever the user has typed in
  function updateAnswer(event) {
    setState({
      ...state,
      ans: event.target.value
    });
  }

  // Check the user submitted Answer
  function checkAnswer(event) {

    if (event.key == "Enter") {

      // Continue game
      if (state.round < TotalRounds) {
        let CorrectAns = state.num1 + state.num2;   // Adds two numbers
        if (parseInt(state.ans) == CorrectAns) {
          // Call setState() -> Update the question
          setState({
            round: state.round + 1,
            num1: Math.floor((Math.random() * 10) + 1),
            num2: Math.floor((Math.random() * 10) + 1),
            ans: "",
            score: state.score + 1
          });

        } else {
          // Call setState() -> Update the question
          setState({
            round: state.round + 1,
            num1: Math.floor((Math.random() * 10) + 1),
            num2: Math.floor((Math.random() * 10) + 1),
            ans: "",
            score: state.score
          });
        };
      };

      // When Final Round is Finished
      if (state.round == TotalRounds) {
        let CorrectAns = state.num1 + state.num2;
        if (parseInt(state.ans) == CorrectAns) {
          setState({
            ...state,
            round: "Game is Finished!",
            score: state.score + 1
          });
        }
        else {
          setState({
            ...state,
            round: "Game is Finished!"
          });
        };

        // TODO

      };
    };
  };

  // Main Quiz Window
  return (
    <div>
      <h1>Round: {state.round}</h1>
      <div>{state.num1} + {state.num2}</div>
      <input value={state.ans} onChange={updateAnswer} onKeyPress={checkAnswer}
        type="text" autoFocus />
      <div>Score: {state.score}</div>
    </div>
  );
}

export default App;
