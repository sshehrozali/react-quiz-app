import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';

function App() {

  // Declare React state
  const [state, setState] = React.useState({
    num1: 1,
    num2: 2,
    ans: ""
  })

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
      
      let CorrectAns = state.num1 + state.num2;   // Adds two numbers
      if (parseInt(state.ans) == CorrectAns) {
        console.log("Answer is Correct!");

        // Call setState()
        setState({
          num1: 5,
          num2: 11,
          ans: ""
        });
        
      } else {
        console.log("Answer is Wrong!");
      }
    }
  }

  // Return the component
  return (
    <div>
      <div>{state.num1} + {state.num2}</div>
      <input value={state.ans} onChange={updateAnswer} onKeyPress={checkAnswer}
       type="text" autoFocus/>
    </div>
  );
}

export default App;
