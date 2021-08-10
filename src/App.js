import { stat } from 'fs';
import React from 'react';
import ReactDOM from 'react-dom';
import gameFinished from './components/gameFinished';
import './App.css'

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

        // For all rounds that comes after 4 (Increases Difficulty Level)
        if (state.round > 4) {
          let CorrectAns = state.num1 + state.num2;
          if (parseInt(state.ans) == CorrectAns) {

            // Call setState() -> Update the question (Increase Difficulty Level Also)
            setState({
              round: state.round + 1,
              num1: Math.floor((Math.random() * 100) + 1),
              num2: Math.floor((Math.random() * 100) + 1),
              ans: "",
              score: state.score + 1
            });
          }

          else {
            setState({
              round: state.round + 1,
              num1: Math.floor((Math.random() * 10) + 1),
              num2: Math.floor((Math.random() * 10) + 1),
              ans: "",
              score: state.score
            });


          } //
          } //

        // For all rounds that comes or equal to 4 (Normal Difficulty Level)
        if (state.round <= 4) {
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


          } //

        };//
      
      }; //

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

      };  //

    }; //

  }; //

  // Main Quiz Window
  return (
    <body className="d-flex justify-content-center align-items-center">
      <div className="container">
        <div className="row d-flex flex-column justify-content-center align-items-center">
          <div className="col-12 d-flex flex-column justify-content-center align-items-center">
            <h1 className="display-4 text-dark mb-5">Round: {state.round}</h1>
            <div className="mb-3 fs-4">Ques. {state.num1} + {state.num2} ?</div>
            <input value={state.ans} onChange={updateAnswer} onKeyPress={checkAnswer}
              type="text" autoFocus />
            <div className="mt-5 fw-bold">Score: {state.score}</div>
          </div>
        </div>
      </div>
    </body>
  );
}

export default App;
