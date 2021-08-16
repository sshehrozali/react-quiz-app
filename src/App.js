import { stat } from 'fs';
import React from 'react';
import ReactDOM from 'react-dom';
import {Howl} from 'howler';
import './App.css';
import './css/normalLevel.css';
import './css/mediumLevel.css';
import './css/expertLevel.css';
import './css/finishedLevel.css';
import CorrectSFX from './misc/Correct_SFX.mov';
import WrongSFX from './misc/Wrong_SFX.mov';
import FinishSFX from './misc/FinishedStage_SFX.mp3';

function App() {
  
  // Total Number of Rounds in Quiz
  const TotalRounds = 10;

  // Declare React state
  const [state, setState] = React.useState({
    round: `Round: 1`,
    num1: 1,
    num2: 2,
    ans: "",
    score: 0,
    difficulty: document.querySelector("body").classList.add("green"),
    sound: "",
  });

  // Play BG SFX
  function playSound(src) {
    const Sound = new Howl({
      src,
      html5: true
    });
    Sound.play();
  };

  // Update the input field what ever the user has typed in
  function updateAnswer(event) {
    setState({
      ...state,
      ans: event.target.value
    });
  }

  // Updates the Question
  function updateQuestion(difficulty, level) {
    let CurrentRound = parseInt(state.round[state.round.length - 1]);   // Findout Current Round
    CurrentRound += 1;  // Increaments Curr Round by 1

    let CorrectAns = state.num1 + state.num2;
    if (parseInt(state.ans) == CorrectAns) {

      // Call setState() -> Update the question (Increase Difficulty Level Also)
      setState({
        round: `Round: ${CurrentRound}`,
        num1: Math.floor((Math.random() * `${difficulty}`) + 1),
        num2: Math.floor((Math.random() * `${difficulty}`) + 1),
        ans: "",
        score: state.score + 1,
        difficulty: document.querySelector("body").classList.add(`${level}`),
        sound: playSound(CorrectSFX),
      });
    }

    else {
      setState({
        round: `Round: ${CurrentRound}`,
        num1: Math.floor((Math.random() * 10) + 1),
        num2: Math.floor((Math.random() * 10) + 1),
        ans: "",
        score: state.score,
        difficulty: document.querySelector("body").classList.add(`${level}`),
        sound: playSound(WrongSFX),
      });
    };
  };

  // Called when user clicks the button or press Enter on the keyboard
  function checkAnswer(event) {

    // Findout Current Round
    let CurrentRound;
    if (state.round.length != 9) {
      CurrentRound = parseInt(state.round[state.round.length - 1]);
    }
    if (state.round.length == 9) {
      CurrentRound = 10;
    }

    // Continue game
    if (CurrentRound < TotalRounds) {

      // Round 8 - 10 (Expert Difficulty)
      if (CurrentRound > 7) {
        updateQuestion(1000, "red");
      };

      // Round 5 - 7 (Medium Difficulty)
      if (CurrentRound > 4 && CurrentRound <= 7) {
        updateQuestion(100, "blue");
      };

      // Round 1 - 4 (Normal Difficulty)
      if (CurrentRound <= 4) {
        updateQuestion(10, "green");
      };
    }

    // When Final Round is Finished
    if (CurrentRound == TotalRounds) {
      console.log("In Final Round")

      let CorrectAns = state.num1 + state.num2;
      if (parseInt(state.ans) == CorrectAns) {
        setState({
          ...state,
          round: "Game is Finished!",
          score: state.score + 1,
          difficulty: document.querySelector("body").classList.add("end"),
          sound: playSound(FinishSFX)
        });
      }
      else {
        setState({
          ...state,
          round: "Game is Finished!",
          difficulty: document.querySelector("body").classList.add("end"),
          sound: playSound(FinishSFX)
        });
      };

      // TODO

    };
  };

  // If event is triggered
  function callNextEnterKey(event) {
    if (event.key == "Enter") {
      checkAnswer();
    };
  };
  function callNextBtnClick() {
    checkAnswer();
  };

  // Main Quiz Window
  return (
    <body className="d-flex flex-column justify-content-center align-items-center">
      <div className="container">
        <div className="row d-flex flex-column justify-content-center align-items-center">
          <div className="col-12 d-flex flex-column justify-content-center align-items-center">
            <h1 className="display-4 text-white p-3 rounded mb-5 text-center round">{state.round}</h1>
            <div className="mb-5 fs-4 text-white rounded px-3 question">Ques. {state.num1} + {state.num2} ?</div>

            <div className="row d-flex flex-row justify-content-center">
              <div className="col-12 d-flex flex-row justify-content-center">
                <input className="input text-white mx-1 mx-sm-1 mx-md-1 mx-lg-3 py-2 px-0 px-sm-0 px-md-0 px-lg-4 fs-4 text-center rounded mt-2" value={state.ans} onChange={updateAnswer} onKeyPress={callNextEnterKey}
                  type="text" autoFocus />
                <button class="btn btn-success px-3 px-sm-3 px-md-3 px-lg-4 fs-1" type="button" id="button-addon2" onClick={callNextBtnClick}>✔</button>
              </div>
            </div>

            <div className="score mt-5 fw-bold rounded" placeholder="Enter Your Answer Here">Score: {state.score}</div>
          </div>
        </div>
      </div>
    </body>
  );
}

export default App;
